import { Link } from "wouter";

const embedUrl = (import.meta.env.VITE_GET_IN_TOUCH_EMBED_URL as string | undefined)?.trim();

export default function GetInTouchForm() {
  if (embedUrl) {
    return (
      <div className="w-full" style={{ minHeight: 520 }}>
        <iframe
          src={embedUrl}
          style={{ width: "100%", minHeight: 520, height: "100%", border: "none", borderRadius: "3px" }}
          title="Get in Touch"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center py-4">
      <p className="text-sm text-white/45 leading-relaxed">
        Request a personalized home valuation or selling strategy — we&apos;ll follow up with next steps.
      </p>
      <Link
        href="/contact#contact-form"
        className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
      >
        Contact us
      </Link>
      <p className="text-xs text-white/35">
        Optional: set <span className="font-mono text-white/50">VITE_GET_IN_TOUCH_EMBED_URL</span> to embed an external
        form.
      </p>
    </div>
  );
}
