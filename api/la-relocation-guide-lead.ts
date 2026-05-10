import type { VercelRequest, VercelResponse } from "@vercel/node";
import { submitLaRelocationGuideLeadToZapier } from "../shared/submitLaRelocationGuideLead";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const {
      firstName: rawFirst = "",
      lastName: rawLast = "",
      email = "",
      phone = "",
      interest = "",
      inquiryType = "",
      source: rawSource = "",
    } = req.body || {};

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
