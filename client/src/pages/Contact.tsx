/*
 * THE BLACK FOLIO — Contact Page
 * Contact form, office info, and map
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

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
    name: "", email: "", phone: "", interest: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll be in touch within 24 hours.");
    setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container">
          <AnimatedSection>
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
          </AnimatedSection>
        </div>
      </section>

      <div className="hairline" />

      {/* Contact Form + Info */}
      <section className="py-16 lg:py-24">
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
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                        />
                      </div>
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
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(310) 555-0000"
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                          I&apos;m Interested In
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white focus:border-white/30 focus:outline-none transition-colors"
                        >
                          <option value="">Select an option</option>
                          <option value="buying">Buying a Home</option>
                          <option value="selling">Selling My Home</option>
                          <option value="investing">Investment Properties</option>
                          <option value="valuation">Home Valuation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.1em] uppercase text-white/40 mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your real estate goals..."
                        rows={5}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
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
                            West Los Angeles, CA 90025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="w-4 h-4 text-silver mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Phone</p>
                          <p className="text-sm text-white/40">(310) 555-0100</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Mail className="w-4 h-4 text-silver mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Email</p>
                          <p className="text-sm text-white/40">info@westla.realestate</p>
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
                      please call us directly at (310) 555-0100.
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

      <Footer />
    </div>
  );
}
