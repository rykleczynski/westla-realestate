/**
 * Validates a 1031 playbook lead and POSTs to a Zapier Catch Hook URL.
 *
 * Uses application/x-www-form-urlencoded so Zapier shows one field per input
 * (JSON often appears as a single unparsed blob in Catch Hook).
 *
 * Map in Zap → Airtable: firstName, lastName, email, phone (display), phoneDigits, phoneE164,
 * fullName, tcpaOptIn, tcpa_consent_at, tcpa_consent_text, source, leadMagnet, submittedAt (+ snake_case aliases).
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

/** US display: (310) 555-0199 */
function formatUsPhoneDisplay(digits10: string): string {
  return `(${digits10.slice(0, 3)}) ${digits10.slice(3, 6)}-${digits10.slice(6)}`;
}

function buildZapierFormBody(fields: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    params.append(key, value);
  }
  return params.toString();
}

export type PlaybookLeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Required for TCPA — must be true */
  tcpaOptIn: boolean;
  /** Honeypot — must be empty (obscure name so browsers do not autofill) */
  _hp?: string;
};

const TCPA_CONSENT_SNAPSHOT =
  "I agree to receive marketing calls and texts (including autodialed or prerecorded messages) at the number provided from Ryan Kleczynski / Keller Williams Realty. Message and data rates may apply. Consent is not a condition of purchase. I can opt out anytime (e.g. reply STOP to texts).";

/** Accepts boolean true or common string encodings from JSON / forms. */
export function isTcpaOptInTrue(v: unknown): boolean {
  if (v === true) return true;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "on" || s === "yes";
  }
  return false;
}

export type PlaybookLeadResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function submit1031PlaybookLead(input: PlaybookLeadInput): Promise<PlaybookLeadResult> {
  if (input._hp != null && String(input._hp).trim() !== "") {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  if (!isTcpaOptInTrue(input.tcpaOptIn)) {
    return {
      ok: false,
      status: 400,
      error: "Please check the consent box to continue — it is required to send you the guide and related messages.",
    };
  }

  const firstName = String(input.firstName || "").trim();
  const lastName = String(input.lastName || "").trim();
  const email = String(input.email || "").trim();
  const rawPhone = String(input.phone || "").trim();

  if (!firstName || !lastName || !email || !rawPhone) {
    return { ok: false, status: 400, error: "First name, last name, email, and mobile phone are required." };
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRe.test(email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address." };
  }
  if (isDisposableEmail(email)) {
    return { ok: false, status: 400, error: "Please use a real email address." };
  }

  const phoneDigits = rawPhone.replace(/\D/g, "");
  const normalized =
    phoneDigits.startsWith("1") && phoneDigits.length === 11 ? phoneDigits.slice(1) : phoneDigits;
  if (normalized.length !== 10 || isObviouslyFakePhone(normalized)) {
    return { ok: false, status: 400, error: "Please enter a valid 10-digit U.S. phone number." };
  }

  const webhook = process.env.ZAPIER_1031_PLAYBOOK_WEBHOOK_URL?.trim();
  if (!webhook) {
    return {
      ok: false,
      status: 503,
      error: "This form is not connected yet. Ask the site owner to set ZAPIER_1031_PLAYBOOK_WEBHOOK_URL.",
    };
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const phoneDisplay = formatUsPhoneDisplay(normalized);
  const phoneE164 = `+1${normalized}`;
  const submittedAt = new Date().toISOString();

  // Flat form fields — Zapier Catch Hook maps each key separately.
  const formFields: Record<string, string> = {
    firstName,
    lastName,
    fullName,
    email,
    phone: phoneDisplay,
    phoneDigits: normalized,
    phoneE164,
    phoneRaw: rawPhone,
    tcpaOptIn: "true",
    tcpa_opt_in: "true",
    tcpa_consent_at: submittedAt,
    tcpa_consent_text: TCPA_CONSENT_SNAPSHOT,
    source: "1031-playbook-guide-landing",
    leadMagnet: "West LA 1031 Playbook",
    submittedAt,
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    phone_display: phoneDisplay,
    phone_digits: normalized,
    phone_e164: phoneE164,
    lead_magnet: "West LA 1031 Playbook",
    submitted_at: submittedAt,
  };

  const formBody = buildZapierFormBody(formFields);

  let zapRes: Response;
  try {
    zapRes = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json, */*;q=0.1",
      },
      body: formBody,
    });
  } catch (e) {
    console.error("Zapier webhook fetch failed:", e);
    return { ok: false, status: 502, error: "Could not reach the form service. Try again in a moment." };
  }

  if (!zapRes.ok) {
    const text = await zapRes.text().catch(() => "");
    console.error("Zapier webhook error:", zapRes.status, text.slice(0, 500));
    return { ok: false, status: 502, error: "Submission failed. Please try again." };
  }

  return { ok: true };
}
