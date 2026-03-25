/*
 * THE BLACK FOLIO — Investors Landing Page
 * Meta ad destination: /lp/investors
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Search, BarChart3, Building2, ArrowRight } from "lucide-react";
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

const pillars = [
  { icon: Search,     title: "Off-Market Deal Flow",       body: "The best investment properties in LA never hit Zillow. I source off-market multifamily, fix-and-flip, and BRRRR candidates through my network before they're publicly listed." },
  { icon: BarChart3,  title: "Underwriting Support",        body: "I run the numbers with you — cap rates, cash-on-cash returns, rent roll analysis, and realistic exit scenarios — before you commit to anything." },
  { icon: Building2,  title: "Multifamily Expertise",       body: "From duplexes to 10-unit buildings in West LA, I know the submarkets, the rent control landscape, and what actually pencils in today's market." },
  { icon: TrendingUp, title: "Long-Term Portfolio Strategy", body: "Not just one deal — the right sequence of deals. I help investors think about how each acquisition sets up the next, including 1031 exit strategies." },
];

const stats = [
  { stat: "5.2%",   label: "Average cap rate on small multifamily in West LA (2026)" },
  { stat: "$1.1M",  label: "Median duplex price in Culver City / Mar Vista corridor" },
  { stat: "12–18%", label: "Average annualized return on well-executed BRRRR in LA" },
  { stat: "$0",     label: "Buyer-side commission — my fee is paid by the seller" },
];

const faqs = [
  { q: "What's the minimum investment to get into LA real estate?", a: "For a small multifamily (duplex/triplex), expect $200K–$300K down in West LA markets. Single-family rentals start lower. We can also explore partnerships or syndications for smaller capital positions." },
  { q: "Is LA still worth investing in right now?", a: "For long-hold strategies — yes. Rent demand is structural, inventory is constrained, and appreciation has been consistent over 20+ years. Short-term cash flow is harder, but equity growth and eventual 1031 repositioning remain compelling." },
  { q: "Do you work with out-of-state investors?", a: "Yes. I've worked with investors based in New York, Texas, and overseas who wanted SoCal exposure. I handle everything locally so you don't have to be here." },
  { q: "What's your process for finding off-market deals?", a: "Direct outreach to owners, wholesaler relationships, probate and estate sale sourcing, and referrals from my professional network. If a deal is coming, I find out about it early." },
];

const GATE_CONFIG = {
  storageKey: "lp_gate_investors",
  eyebrow: "Free Investor Guide · Los Angeles",
  headline: "Find your next LA investment property before it hits the market.",
  sub: "Enter your info to access Ryan's investor guide covering deal flow, underwriting, and the LA markets that actually pencil right now.",
  inquiryType: "investing",
  tag: "Investor",
};

export default function InvestorsLP() {
  return (
    <LandingPageGate config={GATE_CONFIG}>
      <div className="min-h-screen bg-[#111111]">

        {/* Hero */}
        <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/5">
          <div className="container">
            <Section>
              <motion.span variants={fadeUp} className="section-label block mb-4">Real Estate Investment · Los Angeles</motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
                LA investment real estate.<span className="font-light"> Done with someone who knows the numbers.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/50 max-w-xl leading-relaxed mb-10">
                Off-market access, underwriting support, and a long-term portfolio perspective — from a licensed CA agent who actually invests.
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
              {stats.map((s) => (
                <div key={s.stat} className="bg-[#111111] p-8 lg:p-10">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{s.stat}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container">
            <Section className="mb-14">
              <motion.span variants={fadeUp} className="section-label block mb-3">What I Bring</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight max-w-xl">
                Beyond finding the deal.<span className="font-light"> Building the portfolio.</span>
              </motion.h2>
            </Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
              {pillars.map((p) => (
                <Section key={p.title}>
                  <motion.div variants={fadeUp} className="bg-[#111111] p-8 lg:p-10 h-full">
                    <p.icon className="w-5 h-5 text-white/30 mb-4" />
                    <h3 className="text-sm font-semibold tracking-wide mb-3">{p.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
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
              <motion.span variants={fadeUp} className="section-label block mb-3">Investor FAQs</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight">
                What investors actually ask.
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
              <motion.span variants={fadeUp} className="section-label block mb-4">Let's Talk</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-5">
                What's your investment objective?<span className="font-light"> Let's work backward from there.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-white/50 mb-10 leading-relaxed">
                Cash flow, equity growth, 1031 deferral, or a combination — I'll help you map a realistic path in the LA market.
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
