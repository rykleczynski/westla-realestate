import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel serverless entry: keep this file self-contained (no ../shared imports).
 * Vercel's bundler does not always include files outside api/, which caused 500s in production.
 * Express dev server still uses shared/submitLaRelocationGuideLead.ts for the same behavior.
 */

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "yopmail.com",
  "tempmail.com",
  "maildrop.cc",
  "sharklasers.com",
]);

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

function isObviouslyFakePhone(digits: string): boolean {
  if (/^(\d)\1+$/.test(digits)) return true;
  if (digits === "1234567890" || digits === "0987654321") return true;
  return false;
}

function looksLikeDownstreamCrmTokenError(status: number, body: string): boolean {
  const t = body.toLowerCase();
  const msg =
    t.includes("private integration") ||
    t.includes("invalid private integration") ||
    (t.includes("invalid") && t.includes("integration") && t.includes("token"));
  if (!msg) return false;
  return [400, 401, 403, 406, 422].includes(status);
}

function buildZapierFormBody(fields: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    params.append(key, value);
  }
  return params.toString();
}

type RelocationLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneRaw: string;
  inquiryType: string;
  interest: string;
  source: string;
};

async function submitLaRelocationGuideLeadToZapier(
  payload: RelocationLeadPayload,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const webhook = process.env.ZAPIER_LA_RELOCATION_GUIDE_WEBHOOK_URL?.trim();
  if (!webhook) {
    return {
      ok: false,
      status: 503,
      error: "This form is not connected yet. Set ZAPIER_LA_RELOCATION_GUIDE_WEBHOOK_URL.",
    };
  }

  const { firstName, lastName, email, phoneRaw, inquiryType, interest, source } = payload;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const digits = phoneRaw.replace(/\D/g, "");
  const normalized =
    digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
  const phoneDisplay =
    normalized.length === 10
      ? `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`
      : phoneRaw;
  const phoneE164 = normalized.length === 10 ? `+1${normalized}` : "";

  const leadType =
    inquiryType === "buying"
      ? "Buyer"
      : inquiryType === "selling"
        ? "Seller"
        : inquiryType === "investing"
          ? "Investor"
          : inquiryType === "leasing"
            ? "Leasing"
            : inquiryType === "valuation"
              ? "Info"
              : "Other";

  const interestValue = inquiryType || interest;
  const submittedAt = new Date().toISOString();

  const formFields: Record<string, string> = {
    firstName,
    lastName,
    fullName,
    email,
    phone: phoneDisplay || phoneRaw,
    phoneRaw,
    phoneDigits: normalized,
    ...(phoneE164 ? { phoneE164 } : {}),
    inquiryType,
    interest,
    interestValue,
    leadType,
    source,
    submittedAt,
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    lead_type: leadType,
    submitted_at: submittedAt,
  };

  try {
    const zapRes = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json, */*;q=0.1",
      },
      body: buildZapierFormBody(formFields),
    });
    if (!zapRes.ok) {
      const text = await zapRes.text().catch(() => "");
      console.error("Zapier LA relocation guide webhook error:", zapRes.status, text.slice(0, 500));
      if (looksLikeDownstreamCrmTokenError(zapRes.status, text)) {
        console.warn(
          "Treating Zapier webhook HTTP error as success: downstream CRM auth failure after catch hook received payload.",
        );
        return { ok: true };
      }
      return { ok: false, status: 502, error: "Submission failed. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("Zapier LA relocation guide webhook fetch failed:", e);
    return { ok: false, status: 502, error: "Could not reach the form service. Try again in a moment." };
  }
}

function parseJsonBody(req: VercelRequest): Record<string, unknown> {
  const raw = req.body;
  if (raw == null) return {};
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = parseJsonBody(req);
    const {
      firstName: rawFirst = "",
      lastName: rawLast = "",
      email = "",
      phone = "",
      interest = "",
      inquiryType = "",
      source: rawSource = "",
    } = body;

    const firstName = String(rawFirst).trim();
    const lastName = String(rawLast).trim();
    const trimmedEmail = String(email).trim();
    const rawPhone = phone ? String(phone).trim() : "";
    const phoneDigits = rawPhone.replace(/\D/g, "");
    const normalizedPhone =
      phoneDigits.startsWith("1") && phoneDigits.length === 11 ? phoneDigits.slice(1) : phoneDigits;

    if (!firstName || !lastName || !trimmedEmail || !rawPhone) {
      res.status(400).json({ error: "First name, last name, email, and phone are required." });
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(trimmedEmail)) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }

    if (isDisposableEmail(trimmedEmail)) {
      res.status(400).json({ error: "Please use a real email address." });
      return;
    }

    if (normalizedPhone.length !== 10 || isObviouslyFakePhone(normalizedPhone)) {
      res.status(400).json({ error: "Please enter a valid 10-digit phone number." });
      return;
    }

    const zapResult = await submitLaRelocationGuideLeadToZapier({
      firstName,
      lastName,
      email: trimmedEmail,
      phoneRaw: rawPhone,
      inquiryType: String(inquiryType || "").trim(),
      interest: String(interest || "").trim(),
      source: String(rawSource || "").trim() || "Meta Ad Landing Page",
    });
    if (!zapResult.ok) {
      res.status(zapResult.status).json({ error: zapResult.error });
      return;
    }

    res.status(201).json({ ok: true });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error("LA relocation guide lead error:", err.message, err.stack);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
