/*
 * THE BLACK FOLIO — Contact Page
 * Contact form, office info, and map
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getWebPageSchema, getBreadcrumbSchema } from "@/components/SEO";
import GetInTouchForm from "@/components/GetInTouchForm";

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
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Contact West LA Real Estate Team | Book a Consult"
        description="Contact our West LA real estate team for buying, selling, and investor support across Los Angeles neighborhoods."
        canonical="https://westla.realestate/contact"
        schema={[
          getWebPageSchema(
            "Contact West LA Real Estate Team",
            "Contact page for consultations and real estate inquiries.",
            "https://westla.realestate/contact",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://westla.realestate/" },
            { name: "Contact", url: "https://westla.realestate/contact" },
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
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <motion.div variants={fadeUp}>
                  <h2 className="text-2xl font-bold tracking-tight mb-8">Send Us a Message</h2>
                  <GetInTouchForm />
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

      <Footer />
    </div>
  );
}
