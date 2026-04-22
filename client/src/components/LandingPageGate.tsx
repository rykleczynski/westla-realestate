/*
 * LandingPageGate — Full-screen lead capture gate for Meta ad landing pages.
 * Shown on first visit. Submits to /api/contact → Zapier webhook.
 * Dismissed on successful submission; unlocks the page content beneath.
 */
import { useState } from "react";
import { formatContactApiError, isLikelyDownstreamGhlTokenError } from "@/lib/formatContactApiError";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface GateConfig {
  /** Storage key — unique per landing page so each gate tracks independently */
  storageKey: string;
  /** Eyebrow label above the headline */
  eyebrow: string;
  /** Main gate headline */
  headline: string;
  /** Sub-copy below headline */
  sub: string;
  /** inquiryType value sent to /api/contact */
  inquiryType: string;
  /** Tag sent to CRM for pipeline routing */
  tag: string;
}

interface Props {
  config: GateConfig;
  children: React.ReactNode;
}

const INPUT =
  "w-full bg-[#0e0e0e] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors";

export default function LandingPageGate({ config, children }: Props) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(config.storageKey) === "1"
  );
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { firstName, lastName, email, phone } = form;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError("All fields are required.");
      return;
    }

    // Email format validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Phone validation — strip formatting, require 10 digits
    const digits = phone.replace(/\D/g, "");
    const normalized = digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
    if (normalized.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    // Reject obviously fake numbers (all same digit, sequential)
    if (/^(\d)\1{9}$/.test(normalized) || normalized === "1234567890" || normalized === "0987654321") {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          inquiryType: config.inquiryType,
          interest: config.tag,
          source: "Meta Ad Landing Page",
        }),
      });
      const data = await res.json().catch(() => ({}));
      const apiError = (data as { error?: unknown }).error;
      if (!res.ok && !isLikelyDownstreamGhlTokenError(apiError)) {
        throw new Error(formatContactApiError(apiError));
      }
      sessionStorage.setItem(config.storageKey, "1");
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 bg-[#111111] flex items-center justify-center px-4 overflow-y-auto py-10"
          >
            <div className="w-full max-w-md">
              {/* Branding */}
              <div className="mb-8 text-center">
                <span className="section-label">Ryan Kleczynski · DRE #02402858 · Keller Williams</span>
              </div>

              {/* Card */}
              <div className="bg-[#161616] border border-white/10 p-8 lg:p-10">
                <p className="section-label mb-3">{config.eyebrow}</p>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3 leading-tight">
                  {config.headline}
                </h2>
                <p className="text-sm text-white/50 mb-8 leading-relaxed">{config.sub}</p>

                <form onSubmit={submit} noValidate>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      className={INPUT}
                      placeholder="First name"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={set("firstName")}
                      disabled={loading}
                    />
                    <input
                      className={INPUT}
                      placeholder="Last name"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={set("lastName")}
                      disabled={loading}
                    />
                  </div>
                  <input
                    className={`${INPUT} mb-3`}
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    disabled={loading}
                  />
                  <input
                    className={`${INPUT} mb-6`}
                    type="tel"
                    placeholder="Phone number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    disabled={loading}
                  />

                  {error && (
                    <p className="text-red-400 text-xs mb-4">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase py-4 hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Get Free Access →"
                    )}
                  </button>
                </form>

                <p className="text-white/25 text-xs mt-5 text-center leading-relaxed">
                  Your information is never shared or sold. No spam — just real estate intel.
                </p>
              </div>

              {/* Hairline */}
              <div className="hairline mt-8 mb-6" />
              <p className="text-white/20 text-xs text-center tracking-wide">
                ryanklosangeles.com · Los Angeles, CA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — always rendered so it's ready when gate lifts */}
      <div className={unlocked ? "block" : "invisible pointer-events-none select-none"}>
        {children}
      </div>
    </>
  );
}
