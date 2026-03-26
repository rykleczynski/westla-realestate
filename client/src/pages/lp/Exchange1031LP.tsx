/*
 * THE BLACK FOLIO — 1031 Exchange Landing Page
 * Meta ad destination: /lp/1031
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, FileText, TrendingUp, Shield, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
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

const timeline = [
  { day: "Day 0",   title: "Close Your Relinquished Property", body: "Your 1031 clock starts the moment you close. From this point, every deadline is fixed — there's no extension." },
  { day: "Day 45",  title: "Identify Replacement Property",     body: "You have 45 calendar days to identify up to 3 potential replacement properties in writing. Miss this window and the exchange fails." },
  { day: "Day 180", title: "Close on Replacement Property",     body: "You must close on one of your identified properties within 180 days of your original sale. No exceptions." },
  { day: "After",   title: "Defer the Tax — Repeat",           body: "Capital gains taxes are deferred, not eliminated. You can chain multiple 1031s over time, compounding wealth through repeated repositioning." },
];

const stats = [
  { stat: "45",  label: "Days to identify your replacement property — a hard IRS deadline" },
  { stat: "180", label: "Days to close on the replacement — equally non-negotiable" },
  { stat: "0%",  label: "Capital gains tax owed during the exchange (deferred, not forgiven)" },
  { stat: "3×",  label: "Rule: identify up to 3 replacement properties to give yourself options" },
];

const failures = [
  {
    title: "Missing the 45-day identification window",
    body: "This is the most common way exchanges fail. Sellers close their relinquished property without having identified any replacement, then scramble. In LA's market, 45 days to find, evaluate, and formally identify replacement property is genuinely tight. Start searching before you close your sale.",
  },
  {
    title: "Touching the sale proceeds",
    body: "IRS rules are clear: you cannot take constructive receipt of the funds. The money must go directly to a Qualified Intermediary (QI) at close. If it hits your bank account for even a day, the exchange fails — and you owe tax on the full gain.",
  },
  {
    title: "Buying down in value",
    body: "To fully defer capital gains, the replacement property must be equal to or greater in value than the relinquished property. If you buy down — say, sell a $1.5M property and buy a $1M replacement — you'll owe tax on the 'boot' (the leftover $500K). Partial exchanges are possible, but partial tax bills come with them.",
  },
  {
    title: "Using a Qualified Intermediary that holds uninsured funds",
    body: "There's no federal licensing requirement for QIs — which means some are better than others. You want a QI with fidelity bonding and errors & omissions insurance, held in a separate trust account. I refer clients to vetted California QIs with established track records.",
  },
  {
    title: "Forgetting California's clawback rule",
    body: "If you sell a CA property and exchange into a property in another state, California still tracks the deferred gain. If you eventually sell the out-of-state property without doing another 1031, CA FTB will expect their portion. This doesn't prevent the exchange — but it needs to be in your long-term plan.",
  },
];

const checklist = [
  "Identify a Qualified Intermediary (QI) before closing your relinquished property.",
  "Ensure your QI is properly bonded and insured — ask specifically.",
  "Do NOT take possession of sale proceeds at any point during the exchange.",
  "Start identifying potential replacement properties before you close — not after.",
  "Submit your formal identification list to the QI in writing by Day 45.",
  "Have a backup property identified in case your first choice falls through.",
  "Confirm the replacement property qualifies (held for investment/business use — not primary residence).",
  "Confirm the replacement value meets or exceeds the relinquished property value.",
  "Work with a California tax advisor alongside your QI — especially if crossing state lines.",
  "Keep all exchange documentation for your tax return filing.",
];

const faqs = [
  { q: "What qualifies as a 1031 exchange property?", a: "Both the property you're selling (relinquished) and the property you're buying (replacement) must be held for investment or business use. Primary residences don't qualify. Like-kind is broadly defined — you can exchange a single-family rental for a multifamily building, or a duplex for raw land." },
  { q: "Can I use a 1031 to move out of California?", a: "Yes. You can sell a CA investment property and acquire a replacement property in another state. However, California has specific rules about tracking deferred gains — work with both a 1031 intermediary and a CA tax advisor before you do this." },
  { q: "What is a Qualified Intermediary and do I need one?", a: "Yes, a QI is required by IRS rules — you cannot touch the sale proceeds yourself. The QI holds the funds between sale and purchase. I can connect you with trusted QIs who specialize in California exchanges." },
  { q: "What happens if I can't find a replacement in 45 days?", a: "The exchange fails and you owe capital gains tax on the full gain from the sale. This is exactly why starting the replacement property search before you close your sale is critical — not after. I work with investors to identify replacement candidates before we even list the relinquished property." },
  { q: "Can I do a 1031 into a new construction property?", a: "Yes, but it requires a Reverse or Improvement Exchange structure, which is more complex and more expensive than a standard delayed exchange. The 180-day deadline applies to the build completion, which can be challenging on new construction timelines. Not impossible — but needs to be planned well in advance." },
];

const GATE_CONFIG = {
  storageKey: "lp_gate_1031",
  eyebrow: "Free 1031 Exchange Guide · California",
  headline: "Defer your capital gains. Keep more of what you built.",
  sub: "Enter your info to access Ryan's 1031 Exchange guide — timeline, common failure points, a pre-exchange checklist, and a free strategy call for CA property owners.",
  inquiryType: "investing",
  tag: "1031 Exchange",
};

export default function Exchange1031LP() {
  return (
    <LandingPageGate config={GATE_CONFIG}>
      <div className="min-h-screen bg-[#111111]">

        {/* Hero */}
        <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-white/5">
          <div className="container">
            <Section>
              <motion.span variants={fadeUp} className="section-label block mb-4">1031 Exchange · California</motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
                Sell your investment property.<span className="font-light"> Keep the capital gains tax deferred.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base lg:text-lg text-white/50 max-w-xl leading-relaxed mb-10">
                A 1031 exchange lets California property owners defer capital gains taxes indefinitely by reinvesting into a like-kind property. The rules are strict. The upside is significant.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="sms:+12242491004"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Talk to Ryan <ArrowRight className="w-3.5 h-3.5" />
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

        {/* Timeline */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container">
            <Section className="mb-14">
              <motion.span variants={fadeUp} className="section-label block mb-3">The Timeline</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight max-w-xl">
                180 days. Zero room for error.<span className="font-light"> Here's exactly how it works.</span>
              </motion.h2>
            </Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
              {timeline.map((t) => (
                <Section key={t.day}>
                  <motion.div variants={fadeUp} className="bg-[#111111] p-8 lg:p-10 h-full">
                    <span className="section-label block mb-3">{t.day}</span>
                    <h3 className="text-sm font-semibold tracking-wide mb-3">{t.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{t.body}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* Why Exchanges Fail */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container max-w-3xl">
            <Section className="mb-12">
              <motion.span variants={fadeUp} className="section-label block mb-3">Why Exchanges Fail</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight">
                Five ways investors lose their exchange.<span className="font-light"> Don't be one of them.</span>
              </motion.h2>
            </Section>
            <div className="space-y-px bg-white/5">
              {failures.map((f) => (
                <Section key={f.title}>
                  <motion.div variants={fadeUp} className="bg-[#111111] p-7 lg:p-8">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                      <p className="text-sm font-semibold">{f.title}</p>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed pl-7">{f.body}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-20 lg:py-28 border-b border-white/5">
          <div className="container max-w-3xl">
            <Section className="mb-12">
              <motion.span variants={fadeUp} className="section-label block mb-3">Pre-Exchange Checklist</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight">
                Before you close your sale.<span className="font-light"> Get these done first.</span>
              </motion.h2>
            </Section>
            <div className="space-y-px bg-white/5">
              {checklist.map((item, i) => (
                <Section key={i}>
                  <motion.div variants={fadeUp} className="bg-[#111111] px-7 py-5 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-white/25 mt-0.5 shrink-0" />
                    <p className="text-sm text-white/60 leading-relaxed">{item}</p>
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
                1031 questions, answered plainly.
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
              <motion.span variants={fadeUp} className="section-label block mb-4">Start the Conversation</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-5">
                Thinking about selling an investment property?<span className="font-light"> Let's map the 1031 strategy first.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-white/50 mb-10 leading-relaxed">
                The earlier you plan the exchange, the more options you have. Don't wait until after you accept an offer.
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
