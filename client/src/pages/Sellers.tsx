/*
 * THE BLACK FOLIO — Seller's Resource Center
 * Home valuation, market insights, and selling guidance
 */
import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { DollarSign, TrendingUp, Camera, Megaphone, ArrowRight, CheckCircle, BarChart3, Clock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
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

const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/luxury-interior-XkMNb7ufufLac9VK4t4iEv.webp";

export default function Sellers() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Sell Your Home in Los Angeles | Seller Strategy + Valuation"
        description="Seller-focused Los Angeles real estate page with valuation tools, prep checklists, and market-informed selling strategy."
        canonical="https://ryanklosangeles.com/sellers"
        schema={[
          getWebPageSchema(
            "Sell Your Home in Los Angeles",
            "Practical resources and strategy for home sellers in West LA.",
            "https://ryanklosangeles.com/sellers",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "Sellers", url: "https://ryanklosangeles.com/sellers" },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero with Valuation Tool */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={INTERIOR_IMG} alt="Luxury interior" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 to-[#111111]" />
        <div className="relative z-10 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <motion.span variants={fadeUp} className="section-label block mb-4">
                For Sellers
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Sell Your Home for
                <span className="font-light"> Top Dollar</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-white/50 leading-relaxed">
                Our proven marketing strategy, professional staging, and deep market
                expertise consistently deliver above-asking results for West LA sellers.
              </motion.p>
            </AnimatedSection>

            {/* Valuation Form */}
            <AnimatedSection>
              <motion.div variants={fadeUp} className="folio-frame p-8 bg-[#161616]">
                <DollarSign className="w-6 h-6 text-silver mb-4" />
                <h2 className="text-xl font-semibold tracking-tight mb-2">
                  What&apos;s Your Home Worth?
                </h2>
                <p className="text-sm text-white/40 mb-6">
                  Get a free, personalized home valuation based on current West LA market data.
                </p>
                <GetInTouchForm />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Our Approach
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-16">
              The Seller
              <span className="font-light"> Concierge Experience</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: "Strategic Pricing", desc: "We analyze comparable sales, market trends, and neighborhood dynamics to price your home for maximum return." },
              { icon: Camera, title: "Premium Marketing", desc: "Professional photography, drone videography, 3D virtual tours, and targeted digital campaigns to showcase your property." },
              { icon: Megaphone, title: "Maximum Exposure", desc: "Your listing reaches qualified buyers through MLS, social media, email campaigns, and our exclusive buyer network." },
              { icon: CheckCircle, title: "Expert Negotiation", desc: "We leverage multiple offers and market data to negotiate the best possible terms and price for your sale." },
            ].map((step) => (
              <AnimatedSection key={step.title}>
                <motion.div variants={fadeUp} className="folio-frame p-6 bg-[#161616] h-full">
                  <step.icon className="w-5 h-5 text-silver mb-4" />
                  <h3 className="text-base font-semibold tracking-wide mb-3">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Results
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12">
              Our Track
              <span className="font-light"> Record</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "98%", label: "List-to-Sale Price Ratio" },
              { value: "21", label: "Average Days on Market" },
              { value: "85%", label: "Sold Above Asking" },
              { value: "$2B+", label: "Total Sales Volume" },
            ].map((stat) => (
              <AnimatedSection key={stat.label}>
                <motion.div variants={fadeUp} className="text-center py-8 folio-frame bg-[#161616]">
                  <p className="text-3xl lg:text-4xl font-extralight tracking-tight mb-2">{stat.value}</p>
                  <p className="text-xs tracking-[0.12em] uppercase text-white/40">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Staging & Prep */}
      <section className="py-20 lg:py-28 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Preparation
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Preparing Your Home
              <span className="font-light"> for Sale</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 max-w-2xl mb-12">
              Our Seller Concierge program covers the cost of home improvements upfront,
              so you can maximize your sale price without out-of-pocket expenses.
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Professional staging consultation and execution",
              "Interior and exterior painting",
              "Landscaping and curb appeal improvements",
              "Deep cleaning and decluttering services",
              "Minor repairs and cosmetic updates",
              "Professional photography and videography",
              "3D virtual tour creation",
              "Custom property website and marketing materials",
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <motion.div variants={fadeUp} className="flex items-start gap-4 py-3 border-b border-white/5">
                  <CheckCircle className="w-4 h-4 text-silver mt-0.5 shrink-0" />
                  <span className="text-sm text-white/60">{item}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-3xl mx-auto">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4 text-center">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold tracking-tight mb-12 text-center">
              Seller
              <span className="font-light"> FAQs</span>
            </motion.h2>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              { q: "When is the best time to sell a home in West LA?", a: "Spring (March-May) typically sees the highest buyer activity and sale prices in West LA. However, the market remains active year-round due to LA's favorable climate and consistent demand. We can analyze current market conditions to determine the optimal timing for your specific property." },
              { q: "How long does it take to sell a home in West LA?", a: "Well-priced homes in desirable West LA neighborhoods typically sell within 21-42 days. Luxury properties ($5M+) may take longer due to a smaller buyer pool. Our marketing strategy and pricing expertise consistently achieve faster-than-average sale times." },
              { q: "What are the costs of selling a home in Los Angeles?", a: "Typical seller costs include agent commission (5-6%), escrow and title fees (1-2%), transfer taxes (0.45%), and any agreed-upon buyer credits. Our team provides a detailed net sheet so you know exactly what to expect." },
              { q: "Should I make repairs before selling?", a: "Strategic improvements can significantly increase your sale price. Our Seller Concierge program covers the cost of recommended improvements upfront — you pay nothing until closing. We focus on high-ROI updates like fresh paint, staging, and curb appeal." },
            ].map((faq, i) => (
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

      <Footer />
    </div>
  );
}
