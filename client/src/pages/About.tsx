/*
 * THE BLACK FOLIO — About Page
 * Ryan Kleczynski — bio and credentials
 */
import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Award, Building2, TrendingUp, ArrowRight, Target, BarChart3, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getBreadcrumbSchema, getWebPageSchema } from "@/components/SEO";

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

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/hero-westla-skyline-VBWfTyAEiaSCRKVWtRKwdj.webp";

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="About Ryan Kleczynski | West LA Real Estate"
        description="Meet Ryan Kleczynski: West Los Angeles real estate with strategic insight, sharp negotiation, and investor-minded expertise for buyers, sellers, and investors."
        canonical="https://ryanklosangeles.com/about"
        schema={[
          getWebPageSchema(
            "About Ryan Kleczynski",
            "West Los Angeles real estate professional serving buyers, sellers, and investors.",
            "https://ryanklosangeles.com/about",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "About", url: "https://ryanklosangeles.com/about" },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="West LA skyline" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 to-[#111111]" />
        <div className="relative z-10 container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              About
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              Ryan Kleczynski
              <span className="font-light"> -         
                Los Angeles Real Estate</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl leading-relaxed">
              Results-driven real estate professional delivering strategic insight, sharp negotiation,
              and exceptional outcomes. Investor-minded expertise for buyers, sellers, and investors
              across Southern California.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#0e0e0e]">
        <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "SoCal", label: "Market Focus", icon: Building2 },
            { value: "Data-Driven", label: "Approach", icon: TrendingUp },
            { value: "Investor", label: "Mindset", icon: Target },
            { value: "Full-Service", label: "Buy, Sell & Invest", icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 text-silver mx-auto mb-3" />
              <p className="text-2xl lg:text-3xl font-extralight tracking-tight">{stat.value}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/40 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bio + Photo */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <motion.div variants={fadeUp} className="space-y-6">
                <div className="aspect-[4/5] max-w-md overflow-hidden folio-frame">
                  <img
                    src="/ryan-headshot.png"
                    alt="Ryan Kleczynski"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <span className="section-label block mb-4">About Ryan</span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                  Strategic Insight.
                  <span className="font-light"> Exceptional Outcomes.</span>
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed">
                  <p>
                    Ryan Kleczynski is a results-driven real estate professional known for delivering strategic insight, sharp negotiation, and exceptional outcomes for his clients. With extensive experience as a real estate investor, Ryan approaches every transaction with a deep understanding of market dynamics, asset valuation, and wealth-building through property ownership. His investor mindset allows him to identify opportunities others miss and guide clients toward decisions that maximize both short-term value and long-term returns.
                  </p>
                  <p>
                    Specializing in competitive markets across Southern California, Ryan is recognized for his ability to navigate complex transactions with precision and confidence. Whether representing buyers, sellers, or investors, he combines data-driven analysis with an aggressive negotiation strategy to secure the strongest possible terms. His clients benefit from a disciplined approach to pricing, marketing, and deal structuring that consistently positions them ahead of the market.
                  </p>
                  <p>
                    Ryan&apos;s philosophy is simple: real estate is not just about buying or selling property—it&apos;s about building wealth, creating leverage, and executing smart investments. He is committed to providing a highly professional, transparent, and strategic experience that empowers clients to move forward with confidence.
                  </p>
                  <p>
                    Known for his relentless work ethic, market expertise, and commitment to excellence, Ryan has built a reputation as a trusted advisor for those looking to acquire, sell, or invest in real estate at the highest level.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              How I Work
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              What You Can
              <span className="font-light"> Expect</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Data-Driven Analysis", desc: "Every recommendation is backed by comprehensive market data, comparables, and trend analysis. No guesswork—strategic decisions built on numbers.", icon: BarChart3 },
              { title: "Aggressive Negotiation", desc: "Sharp negotiation and deal structuring to secure the strongest possible terms for buyers, sellers, and investors.", icon: Target },
              { title: "Transparent & Professional", desc: "A disciplined, transparent process from pricing and marketing to closing. You stay informed and in control.", icon: Shield },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div variants={fadeUp} className="folio-frame p-6 bg-[#161616]">
                  <item.icon className="w-5 h-5 text-silver mb-4" />
                  <h3 className="text-base font-semibold tracking-wide mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Credentials
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Expertise &amp;
              <span className="font-light"> Focus</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Southern California Markets",
              "Buyer & Seller Representation",
              "Investment & Wealth-Building",
              "Complex Transaction Navigation",
            ].map((award) => (
              <AnimatedSection key={award}>
                <motion.div variants={fadeUp} className="folio-frame p-6 bg-[#161616] text-center">
                  <Award className="w-6 h-6 text-silver mx-auto mb-4" />
                  <p className="text-sm font-medium tracking-wide">{award}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container text-center">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-white/50 max-w-lg mx-auto mb-8">
                Whether you&apos;re buying, selling, or investing in West LA or greater Southern California,
                I&apos;d love to hear about your goals.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Get in Touch <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
