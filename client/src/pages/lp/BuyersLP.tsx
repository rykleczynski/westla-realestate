/*
 * THE BLACK FOLIO — First-Time Buyers Landing Page
 * Meta ad destination: /lp/buyers
 * No nav/footer — no exit points. Gate required before content.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, DollarSign, MapPin, Shield, Clock, ArrowRight } from "lucide-react";
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
  { num: "01", icon: DollarSign, title: "Get Pre-Approved First", body: "Before you tour a single home, know your real budget. I connect you with LA lenders who specialize in first-time buyer programs — some require as little as 3% down." },
  { num: "02", icon: MapPin,     title: "Find the Right Neighborhood", body: "West LA is a collection of micro-markets. Palms, Sawtelle, Mar Vista, Westwood — each has a different price point, vibe, and growth trajectory. I'll help you find the fit." },
  { num: "03", icon: Shield,     title: "Make a Competitive Offer", body: "LA moves fast. I build offers backed by real comp data, negotiate strategically, and protect your interests at every step — without overpaying." },
  { num: "04", icon: CheckCircle, title: "Close with Confidence", body: "From inspection to escrow, I handle the complexity so you can focus on what matters: your new home." },
];

const truths = [
  { stat: "3%", label: "Minimum down payment with FHA loans in LA" },
  { stat: "$950K", label: "Median entry price in Palms — the most accessible West LA market" },
  { stat: "45–60", label: "Days average from accepted offer to close in Los Angeles" },
  { stat: "$0", label: "My fee to buyers — I'm compensated by the seller" },
];

const faqs = [
  { q: "How much do I actually need saved before buying in LA?", a: "With an FHA loan, as little as 3.5% down plus closing costs (typically 2–3%). For a $950K home in Palms, that's roughly $33K–$62K all-in. Down payment assistance programs can reduce that further." },
  { q: "What's the difference between pre-qualification and pre-approval?", a: "Pre-qualification is a soft estimate. Pre-approval is a verified commitment from a lender — it's what makes your offer competitive in LA's market. Don't tour homes without it." },
  { q: "Do I pay anything to work with you as a buyer?", a: "No. My commission is paid by the seller. You get full representation at no direct cost to you." },
  { q: "How long will it take to find a home?", a: "It depends on your criteria and how fast you can move when the right property appears. Most buyers I work with find their home within 2–4 months of starting the search seriously." },
];

const GATE_CONFIG = {
  storageKey: "lp_gate_buyers",
  eyebrow: "Free Buyer's Guide · West LA",
  headline: "Everything you need to buy your first home in Los Angeles.",
  sub: "Enter your info to get instant access to Ryan's first-time buyer guide, current market data, and a free consultation.",
  inquiryType: "buying",
  tag: "First-Time Buyer",
};

export default function BuyersLP() {
  return (
    <LandingPageGate config={GATE_CONFIG}>
      <div className="min-h-screen bg-[#111111]">

        {/* Hero */}
        <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/5">
          <div className="container">
            <Section>
              <motion.span variants={fadeUp} className="section-label block mb-4">First-Time Buyer Guide · West LA</motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
                Your first home in LA<span className="font-light"> is closer than you think.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/50 max-w-xl leading-relaxed mb-10">
                Most first-time buyers in LA think they can't afford it. Most of them are wrong. Here's what the market actually looks like — and how to get in.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="sms:+12242491004"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Text Ryan Directly <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
            </Section>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 lg:py-24 border-b border-white/5">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {truths.map((t) => (
                <div key={t.stat} className="bg-[#111111] p-8 lg:p-10">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{t.stat}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container">
            <Section className="mb-14">
              <motion.span variants={fadeUp} className="section-label block mb-3">The Process</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight max-w-xl">
                Four steps from renter<span className="font-light"> to homeowner.</span>
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
              <motion.span variants={fadeUp} className="section-label block mb-3">Common Questions</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight">
                What buyers actually want to know.
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
              <motion.span variants={fadeUp} className="section-label block mb-4">Ready to Start?</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-5">
                Let's find your first home<span className="font-light"> in West LA.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-white/50 mb-10 leading-relaxed">
                No pressure, no pitch. Just a straightforward conversation about what's possible for your budget and timeline.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="sms:+12242491004"
                  className="px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
                >
                  Text Ryan
                </a>
                <a
                  href="mailto:rkleczynski@kw.com"
                  className="px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/5 transition-colors"
                >
                  Send an Email
                </a>
              </motion.div>
            </Section>
          </div>
        </section>

        {/* Footer strip */}
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
