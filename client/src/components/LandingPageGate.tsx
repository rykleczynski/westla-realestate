/*
 * LandingPageGate — Full-screen lead capture gate for Meta ad landing pages.
 * Shown on first visit. Submits to /api/contact (default) or config.submitApiPath → Zapier / CRM.
 * Dismissed on successful submission; unlocks the page content beneath.
 */
import { useState } from "react";
import { formatContactApiError, isLikelyDownstreamGhlTokenError } from "@/lib/formatContactApiError";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface GateConfig {
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
  /** Defaults to /api/contact. Set to /api/la-relocation-guide-lead for the relocation LP Zapier hook. */
  submitApiPath?: string;
  /** After a successful submit, show this screen before revealing page content (e.g. email delivery instructions). */
  thankYou?: {
    headline: string;
    body: string;
    continueLabel?: string;
  };
  /**
   * "light" matches the static 1031 playbook guide (cream page #fafaf8, white card, mauve CTA).
   * Default "dark" is the Black Folio gate used by /lp/1031 and other LPs.
   */
  gateTheme?: "dark" | "light";
}

interface Props {
  config: GateConfig;
  children: React.ReactNode;
}

/** text-base avoids iOS zoom on field focus; min height improves tap targets. */
const INPUT =
  "w-full min-h-[48px] bg-[#0e0e0e] border border-white/10 text-white text-base sm:text-sm px-4 py-3.5 placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors";

const INPUT_LIGHT =
  "w-full min-h-[48px] rounded-lg border border-stone-200 bg-[#fafaf8] text-base text-stone-900 sm:text-sm px-4 py-3.5 placeholder:text-stone-400 focus:border-[#8a6a5a] focus:outline-none focus:ring-2 focus:ring-[#8a6a5a]/20 transition-colors";

export default function LandingPageGate({ config, children }: Props) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(config.storageKey) === "1"
  );
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thankYouStep, setThankYouStep] = useState(false);

  const light = config.gateTheme === "light";

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
      const submitUrl = config.submitApiPath?.trim() || "/api/contact";
      const res = await fetch(submitUrl, {
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
      if (config.thankYou) {
        setThankYouStep(true);
      } else {
        setUnlocked(true);
      }
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
            className={`fixed inset-0 z-50 overflow-y-auto overflow-x-hidden overscroll-y-contain ${light ? "bg-[#fafaf8]" : "bg-[#111111]"}`}
          >
            {/*
              Mobile / in-app browsers (Instagram, etc.): avoid vertical centering so content is not
              clipped under the webview chrome. Large top padding + safe-area clears the cut-off header.
              Desktop: center the card in the viewport.
            */}
            <div className="flex min-h-svh flex-col justify-start px-4 pt-[max(4.5rem,calc(env(safe-area-inset-top,0px)+3rem))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:min-h-screen sm:justify-center sm:px-5 sm:py-10 sm:pt-10">
              <div className="mx-auto w-full max-w-md">
                {/* Branding */}
                <div className="mb-4 text-center sm:mb-8">
                  <span
                    className={`inline-block max-w-[20rem] px-1 text-[0.58rem] font-medium uppercase leading-snug tracking-[0.12em] sm:max-w-none sm:text-[0.625rem] sm:tracking-[0.16em] ${light ? "text-stone-500" : "section-label tracking-[0.12em] sm:tracking-[0.2em]"}`}
                  >
                    Ryan Kleczynski
                    <span className="hidden sm:inline"> · </span>
                    <br className="sm:hidden" aria-hidden="true" />
                    DRE #02402858 · Keller Williams
                  </span>
                </div>

                {/* Card */}
                <div
                  className={`p-5 sm:p-8 lg:p-10 ${light ? "rounded-xl border border-stone-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)]" : "border border-white/10 bg-[#161616]"}`}
                >
                {thankYouStep && config.thankYou ? (
                  <>
                    <p
                      className={`mb-3 text-[0.625rem] font-medium uppercase tracking-[0.16em] ${light ? "text-stone-500" : "section-label"}`}
                    >
                      Thank you
                    </p>
                    <h2
                      className={`mb-4 text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl ${light ? "text-stone-900" : "text-white"}`}
                    >
                      {config.thankYou.headline}
                    </h2>
                    <p className={`mb-8 text-sm leading-relaxed ${light ? "text-stone-600" : "text-white/50"}`}>{config.thankYou.body}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setThankYouStep(false);
                        setUnlocked(true);
                      }}
                      className={`min-h-[48px] w-full rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors sm:py-4 ${light ? "bg-[#8a6a5a] text-white hover:bg-[#9d7664]" : "bg-white text-black hover:bg-white/90"}`}
                    >
                      {config.thankYou.continueLabel ?? "Continue to guide"}
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      className={`mb-2 text-[0.625rem] font-medium uppercase tracking-[0.16em] sm:mb-3 ${light ? "text-stone-500" : "section-label"}`}
                    >
                      {config.eyebrow}
                    </p>
                    <h2
                      className={`mb-3 text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl ${light ? "text-stone-900" : "text-white"}`}
                    >
                      {config.headline}
                    </h2>
                    <p className={`mb-6 text-sm leading-relaxed sm:mb-8 ${light ? "text-stone-600" : "text-white/50"}`}>{config.sub}</p>

                    <form onSubmit={submit} noValidate>
                      <div className="mb-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                        <input
                          className={light ? INPUT_LIGHT : INPUT}
                          placeholder="First name"
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={set("firstName")}
                          disabled={loading}
                        />
                        <input
                          className={light ? INPUT_LIGHT : INPUT}
                          placeholder="Last name"
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={set("lastName")}
                          disabled={loading}
                        />
                      </div>
                      <input
                        className={`${light ? INPUT_LIGHT : INPUT} mb-3`}
                        type="email"
                        placeholder="Email address"
                        autoComplete="email"
                        value={form.email}
                        onChange={set("email")}
                        disabled={loading}
                      />
                      <input
                        className={`${light ? INPUT_LIGHT : INPUT} mb-6`}
                        type="tel"
                        placeholder="Phone number"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        disabled={loading}
                      />

                      {error && (
                        <p className={`text-xs mb-4 ${light ? "text-red-700" : "text-red-400"}`}>{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors disabled:opacity-50 sm:py-4 ${light ? "bg-[#8a6a5a] text-white hover:bg-[#9d7664]" : "bg-white text-black hover:bg-white/90"}`}
                      >
                        {loading ? (
                          <>
                            <Loader2 className={`h-3.5 w-3.5 animate-spin ${light ? "text-white" : "text-black"}`} />
                            Submitting…
                          </>
                        ) : (
                          "Get Free Access →"
                        )}
                      </button>
                    </form>

                    <p className={`mt-4 text-center text-xs leading-relaxed sm:mt-5 ${light ? "text-stone-500" : "text-white/25"}`}>
                      Your information is never shared or sold. No spam: just real estate intel.
                    </p>
                  </>
                )}
                </div>

                {/* Hairline */}
                {light ? (
                  <div className="mb-4 mt-6 h-px bg-stone-200 sm:mb-6 sm:mt-8" />
                ) : (
                  <div className="hairline mb-4 mt-6 sm:mb-6 sm:mt-8" />
                )}
                <p className={`pb-2 text-center text-xs tracking-wide sm:pb-0 ${light ? "text-stone-400" : "text-white/20"}`}>
                  ryanklosangeles.com · Los Angeles, CA
                </p>
              </div>
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
