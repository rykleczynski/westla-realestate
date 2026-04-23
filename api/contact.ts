import type { VercelRequest, VercelResponse } from "@vercel/node";

// Common disposable / throwaway email domains to reject
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","guerrillamail.net","guerrillamail.org",
  "guerrillamail.biz","guerrillamail.de","guerrillamail.info","guerrillamailblock.com",
  "trashmail.com","trashmail.net","trashmail.org","trashmail.at","trashmail.io",
  "trashmail.me","tempmail.com","temp-mail.org","temp-mail.io","dispostable.com",
  "mailnull.com","spamgourmet.com","yopmail.com","yopmail.fr","cool.fr.nf",
  "jetable.fr.nf","nospam.ze.tc","nomail.xl.cx","mega.zik.dj","speed.1s.fr",
  "cool.fr.nf","courriel.fr.nf","jetable.net","jetable.org","jetable.pp.ua",
  "filzmail.com","throwam.com","throwam.de","getnada.com","maildrop.cc",
  "sharklasers.com","guerrillamail.info","grr.la","guerrillamailblock.com",
  "spam4.me","fakeinbox.com","spamherelots.com","spamhereplease.com",
  "mailnew.com","spamex.com","binkmail.com","bobmail.info","chammy.info",
  "devnullmail.com","meltmail.com","put2.net","spamavert.com","spamevader.net",
  "spamgourmet.net","spamgourmet.org","throwam.com","uggsrock.com","mvrht.com",
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

/**
 * Zapier Catch Hooks usually return 2xx once the payload is accepted. In some setups a
 * downstream action (e.g. GoHighLevel) fails with an auth error that is surfaced on the
 * HTTP response even though Zapier already stored the trigger data — treat as delivered.
 */
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

type ContactZapierPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneRaw: string;
  inquiryType?: string;
  interest?: string;
  leadType: string;
  source?: string;
};

async function submitContactToZapier(
  payload: ContactZapierPayload,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const webhook = process.env.ZAPIER_CONTACT_WEBHOOK_URL?.trim();
  if (!webhook) {
    return { ok: false, status: 503, error: "Zapier contact webhook is not configured." };
  }

  const { firstName, lastName, email, phoneRaw, inquiryType = "", interest = "", leadType, source } = payload;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const digits = phoneRaw.replace(/\D/g, "");
  const normalized =
    digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
  const phoneDisplay =
    normalized.length === 10
      ? `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`
      : phoneRaw;
  const phoneE164 = normalized.length === 10 ? `+1${normalized}` : "";

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
    source: source ?? "website-contact",
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
      console.error("Zapier contact webhook error:", zapRes.status, text.slice(0, 500));
      if (looksLikeDownstreamCrmTokenError(zapRes.status, text)) {
        console.warn(
          "Treating Zapier webhook HTTP error as success: response looks like a downstream CRM auth failure after the catch hook received the payload. Update the GoHighLevel step in your Zap.",
        );
        return { ok: true };
      }
      return { ok: false, status: 502, error: "Submission failed. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("Zapier contact webhook fetch failed:", e);
    return { ok: false, status: 502, error: "Could not reach the form service. Try again in a moment." };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    if (!process.env.ZAPIER_CONTACT_WEBHOOK_URL?.trim()) {
      res.status(503).json({
        error: "Contact form is not configured. Set ZAPIER_CONTACT_WEBHOOK_URL in environment variables.",
      });
      return;
    }

    const {
      firstName: rawFirst = "",
      lastName: rawLast = "",
      name: legacyName = "",
      email = "",
      phone = "",
      interest = "",
      inquiryType = "",
      source: rawSource = "",
    } = req.body || {};

    const firstName = String(rawFirst).trim() || (legacyName ? String(legacyName).trim().split(/\s+/)[0] : "");
    const lastName = String(rawLast).trim() || (legacyName ? String(legacyName).trim().split(/\s+/).slice(1).join(" ") : "");
    const trimmedEmail = String(email).trim();
    const rawPhone = phone ? String(phone).trim() : "";
    const phoneDigits = rawPhone.replace(/\D/g, "");
    const normalizedPhone = phoneDigits.startsWith("1") && phoneDigits.length === 11 ? phoneDigits.slice(1) : phoneDigits;

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

    const zapResult = await submitContactToZapier({
      firstName,
      lastName,
      email: trimmedEmail,
      phoneRaw: rawPhone,
      inquiryType: String(inquiryType || "").trim(),
      interest: String(interest || "").trim(),
      leadType,
      source: String(rawSource || "").trim() || undefined,
    });
    if (!zapResult.ok) {
      res.status(zapResult.status).json({ error: zapResult.error });
      return;
    }

    res.status(201).json({ ok: true });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error("Contact submit error:", err.message, err.stack);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
