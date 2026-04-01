/*
 * Privacy Policy — Termly embed (synced from dashboard) + fallbacks
 */
import { useEffect, useLayoutEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getBreadcrumbSchema, getWebPageSchema } from "@/components/SEO";

const TERMLY_POLICY_ID = "711760c3-2a7f-4fd6-8da8-df800cffc2aa";
const EMBED_SCRIPT_SRC = "https://app.termly.io/embed-policy.min.js";

export default function PrivacyPolicy() {
  const termlyHostRef = useRef<HTMLDivElement>(null);
  const termlyEmbedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = termlyEmbedRef.current;
    if (!el) return;
    el.setAttribute("name", "termly-embed");
    el.setAttribute("data-id", TERMLY_POLICY_ID);
  }, []);

  useEffect(() => {
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = EMBED_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    const el = termlyHostRef.current;
    if (!el) return;

    const reveal = () => el.classList.remove("privacy-termly-pending");
    const obs = new MutationObserver(() => {
      if (el.querySelector("iframe") || el.scrollHeight > 240) reveal();
    });
    obs.observe(el, { childList: true, subtree: true });
    const t = window.setTimeout(reveal, 10000);

    return () => {
      window.clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Ryan K Real Estate — how we collect, use, and protect your information."
        canonical="https://ryanklosangeles.com/privacy-policy"
        schema={[
          getWebPageSchema(
            "Privacy Policy",
            "Privacy notice for Ryan K Real Estate services and website.",
            "https://ryanklosangeles.com/privacy-policy",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "Privacy Policy", url: "https://ryanklosangeles.com/privacy-policy" },
          ]),
        ]}
      />
      <Navigation />

      <section className="relative pt-28 pb-8 lg:pt-36 border-b border-white/5">
        <div className="container">
          <span className="section-label block mb-4">Legal</span>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 max-w-2xl leading-relaxed">
            How we handle personal information when you use our website and services. You can also submit a{" "}
            <a
              href={`https://app.termly.io/dsar/${TERMLY_POLICY_ID}`}
              className="text-white/80 underline underline-offset-4 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              data subject access request
            </a>{" "}
            or email{" "}
            <a href="mailto:rkleczynski@kw.com" className="text-white/80 underline underline-offset-4 hover:text-white">
              rkleczynski@kw.com
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div
            ref={termlyHostRef}
            className="privacy-termly-pending max-w-4xl mx-auto rounded-lg border border-black/10 bg-white px-4 py-8 sm:px-8 shadow-sm text-[#111]"
          >
            {/* Termly scans for [name="termly-embed"][data-id] (attrs set in useLayoutEffect for TS) */}
            <div ref={termlyEmbedRef} />
            <noscript>
              <p className="text-sm text-neutral-600">
                JavaScript is required to display this policy. Please enable scripts or contact{" "}
                <a href="mailto:rkleczynski@kw.com">rkleczynski@kw.com</a>.
              </p>
            </noscript>
          </div>
          <p className="max-w-4xl mx-auto mt-6 text-center text-xs text-white/40">
            Policy hosted by Termly. If the document does not appear, confirm your policy ID in the Termly dashboard
            matches this embed or use the links above.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
