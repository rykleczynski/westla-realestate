import { Link } from "wouter";

const embedUrl = (import.meta.env.VITE_BOOKING_EMBED_URL as string | undefined)?.trim();

export default function BookingCalendar() {
  if (embedUrl) {
    return (
      <div className="w-full" style={{ minHeight: 900 }}>
        <iframe
          src={embedUrl}
          style={{ width: "100%", border: "none", overflow: "hidden", height: "900px" }}
          scrolling="no"
          title="Schedule a Consultation"
        />
      </div>
    );
  }

  return (
    <div className="folio-frame p-8 lg:p-10 bg-[#161616] text-center space-y-5">
      <p className="text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
        To book a consultation, send a message using the form above or call{" "}
        <a href="tel:+12242491004" className="text-white/80 hover:text-white underline-offset-4 hover:underline">
          (224) 249-1004
        </a>
        . We typically reply within one business day.
      </p>
      <Link
        href="/contact#contact-form"
        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
      >
        Go to contact form
      </Link>
      <p className="text-xs text-white/35 max-w-md mx-auto">
        To embed a scheduler here, set <span className="font-mono text-white/50">VITE_BOOKING_EMBED_URL</span> in your
        environment (e.g. Calendly or another booking iframe URL).
      </p>
    </div>
  );
}
