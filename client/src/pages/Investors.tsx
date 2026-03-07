/*
 * THE BLACK FOLIO — Investor Portal
 * Data-driven content for LA real estate investors
 */
import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { TrendingUp, BarChart3, Shield, ArrowRight, Building2, Calculator, FileText, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import SEO, { getWebPageSchema, getBreadcrumbSchema } from "@/components/SEO";

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

const INVESTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/investor-dashboard-6A7AA9zNUpCJZtV46oacDT.webp";

const investmentAreas = [
  { name: "Palms", type: "Multi-Family", capRate: "4.5%", appreciation: "+7.2%", entry: "$950K" },
  { name: "Sawtelle", type: "Value-Add SFR", capRate: "3.8%", appreciation: "+6.8%", entry: "$1.1M" },
  { name: "Venice", type: "Short-Term Rental", capRate: "5.2%", appreciation: "+5.5%", entry: "$2.1M" },
  { name: "Westwood", type: "Student Housing", capRate: "4.1%", appreciation: "+5.8%", entry: "$1.8M" },
  { name: "Century City", type: "Luxury Condo", capRate: "3.2%", appreciation: "+4.5%", entry: "$1.5M" },
];

export default function Investors() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Real Estate Investing in Los Angeles | Investor Portal"
        description="Data-driven Los Angeles real estate investing resources, off-market opportunities, and neighborhood-specific investor strategy pages."
        canonical="https://westla.realestate/investors"
        schema={[
          getWebPageSchema(
            "Los Angeles Real Estate Investor Portal",
            "Investor-focused market data, strategy, and off-market deal access.",
            "https://westla.realestate/investors",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://westla.realestate/" },
            { name: "Investors", url: "https://westla.realestate/investors" },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={INVESTOR_IMG} alt="Investment analytics" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 to-[#111111]" />
        <div className="relative z-10 container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Investor Portal
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              Data-Driven
              <span className="font-light"> Real Estate Investment</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10">
              Access exclusive market intelligence, off-market opportunities, and
              sophisticated analytics to maximize your returns in West LA&apos;s most
              promising markets.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                <Lock className="w-4 h-4" />
                Access Off-Market Deals
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                Browse Investment Properties
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why West LA */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Market Opportunity
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Why Invest in
              <span className="font-light"> West LA?</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Strong Appreciation", desc: "West LA properties have averaged 6-8% annual appreciation over the past decade, outperforming national averages." },
              { icon: Building2, title: "Silicon Beach Effect", desc: "The tech industry's expansion into West LA drives demand for housing, pushing rents and property values upward." },
              { icon: Shield, title: "Recession Resilient", desc: "West LA's diverse economy and limited housing supply create a resilient market that recovers quickly from downturns." },
              { icon: BarChart3, title: "Rental Demand", desc: "High barriers to homeownership ensure strong rental demand, with occupancy rates consistently above 95% across West LA." },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div variants={fadeUp} className="folio-frame p-6 bg-[#161616] h-full">
                  <item.icon className="w-5 h-5 text-silver mb-4" />
                  <h3 className="text-base font-semibold tracking-wide mb-3">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Areas Table */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Market Data
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Investment
              <span className="font-light"> Opportunities by Area</span>
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div variants={fadeUp} className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-xs tracking-[0.15em] uppercase text-white/40 font-medium">Neighborhood</th>
                    <th className="text-left py-4 px-4 text-xs tracking-[0.15em] uppercase text-white/40 font-medium">Investment Type</th>
                    <th className="text-left py-4 px-4 text-xs tracking-[0.15em] uppercase text-white/40 font-medium">Cap Rate</th>
                    <th className="text-left py-4 px-4 text-xs tracking-[0.15em] uppercase text-white/40 font-medium">YoY Growth</th>
                    <th className="text-left py-4 px-4 text-xs tracking-[0.15em] uppercase text-white/40 font-medium">Entry Point</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentAreas.map((area) => (
                    <tr key={area.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-sm font-medium">{area.name}</td>
                      <td className="py-4 px-4 text-sm text-white/60">{area.type}</td>
                      <td className="py-4 px-4 text-sm text-white/60">{area.capRate}</td>
                      <td className="py-4 px-4 text-sm text-green-400">{area.appreciation}</td>
                      <td className="py-4 px-4 text-sm text-white/60">{area.entry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Investor Resources */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Resources
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Investor
              <span className="font-light"> Toolkit</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Calculator, title: "Cap Rate Calculator", desc: "Calculate potential returns on any West LA investment property with our interactive tool.", cta: "Calculate Now" },
              { icon: FileText, title: "1031 Exchange Guide", desc: "Comprehensive guide to tax-deferred exchanges for Los Angeles real estate investors.", cta: "Download Guide" },
              { icon: BarChart3, title: "Market Reports", desc: "Monthly market analysis with neighborhood-level data, trends, and forecasts.", cta: "View Reports" },
            ].map((resource) => (
              <AnimatedSection key={resource.title}>
                <motion.div variants={fadeUp} className="folio-frame p-8 bg-[#161616] group hover:border-white/20 transition-colors">
                  <resource.icon className="w-6 h-6 text-silver mb-5" />
                  <h3 className="text-lg font-semibold tracking-wide mb-3">{resource.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">{resource.desc}</p>
                  <button
                    onClick={() => {
                      toast("Coming soon — this feature is under development.");
                    }}
                    className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-silver group-hover:text-white group-hover:gap-3 transition-all"
                  >
                    {resource.cta} <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Investor SEO Hubs */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Investor Hubs
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Explore Investor
              <span className="font-light"> Strategy Pages</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Los Angeles Investor Guide", href: "/investors/los-angeles" },
              { label: "Off-Market Deals in LA", href: "/investors/off-market-deals-los-angeles" },
              { label: "1031 Exchange in LA", href: "/investors/1031-exchange-los-angeles" },
              { label: "Multifamily Investing in LA", href: "/investors/multifamily-investment-los-angeles" },
              { label: "Santa Monica Investors", href: "/investors/santa-monica" },
              { label: "Venice Investors", href: "/investors/venice" },
              { label: "Culver City Investors", href: "/investors/culver-city" },
              { label: "Beverly Hills Investors", href: "/investors/beverly-hills" },
              { label: "DTLA Investors", href: "/investors/dtla" },
              { label: "USC Area Investors", href: "/investors/usc-area" },
              { label: "South Bay Investors", href: "/investors/south-bay" },
              { label: "Long Beach Investors", href: "/investors/long-beach" },
              { label: "Westwood Investors", href: "/investors/westwood" },
              { label: "Gardena Investors", href: "/investors/gardena" },
            ].map((item) => (
              <AnimatedSection key={item.href}>
                <motion.div variants={fadeUp}>
                  <Link
                    href={item.href}
                    className="group folio-frame p-6 bg-[#161616] flex items-center justify-between hover:border-white/20 transition-colors"
                  >
                    <span className="text-sm tracking-wide text-white/80 group-hover:text-white">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-silver group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Off-Market CTA */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="folio-frame p-12 lg:p-16 bg-[#161616] text-center">
              <Lock className="w-8 h-8 text-silver mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                The Whisper Network
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                Join our exclusive network of investors to access pre-market properties,
                off-market deals, and pocket listings before they hit the MLS.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Request Access
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
