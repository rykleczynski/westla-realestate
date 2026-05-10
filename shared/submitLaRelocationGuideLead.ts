/**
 * POSTs LA Relocation Neighborhood Guide gate leads to ZAPIER_LA_RELOCATION_GUIDE_WEBHOOK_URL.
 * application/x-www-form-urlencoded so Zapier Catch Hook maps one field per key.
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

export type LaRelocationGuideLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneRaw: string;
  inquiryType: string;
  interest: string;
  source: string;
};

export async function submitLaRelocationGuideLeadToZapier(
  payload: LaRelocationGuideLeadPayload,
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
