/*
 * THE BLACK FOLIO — Potential Sellers Landing Page
 * Meta ad destination: /lp/sellers
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, Home, Star, DollarSign, ArrowRight } from "lucide-react";
import LandingPageGate from "@/components/LandingPageGate";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

const steps = [
  { num: "01", icon: BarChart3,  title: "Free Home Valuation",       body: "Before anything else, you need to know what your home is actually worth in today's market — not Zillow's estimate, which can be off by 10–20% in West LA." },
  { num: "02", icon: Home,       title: "Positioning Strategy",       body: "How you present, price, and time your listing determines whether you get one offer or ten. I build a strategy around your specific home and your specific goals." },
  { num: "03", icon: Star,       title: "Maximum Market Exposure",    body: "Professional photography, targeted digital advertising, and placement across every platform buyers use — not just MLS." },
  { num: "04", icon: DollarSign, title: "Negotiate the Best Terms",   body: "Price is just the start. Contingencies, close date, repairs, and credits are all negotiable. I fight for the outcome that's best for you." },
];

const stats = [
  { stat: "17",    label: "Average days on market for well-priced West LA homes (2026)" },
  { stat: "101%",  label: "Average list-to-sale ratio in strong West LA markets" },
  { stat: "$1.4M", label: "Median sale price for single-family homes in West LA (2026)" },
  { stat: "0",     label: "Upfront costs to list — you pay commission only at close" },
];

const faqs = [
  { q: "How do I know what my home is worth right now?", a: "A Comparative Market Analysis (CMA) pulls actual closed sales from the past 90 days in your specific area, adjusted for your home's size, condition, and features. I'll prepare one for you at no cost." },
  { q: "Is now a good time to sell in West LA?", a: "West LA inventory remains historically low, which favors sellers. Properly priced and presented homes are still receiving multiple offers. Timing matters less than strategy." },
  { q: "Do I need to renovate before selling?", a: "Usually not. The market pays for location and bones, not finishes. Strategic cosmetic updates — fresh paint, landscaping, staging — often yield better returns than full renovations." },
  { q: "How much commission do I pay?", a: "Seller commission is negotiated — there's no fixed rate. We'll discuss a structure that makes sense for your situation. I'm transparent about it from the first conversation." },
];

const GATE_CONFIG = {
  storageKey: "lp_gate_sellers",
  eyebrow: "Free Home Valuation · West LA",
  headline: "Find out what your West LA home is worth in today's market.",
  sub: "Enter your info to get Ryan's free Comparative Market Analysis and a no-pressure conversation about your selling options.",
  inquiryType: "selling",
  tag: "Potential Seller",
};

export default function SellersLP() {
  return (
    <LandingPageGate config={GATE_CONFIG}>
      <div className="min-h-screen bg-[#111111]">

        {/* Hero */}
        <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/5">
          <div className="container">
            <Section>
              <motion.span variants={fadeUp} className="section-label block mb-4">Home Sellers · West LA</motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
                Your West LA home is probably worth more<span className="font-light"> than you think.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/50 max-w-xl leading-relaxed mb-10">
                West LA appreciation has been significant. Most homeowners significantly underestimate their equity — and what the right strategy can achieve at sale.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="sms:+12242491004"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Get Your Free Valuation <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
            </Section>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 lg:py-24 border-b border-white/5">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {stats.map((s) => (
                <div key={s.stat} className="bg-[#111111] p-8 lg:p-10">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{s.stat}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container">
            <Section className="mb-14">
              <motion.span variants={fadeUp} className="section-label block mb-3">The Selling Process</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight max-w-xl">
                How I get you<span className="font-light"> maximum value at sale.</span>
              </motion.h2>
            </Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
              {steps.map((s) => (
                <Section key={s.num}>
                  <motion.div variants={fadeUp} className="bg-[#111111] p-8 lg:p-10 h-full">
                    <div className="flex items-start gap-5">
                      <span className="text-4xl font-extralight text-white/10 leading-none pt-1">{s.num}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <s.icon className="w-4 h-4 text-white/40" />
                          <h3 className="text-sm font-semibold tracking-wide">{s.title}</h3>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container max-w-3xl">
            <Section className="mb-12">
              <motion.span variants={fadeUp} className="section-label block mb-3">Seller FAQs</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight">
                Questions sellers actually ask.
              </motion.h2>
            </Section>
            <div className="space-y-px bg-white/5">
              {faqs.map((f) => (
                <Section key={f.q}>
                  <motion.div variants={fadeUp} className="bg-[#111111] p-7 lg:p-8">
                    <p className="text-sm font-semibold mb-3">{f.q}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{f.a}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="container text-center max-w-2xl">
            <Section>
              <motion.span variants={fadeUp} className="section-label block mb-4">No Commitment Required</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-5">
                Start with a free valuation.<span className="font-light"> Decide from there.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-white/50 mb-10 leading-relaxed">
                Knowing what your home is worth costs you nothing. It's the right first step — whether you're selling in 30 days or 3 years.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="sms:+12242491004" className="px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors">
                  Text Ryan
                </a>
                <a href="mailto:rkleczynski@kw.com" className="px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/5 transition-colors">
                  Send an Email
                </a>
              </motion.div>
            </Section>
          </div>
        </section>

        <div className="border-t border-white/5 py-6">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/25 tracking-wide">Ryan Kleczynski · DRE #02402858 · Keller Williams</p>
            <p className="text-xs text-white/25">ryanklosangeles.com · Los Angeles, CA</p>
          </div>
        </div>
      </div>
    </LandingPageGate>
  );
}
