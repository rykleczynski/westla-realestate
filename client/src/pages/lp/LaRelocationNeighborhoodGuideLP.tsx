/*
 * THE BLACK FOLIO / LA Relocation Neighborhood Guide Landing Page
 * Meta ad destination: /lp/la-relocation-neighborhood-guide
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import LandingPageGate from "@/components/LandingPageGate";
import type { GateConfig } from "@/components/LandingPageGate";

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
  {
    day: "Step 1",
    title: "Anchor work, school, and life",
    body: "LA traffic is not a cliché: it is a budget item. Before you fall in love with a house, map realistic commute times at rush hour, school boundaries if they matter, and how often you need to be at LAX or downtown. Those anchors narrow the map faster than any listing alert.",
  },
  {
    day: "Step 2",
    title: "Shortlist three macro areas",
    body: "Westside, South Bay, Valley, and East Side each feel like different cities with different price curves and inventory. Most successful relocations pick three compatible zones, not fifteen scattered pins, then go deep on comps and block-by-block nuance inside those zones.",
  },
  {
    day: "Step 3",
    title: "Tour like you mean it",
    body: "Remote buyers who try to 'figure it out later' lose deals. Block concentrated visit days, preview inventory with a local agent who knows off-market and coming-soon flow, and be ready to write when the right fit appears. In competitive pockets, hesitation costs the house.",
  },
  {
    day: "Step 4",
    title: "Close, then settle in",
    body: "California escrow is different from many states: timelines, disclosures, and repair negotiations have their own rhythm. Plan your move date around a realistic close, then layer in utilities, insurance, and HOA rules (if any) so week one in the new neighborhood is calm, not chaotic.",
  },
];

const stats = [
  { stat: "3", label: "Macro zones to compare first (Westside, South Bay, Valley) before drilling into blocks" },
  { stat: "2–4", label: "Months many serious buyers spend from start to accepted offer; pace matters for relocations" },
  { stat: "0", label: "Cost to you for buyer representation: seller-side compensation in a typical LA resale" },
  { stat: "1", label: "Local guide who actually previews doors for you, not just Zillow links from out of state" },
];

const failures = [
  {
    title: "Choosing a neighborhood from listing photos alone",
    body: "Two homes with the same bed count can sit in totally different micro-markets: one walkable and quiet, one pressed against a freeway or flight path. Street-level context, orientation, and what's being built next door rarely show up in photos. You need eyes on the ground.",
  },
  {
    title: "Optimizing for Sunday traffic instead of Tuesday at 8 a.m.",
    body: "Open houses are seductive because the neighborhood feels peaceful. Your real life runs on weekday commutes and school drop-offs. If you do not model those trips before you offer, you will discover the mismatch after you have wired earnest money.",
  },
  {
    title: "Assuming 'Los Angeles' has one price tag",
    body: "A budget that buys a detached home in one pocket might buy a condo in another, or nothing at all in a third. Relocators who import expectations from Dallas, Chicago, or Seattle without recalibrating to LA micro-markets either overpay for the wrong product or miss the right one entirely.",
  },
  {
    title: "Waiting until after you move to get serious about offers",
    body: "The best homes still attract multiple offers. If your financing, down payment, and offer strategy are not lined up before you arrive, you will spend your first month in a hotel watching better-prepared buyers win. Start the lender conversation and the neighborhood education early.",
  },
  {
    title: "Skipping the disclosure and natural-hazard read",
    body: "California sellers deliver dense disclosure packages: earthquakes, soils, insurance history, HOA litigation, and more. Skimming them to get to the pretty pictures is how relocators miss expensive surprises. A patient walkthrough with a local agent pays for itself.",
  },
];

const checklist = [
  "Confirm employer office location(s) and hybrid policy; they anchor your commute radius.",
  "Get fully underwritten pre-approval (not a soft pre-qual) before you tour or fly in for a buying trip.",
  "List your non-negotiables: schools, yard, parking, HOA tolerance, max commute minutes.",
  "Pick three compatible macro areas to compare; drop the fifteenth 'maybe' zip code.",
  "Schedule showings in a tight window so you can compare homes while memory is fresh.",
  "Read seller disclosures and natural-hazard reports before you waive contingencies. Never blindly.",
  "Budget for closing costs (often 1.5–3% of price) on top of down payment and move.",
  "Plan a backup if the first offer loses. In LA, that happens even to strong buyers.",
  "Verify insurance quotes early. Coastal and wildland-adjacent pockets can surprise newcomers.",
  "Book a local agent who previews inventory in person and can FaceTime you when you are remote.",
];

const faqs = [
  {
    q: "We are moving from out of state. Can we buy before we sell our current home?",
    a: "Sometimes yes, with the right financing bridge or a contingent structure, but each path has tradeoffs in a competitive market. The key is modeling both payments and risk with a lender early, then writing offers that sellers will actually accept. I help relocators map those scenarios before we tour.",
  },
  {
    q: "How do we pick between Westside, South Bay, and the Valley?",
    a: "Start with commute and school reality, not vibes from TV. The Westside skews premium and dense; the South Bay offers strong schools and a suburban feel with beach access; the Valley delivers more space per dollar with a hotter summer climate. Once two anchors align, the third usually eliminates itself quickly.",
  },
  {
    q: "Do we need to visit in person before making an offer?",
    a: "You can buy remotely with video tours, inspections, and trusted local representation (many of my clients do), but you should only waive personal inspection if you understand the risks. Most families still plan at least one focused trip to validate neighborhood feel before they commit.",
  },
  {
    q: "What is different about buying in LA versus Texas or the Midwest?",
    a: "Higher sticker prices, lower inventory per buyer, faster offer timelines in desirable pockets, and disclosure-heavy escrow. Earthquake and insurance considerations matter more here. The emotional adjustment is real, but so is the lifestyle upside once you are in the right neighborhood for your actual daily life.",
  },
  {
    q: "How quickly can we realistically be in a home?",
    a: "From accepted offer, many closings land in roughly 30–45 days depending on loan type and contingencies. Your search timeline varies more: some relocators find a fit in one trip; others need two. The constraint is rarely 'no homes exist'; it is preparation, speed, and picking the right micro-market.",
  },
];

const GATE_CONFIG: GateConfig = {
  storageKey: "lp_gate_la_relocation_neighborhood_guide",
  eyebrow: "Free LA Relocation Guide · Neighborhoods",
  headline: "Land in the right LA neighborhood, not the one Zillow liked.",
  sub: "Enter your info for Ryan's relocation neighborhood guide: how to shortlist areas, what remote buyers get wrong, a pre-offer checklist, and a direct line for strategy calls.",
  inquiryType: "buying",
  tag: "LA Relocation Neighborhood Guide",
  submitApiPath: "/api/la-relocation-guide-lead",
  gateTheme: "light",
  thankYou: {
    headline: "Your guide is on the way.",
    body: "Check the inbox for the email address you just used. The LA Relocation Neighborhood Guide will arrive there, usually within a few minutes. If you do not see it, look in Promotions or Spam, then move the message to your primary inbox so nothing else from us gets buried.",
    continueLabel: "Continue to the guide",
  },
};

const kicker = "block text-[0.625rem] font-medium uppercase tracking-[0.16em] text-stone-500";

export default function LaRelocationNeighborhoodGuideLP() {
  return (
    <LandingPageGate config={GATE_CONFIG}>
      <div className="min-h-screen bg-[#fafaf8] text-stone-800 antialiased">

        {/* Hero */}
        <section className="border-b border-stone-200 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="container">
            <Section>
              <motion.span variants={fadeUp} className={`${kicker} mb-4`}>LA Relocation · Neighborhood Guide</motion.span>
              <motion.h1 variants={fadeUp} className="mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Move to Los Angeles with a plan.<span className="font-light text-stone-700"> Pick the neighborhood that fits your real life.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-10 max-w-xl text-base leading-relaxed text-stone-600 lg:text-lg">
                LA is a city of micro-markets. The right block saves you an hour a day; the wrong one costs you sanity. This guide walks through how serious relocators shortlist areas, tour efficiently, and avoid the mistakes that burn remote buyers.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="sms:+12242491004"
                className="inline-flex items-center gap-2 bg-[#8a6a5a] px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#9d7664]"
              >
                Talk to Ryan <ArrowRight className="h-3.5 w-3.5" />
              </motion.a>
            </Section>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-stone-200 py-20 lg:py-24">
          <div className="container">
            <div className="grid grid-cols-2 gap-px bg-stone-200 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-8 lg:p-10">
                  <div className="mb-2 text-3xl font-bold text-stone-900 lg:text-4xl">{s.stat}</div>
                  <div className="text-xs leading-relaxed text-stone-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b border-stone-200 py-20 lg:py-28">
          <div className="container">
            <Section className="mb-14">
              <motion.span variants={fadeUp} className={`${kicker} mb-3`}>The Relocation Roadmap</motion.span>
              <motion.h2 variants={fadeUp} className="max-w-xl text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
                Four steps from out-of-state<span className="font-light text-stone-700"> to keys in the right neighborhood.</span>
              </motion.h2>
            </Section>
            <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-2">
              {timeline.map((t) => (
                <Section key={t.day}>
                  <motion.div variants={fadeUp} className="h-full bg-white p-8 lg:p-10">
                    <span className={`${kicker} mb-3`}>{t.day}</span>
                    <h3 className="mb-3 text-sm font-semibold tracking-wide text-stone-900">{t.title}</h3>
                    <p className="text-sm leading-relaxed text-stone-600">{t.body}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* Why relocators regret their pick */}
        <section className="border-b border-stone-200 py-20 lg:py-28">
          <div className="container max-w-3xl">
            <Section className="mb-12">
              <motion.span variants={fadeUp} className={`${kicker} mb-3`}>Expensive Mistakes</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
                Five ways relocators pick the wrong LA pocket.<span className="font-light text-stone-700"> Sidestep them early.</span>
              </motion.h2>
            </Section>
            <div className="space-y-px bg-stone-200">
              {failures.map((f) => (
                <Section key={f.title}>
                  <motion.div variants={fadeUp} className="bg-white p-7 lg:p-8">
                    <div className="mb-3 flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700/70" />
                      <p className="text-sm font-semibold text-stone-900">{f.title}</p>
                    </div>
                    <p className="pl-7 text-sm leading-relaxed text-stone-600">{f.body}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="border-b border-stone-200 py-20 lg:py-28">
          <div className="container max-w-3xl">
            <Section className="mb-12">
              <motion.span variants={fadeUp} className={`${kicker} mb-3`}>Pre-Offer Checklist</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-stone-900">
                Before you wire earnest money.<span className="font-light text-stone-700"> Check these boxes.</span>
              </motion.h2>
            </Section>
            <div className="space-y-px bg-stone-200">
              {checklist.map((item, i) => (
                <Section key={i}>
                  <motion.div variants={fadeUp} className="flex items-start gap-3 bg-white px-7 py-5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#8a6a5a]/80" />
                    <p className="text-sm leading-relaxed text-stone-700">{item}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-b border-stone-200 py-20 lg:py-28">
          <div className="container max-w-3xl">
            <Section className="mb-12">
              <motion.span variants={fadeUp} className={`${kicker} mb-3`}>Common Questions</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-stone-900">
                Relocation questions, answered plainly.
              </motion.h2>
            </Section>
            <div className="space-y-px bg-stone-200">
              {faqs.map((f) => (
                <Section key={f.q}>
                  <motion.div variants={fadeUp} className="bg-white p-7 lg:p-8">
                    <p className="mb-3 text-sm font-semibold text-stone-900">{f.q}</p>
                    <p className="text-sm leading-relaxed text-stone-600">{f.a}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-24 lg:py-32">
          <div className="container max-w-2xl text-center">
            <Section>
              <motion.span variants={fadeUp} className={`${kicker} mb-4`}>Start the Conversation</motion.span>
              <motion.h2 variants={fadeUp} className="mb-5 text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
                Relocating to LA?<span className="font-light text-stone-700"> Let's shortlist neighborhoods before you tour.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-10 text-sm leading-relaxed text-stone-600">
                The earlier we align on commute, schools, and budget, the fewer wasted flights and dead-end offers. Text or email: no pressure, no boilerplate drip campaign.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col justify-center gap-4 sm:flex-row">
                <a href="sms:+12242491004" className="bg-[#8a6a5a] px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#9d7664]">
                  Text Ryan
                </a>
                <a href="mailto:rkleczynski@kw.com" className="border border-stone-300 px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-800 transition-colors hover:bg-stone-50">
                  Send an Email
                </a>
              </motion.div>
            </Section>
          </div>
        </section>

        <div className="border-t border-stone-200 bg-[#fafaf8] py-6">
          <div className="container flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-center text-xs tracking-wide text-stone-500 sm:text-left">Ryan Kleczynski · DRE #02402858 · Keller Williams</p>
            <p className="text-center text-xs text-stone-400 sm:text-right">ryanklosangeles.com · Los Angeles, CA</p>
          </div>
        </div>
      </div>
    </LandingPageGate>
  );
}
