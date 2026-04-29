import type { VercelRequest, VercelResponse } from "@vercel/node";

const DEFAULT_DASHBOARD_URL = "https://social-dashboard-gold-six.vercel.app";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body: Record<string, unknown> = {};
  try {
    if (req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
      body = req.body as Record<string, unknown>;
    } else if (typeof req.body === "string") {
      body = JSON.parse(req.body) as Record<string, unknown>;
    }
  } catch {
    res.status(400).json({ error: "Invalid JSON body." });
    return;
  }

  const baseUrl = (process.env.LEAD_INTAKE_BASE_URL || DEFAULT_DASHBOARD_URL).replace(/\/+$/, "");
  const target = `${baseUrl}/api/leads/intake/1031-playbook`;
  const secret = process.env.LEAD_INTAKE_SECRET?.trim();

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "x-intake-secret": secret } : {}),
      },
      body: JSON.stringify({
        firstName: body.firstName ?? "",
        lastName: body.lastName ?? "",
        email: body.email ?? "",
        phone: body.phone ?? "",
        tcpaOptIn: body.tcpaOptIn,
        _hp: body._hp,
      }),
    });
  } catch (e) {
    console.error("[1031-playbook] dashboard intake fetch failed:", e);
    res.status(502).json({ error: "Could not reach the form service. Try again in a moment." });
    return;
  }

  const text = await upstream.text().catch(() => "");
  let json: { ok?: boolean; error?: string } = {};
  try {
    json = text ? (JSON.parse(text) as typeof json) : {};
  } catch {
    /* non-JSON response from dashboard */
  }

  if (!upstream.ok) {
    console.error("[1031-playbook] dashboard returned non-OK:", upstream.status, text.slice(0, 500));
    res.status(upstream.status).json({ error: json.error ?? "Submission failed. Please try again." });
    return;
  }

  res.status(200).json({ ok: true });
}
