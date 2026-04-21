import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isTcpaOptInTrue, submit1031PlaybookLead } from "../shared/submit1031PlaybookLead";

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

  const tcpaOptIn = isTcpaOptInTrue(body.tcpaOptIn);

  const result = await submit1031PlaybookLead({
    firstName: String(body.firstName ?? ""),
    lastName: String(body.lastName ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    tcpaOptIn,
    _hp: body._hp != null ? String(body._hp) : undefined,
  });

  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.status(200).json({ ok: true });
}
