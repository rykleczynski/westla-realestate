/**
 * POSTs general website contact leads to ZAPIER_CONTACT_WEBHOOK_URL (Catch Hook).
 * Uses application/x-www-form-urlencoded so Zapier maps one field per key.
 */

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

export type ContactZapierPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneRaw: string;
  /** Raw inquiryType from the form (e.g. buying, selling) */
  inquiryType?: string;
  /** Tag or legacy interest string */
  interest?: string;
  /** Human-readable type for CRM-style routing */
  leadType: string;
  /** e.g. Website, Meta Ad Landing Page */
  source?: string;
};

export async function submitContactToZapier(
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
