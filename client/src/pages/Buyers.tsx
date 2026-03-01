/*
 * THE BLACK FOLIO — First-Time Buyers Hub
 * Educational content for first-time home buyers in West LA
 */
import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Home, CheckCircle, ArrowRight, BookOpen, Calculator, FileText, MapPin, DollarSign, Shield, Clock } from "lucide-react";
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

const steps = [
  { num: "01", title: "Get Pre-Approved", desc: "Understand your budget by getting pre-approved for a mortgage. We connect you with trusted LA lenders who specialize in first-time buyer programs.", icon: DollarSign },
  { num: "02", title: "Define Your Priorities", desc: "Neighborhood, commute, schools, lifestyle — we help you identify what matters most and match you with the right West LA communities.", icon: MapPin },
  { num: "03", title: "Search & Tour", desc: "Browse curated listings tailored to your criteria. We schedule private tours and provide detailed market comparisons for every property.", icon: Home },
  { num: "04", title: "Make Your Offer", desc: "We craft competitive offers backed by market data and negotiation expertise. In LA's competitive market, strategy matters.", icon: Shield },
  { num: "05", title: "Close with Confidence", desc: "From inspection to escrow, we guide you through every step of the closing process, ensuring a smooth transition to homeownership.", icon: CheckCircle },
];

const faqs = [
  { q: "How much do I need for a down payment in Los Angeles?", a: "While 20% is traditional, many first-time buyer programs in LA allow as little as 3-3.5% down. FHA loans, CalHFA programs, and various down payment assistance programs can significantly reduce your upfront costs. For a $950K home in Palms, that could mean as little as $28,500 down with an FHA loan." },
  { q: "What first-time buyer programs are available in Los Angeles?", a: "Several programs exist for LA first-time buyers: CalHFA MyHome Assistance Program (up to 3.5% of purchase price), LA County Mortgage Credit Certificate (MCC) for tax credits, FHA loans with 3.5% down, and VA loans for eligible veterans with 0% down. We help you identify which programs you qualify for." },
  { q: "What are the most affordable neighborhoods in West LA?", a: "Palms (median $950K), Sawtelle ($1.1M), and parts of Westwood ($1.2M for condos) offer the most accessible entry points in West LA. These neighborhoods also have strong appreciation potential and excellent transit access." },
  { q: "How long does it take to buy a home in LA?", a: "The typical timeline from pre-approval to closing is 45-60 days in Los Angeles. However, finding the right property can take 2-6 months depending on your criteria and market conditions. Starting the pre-approval process early gives you a competitive advantage." },
  { q: "What are closing costs in Los Angeles?", a: "Closing costs in LA typically range from 2-5% of the purchase price. For a $1M home, expect $20,000-$50,000 in closing costs including escrow fees, title insurance, appraisal, and lender fees. Some costs are negotiable, and seller credits can offset a portion." },
];

export default function Buyers() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              First-Time Buyers
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              Your First Home
              <span className="font-light"> in West LA</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10">
              Buying your first home in Los Angeles doesn&apos;t have to be overwhelming.
              We provide the expertise, resources, and personalized guidance to help you
              navigate the market with confidence.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Start Your Journey
              </Link>
              <a
                href="#guide"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Read the Guide
              </a>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <div className="hairline" />

      {/* Step-by-Step Process */}
      <section id="guide" className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              The Process
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-16">
              Five Steps to
              <span className="font-light"> Homeownership</span>
            </motion.h2>
          </AnimatedSection>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num}>
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 border-b border-white/5"
                >
                  <div className="lg:col-span-1">
                    <span className="text-3xl font-extralight text-white/20">{step.num}</span>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3">
                      <step.icon className="w-5 h-5 text-silver" />
                      <h3 className="text-lg font-semibold tracking-wide">{step.title}</h3>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Affordable Neighborhoods */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Where to Start
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Best Neighborhoods for
              <span className="font-light"> First-Time Buyers</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Palms", median: "$950K", why: "Most affordable entry point in West LA with strong appreciation and Metro access.", slug: "palms" },
              { name: "Sawtelle", median: "$1.1M", why: "Walkable, culturally rich, and growing rapidly. Great for young professionals.", slug: "sawtelle" },
              { name: "Westwood", median: "$1.2M", why: "Condos near UCLA offer accessible pricing with strong rental fallback potential.", slug: "westwood" },
            ].map((hood) => (
              <AnimatedSection key={hood.name}>
                <motion.div variants={fadeUp}>
                  <Link href={`/neighborhoods/${hood.slug}`} className="group block folio-frame p-6 bg-[#161616] hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold tracking-wide group-hover:text-silver transition-colors">{hood.name}</h3>
                      <ArrowRight className="w-4 h-4 text-silver opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-2xl font-extralight tracking-tight mb-3">{hood.median}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{hood.why}</p>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Resources
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Buyer
              <span className="font-light"> Resources</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Calculator, title: "Mortgage Calculator", desc: "Estimate your monthly payments based on price, down payment, and interest rate." },
              { icon: FileText, title: "First-Time Buyer Checklist", desc: "A comprehensive checklist of everything you need to prepare before buying." },
              { icon: BookOpen, title: "LA Homebuyer's Guide", desc: "Our complete guide to buying a home in Los Angeles, from pre-approval to closing." },
            ].map((resource) => (
              <AnimatedSection key={resource.title}>
                <motion.div variants={fadeUp} className="folio-frame p-8 bg-[#161616] group hover:border-white/20 transition-colors">
                  <resource.icon className="w-6 h-6 text-silver mb-5" />
                  <h3 className="text-lg font-semibold tracking-wide mb-3">{resource.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">{resource.desc}</p>
                  <button
                    onClick={() => {
                      toast("Coming soon — this resource is being prepared.");
                    }}
                    className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-silver group-hover:text-white group-hover:gap-3 transition-all"
                  >
                    Access Resource <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - AEO Optimized */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container max-w-3xl mx-auto">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4 text-center">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12 text-center">
              Common Questions from
              <span className="font-light"> First-Time Buyers</span>
            </motion.h2>
          </AnimatedSection>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i}>
                <motion.div variants={fadeUp} className="folio-frame p-6 bg-[#161616]">
                  <h3 className="text-base font-semibold mb-3">{faq.q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container text-center">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Ready to Start?
              </h2>
              <p className="text-white/50 max-w-lg mx-auto mb-8">
                Schedule a free consultation to discuss your goals, budget, and
                timeline. We&apos;ll create a personalized plan to get you into your first home.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Book a Free Consultation
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
