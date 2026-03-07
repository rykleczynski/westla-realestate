/*
 * THE BLACK FOLIO — About Page
 * Brand story, team bio, and credentials
 */
import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Award, Users, Building2, TrendingUp, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/hero-westla-skyline-VBWfTyAEiaSCRKVWtRKwdj.webp";

export default function About() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="About West LA Real Estate Team | Local Experts"
        description="Learn about our West Los Angeles real estate team, local market expertise, and investor-friendly approach."
        canonical="https://westla.realestate/about"
        schema={[
          getWebPageSchema(
            "About West LA Real Estate Team",
            "Team background and market expertise for West LA real estate.",
            "https://westla.realestate/about",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://westla.realestate/" },
            { name: "About", url: "https://westla.realestate/about" },
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
              About Us
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              West LA&apos;s Premier
              <span className="font-light"> Real Estate Team</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl leading-relaxed">
              We are a boutique real estate team specializing exclusively in West Los Angeles.
              Our deep local expertise, data-driven approach, and commitment to personalized
              service set us apart in one of the world&apos;s most competitive markets.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#0e0e0e]">
        <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Properties Sold", icon: Building2 },
            { value: "$2B+", label: "Total Sales Volume", icon: TrendingUp },
            { value: "15+", label: "Years Experience", icon: Award },
            { value: "98%", label: "Client Satisfaction", icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 text-silver mx-auto mb-3" />
              <p className="text-3xl font-extralight tracking-tight">{stat.value}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/40 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <span className="section-label block mb-4">Our Story</span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                  Born &amp; Raised in
                  <span className="font-light"> West LA</span>
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed">
                  <p>
                    Founded with a singular focus on West Los Angeles, our team brings
                    an unmatched depth of local knowledge to every transaction. We don&apos;t
                    just work in West LA — we live here, raise our families here, and
                    are deeply invested in the communities we serve.
                  </p>
                  <p>
                    Our approach combines cutting-edge market analytics with old-fashioned
                    relationship building. We believe that the best real estate outcomes
                    come from truly understanding our clients&apos; goals and matching them
                    with the right opportunities at the right time.
                  </p>
                  <p>
                    Whether you&apos;re a seasoned investor seeking off-market deals, a
                    first-time buyer navigating the LA market, or a homeowner looking to
                    maximize your sale price, we bring the same level of dedication,
                    expertise, and personalized attention to every engagement.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={fadeUp} className="space-y-6">
                {[
                  { title: "Hyper-Local Expertise", desc: "We specialize exclusively in West LA — from Brentwood to Venice, Santa Monica to Century City. This focus gives us unparalleled market knowledge and relationships." },
                  { title: "Data-Driven Decisions", desc: "Every recommendation is backed by comprehensive market data, comparable analysis, and trend forecasting. We don't guess — we analyze." },
                  { title: "Concierge Service", desc: "From staging and photography to legal and financial referrals, we provide a full-service experience that simplifies every aspect of your real estate journey." },
                ].map((item) => (
                  <div key={item.title} className="folio-frame p-6 bg-[#161616]">
                    <h3 className="text-base font-semibold tracking-wide mb-2">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              The Team
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Meet Your
              <span className="font-light"> Advisors</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Lead Agent",
                role: "Principal Broker",
                bio: "With over 15 years of experience in West LA luxury real estate, our lead agent has closed over $2 billion in transactions and is consistently ranked among the top agents in Los Angeles.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
              },
              {
                name: "Buyer Specialist",
                role: "Buyer's Agent",
                bio: "Specializing in helping first-time buyers and relocating professionals find their perfect home in West LA. Known for patience, market knowledge, and skilled negotiation.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
              },
              {
                name: "Investment Advisor",
                role: "Investment Specialist",
                bio: "A former financial analyst turned real estate investor, our investment specialist brings a data-driven approach to identifying high-yield opportunities across West LA.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
              },
            ].map((member) => (
              <AnimatedSection key={member.name}>
                <motion.div variants={fadeUp} className="folio-frame overflow-hidden bg-[#161616]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-wide">{member.name}</h3>
                    <p className="text-xs tracking-[0.15em] uppercase text-silver mt-1 mb-3">{member.role}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-8 text-center">
            <motion.p variants={fadeUp} className="text-sm text-white/30 italic">
              Team member names and photos are placeholders — update with your actual team information.
            </motion.p>
          </AnimatedSection>
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
              Awards &amp;
              <span className="font-light"> Recognition</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Top 1% of Agents Nationwide",
              "LA Business Journal Top Real Estate Team",
              "Zillow Premier Agent",
              "Certified Luxury Home Marketing Specialist",
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
                Whether you&apos;re buying, selling, or investing in West LA,
                we&apos;d love to hear about your goals.
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
