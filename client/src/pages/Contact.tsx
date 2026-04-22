/*
 * THE BLACK FOLIO — Contact Page
 * Contact form, office info, and map
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getWebPageSchema, getBreadcrumbSchema } from "@/components/SEO";
import { toast } from "sonner";
import BookingCalendar from "@/components/BookingCalendar";
import { formatContactApiError, isLikelyDownstreamGhlTokenError } from "@/lib/formatContactApiError";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName?.trim() ||
      !formData.lastName?.trim() ||
      !formData.email?.trim() ||
      !formData.phone?.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          inquiryType: formData.inquiryType || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const apiError = (data as { error?: unknown }).error;
      if (!res.ok && !isLikelyDownstreamGhlTokenError(apiError)) {
        toast.error(formatContactApiError(apiError));
        return;
      }
      toast.success("Message sent! We'll be in touch within 24 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
      });
    } catch {
      toast.error("Could not send message. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Contact West LA Real Estate Team | Book a Consult"
        description="Contact our West LA real estate team for buying, selling, and investor support across Los Angeles neighborhoods."
        canonical="https://ryanklosangeles.com/contact"
        schema={[
          getWebPageSchema(
            "Contact West LA Real Estate Team",
            "Contact page for consultations and real estate inquiries.",
            "https://ryanklosangeles.com/contact",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "Contact", url: "https://ryanklosangeles.com/contact" },
          ]),
        ]}
      />
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-8">
                <motion.span variants={fadeUp} className="section-label block mb-4">
                  Get in Touch
                </motion.span>
                <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                  Let&apos;s Start a
                  <span className="font-light"> Conversation</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl leading-relaxed">
                  Whether you&apos;re ready to buy, sell, or invest — or just have questions
                  about the West LA market — we&apos;re here to help.
                </motion.p>
              </div>
              <motion.div variants={fadeUp} className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="aspect-[4/5] w-full max-w-xs overflow-hidden folio-frame">
                  <img
                    src="/ryan-headshot.png"
                    alt="Ryan Kleczynski"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="hairline" />

      {/* Contact Form + Info */}
      <section id="contact-form" className="py-16 lg:py-24 scroll-mt-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <motion.div variants={fadeUp}>
                  <h2 className="text-2xl font-bold tracking-tight mb-8">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                          First name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="First name"
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                          Last name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Last name"
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@email.com"
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                          Phone number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(310) 555-0000"
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                        Inquiry type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white focus:border-white/30 focus:outline-none transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="buying">Buying a Home</option>
                        <option value="selling">Selling My Home</option>
                        <option value="investing">Investment Properties</option>
                        <option value="leasing">Leasing / Tenant Placement</option>
                        <option value="valuation">Home Valuation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? "Sending…" : "Submit"}
                    </button>
                  </form>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <motion.div variants={fadeUp} className="space-y-8">
                  <div className="folio-frame p-6 bg-[#161616]">
                    <h3 className="text-base font-semibold tracking-wide mb-6">Office Information</h3>
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-4 h-4 text-silver mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Address</p>
                          <p className="text-sm text-white/40">
                            1437 7th Street, Santa Monica, CA 90401
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="w-4 h-4 text-silver mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Phone</p>
                          <p className="text-sm text-white/40">(224)-249-1004</p>                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Mail className="w-4 h-4 text-silver mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Email</p>
                          <p className="text-sm text-white/40">rkleczynski@kw.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="w-4 h-4 text-silver mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Hours</p>
                          <p className="text-sm text-white/40">
                            Mon — Fri: 9:00 AM — 6:00 PM<br />
                            Sat: 10:00 AM — 4:00 PM<br />
                            Sun: By Appointment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="folio-frame p-6 bg-[#161616]">
                    <h3 className="text-base font-semibold tracking-wide mb-3">Quick Response</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      We respond to all inquiries within 24 hours. For urgent matters,
                      please call us directly at (224)-249-1004.
                    </p>
                  </div>

                  <div className="folio-frame p-6 bg-[#161616]">
                    <h3 className="text-base font-semibold tracking-wide mb-3">Service Areas</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Brentwood", "Santa Monica", "Westwood", "Century City", "Palms", "Sawtelle", "Venice"].map((area) => (
                        <span key={area} className="px-3 py-1.5 text-xs tracking-wider uppercase border border-white/10 text-white/50">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section id="schedule" className="pb-16 lg:pb-24">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
                Schedule a Consultation
              </h2>
              <p className="text-sm text-white/50 mb-6 max-w-2xl">
                Choose a time that works best for you to discuss your buying, selling, or investing goals in West LA.
              </p>
              <BookingCalendar />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
