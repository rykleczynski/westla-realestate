/** True when the API error is almost certainly from a GoHighLevel / Zapier CRM step, not the site. */
export function isLikelyDownstreamGhlTokenError(raw: unknown): boolean {
  return typeof raw === "string" && /private\s+integration\s+token|invalid\s+private\s+integration/i.test(raw);
}

/**
 * Turns API `error` strings into copy safe for toasts. Hides noisy downstream CRM
 * messages (e.g. GoHighLevel private integration token errors from Zapier or legacy APIs).
 */
export function formatContactApiError(raw: unknown): string {
  const s = typeof raw === "string" ? raw.trim() : "";
  if (!s) return "Something went wrong. Please try again.";
  if (/private\s+integration\s+token/i.test(s) || /invalid\s+private\s+integration/i.test(s)) {
    return "Your message was received. If a Zap uses GoHighLevel, open that Zap and renew the GoHighLevel connection or API token there.";
  }
  return s;
}
