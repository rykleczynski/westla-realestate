/*
 * THE BLACK FOLIO — Neighborhoods Page
 * Hyper-local SEO silo for West LA neighborhoods
 */
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getWebPageSchema, getBreadcrumbSchema } from "@/components/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
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

const SANTA_MONICA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-santa-monica-DrPbXuiz8e6QYKHUR9nkro.webp";
const BRENTWOOD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-brentwood-dgfST7WRrkvkmMgP7r887h.webp";

const neighborhoods = [
  {
    name: "Brentwood",
    slug: "brentwood",
    median: "$3.2M",
    description: "Tree-lined streets, luxury estates, and a village-like atmosphere make Brentwood one of LA's most desirable neighborhoods for families and executives.",
    highlights: ["Top-Rated Schools", "Getty Center", "San Vicente Blvd"],
    image: BRENTWOOD_IMG,
    featured: true,
  },
  {
    name: "Santa Monica",
    slug: "santa-monica",
    median: "$2.8M",
    description: "Beachfront living meets urban sophistication. Santa Monica offers world-class dining, shopping on Montana Avenue, and iconic ocean views.",
    highlights: ["Beach Access", "Third Street Promenade", "Tech Hub"],
    image: SANTA_MONICA_IMG,
    featured: true,
  },
  {
    name: "Westwood",
    slug: "westwood",
    median: "$1.8M",
    description: "Home to UCLA, Westwood blends academic energy with upscale residential living. A prime location for professionals and families seeking culture and convenience.",
    highlights: ["UCLA Campus", "Westwood Village", "Hammer Museum"],
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
    featured: false,
  },
  {
    name: "Century City",
    slug: "century-city",
    median: "$1.5M",
    description: "A modern business and residential hub with luxury high-rise condos, world-class shopping at Westfield, and proximity to Beverly Hills.",
    highlights: ["Westfield Century City", "High-Rise Living", "Business District"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: false,
  },
  {
    name: "Palms",
    slug: "palms",
    median: "$950K",
    description: "One of West LA's most accessible neighborhoods, Palms offers excellent value for first-time buyers and investors with strong rental demand near Silicon Beach.",
    highlights: ["Affordable Entry", "Near Silicon Beach", "Metro Access"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    featured: false,
  },
  {
    name: "Sawtelle",
    slug: "sawtelle",
    median: "$1.1M",
    description: "Known as Little Osaka, Sawtelle is a vibrant, walkable neighborhood celebrated for its Japanese restaurants, boutique shops, and strong community feel.",
    highlights: ["Japantown", "Walkable", "Dining Scene"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    featured: false,
  },
  {
    name: "Venice",
    slug: "venice",
    median: "$2.1M",
    description: "Bohemian charm meets tech-industry wealth. Venice offers eclectic architecture, Abbot Kinney's boutiques, and the iconic Venice Boardwalk.",
    highlights: ["Abbot Kinney", "Venice Canals", "Silicon Beach"],
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80",
    featured: false,
  },
];

export default function Neighborhoods() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="West LA Neighborhood Guides | Santa Monica, Brentwood, Venice + More"
        description="Explore West Los Angeles neighborhood guides with market snapshots, lifestyle highlights, and local real estate insights."
        canonical="https://westla.realestate/neighborhoods"
        schema={[
          getWebPageSchema(
            "West LA Neighborhood Guides",
            "Neighborhood market and lifestyle guides across West Los Angeles.",
            "https://westla.realestate/neighborhoods",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://westla.realestate/" },
            { name: "Neighborhoods", url: "https://westla.realestate/neighborhoods" },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Explore
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              West LA
              <span className="font-light"> Neighborhoods</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl leading-relaxed">
              Discover the distinct character, market trends, and lifestyle of each
              West Los Angeles community. From beachside luxury to urban sophistication,
              find the neighborhood that fits your vision.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <div className="hairline" />

      {/* Featured Neighborhoods */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {neighborhoods.filter(n => n.featured).map((hood, i) => (
            <AnimatedSection key={hood.slug} className={i > 0 ? "mt-16" : ""}>
              <motion.div variants={fadeUp}>
                <Link
                  href={`/neighborhoods/${hood.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <div className={`relative overflow-hidden aspect-[16/10] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={hood.image}
                      alt={`${hood.name} neighborhood`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className={`${i % 2 === 1 ? "lg:order-1 lg:pr-12" : "lg:pl-12"}`}>
                    <span className="section-label">Featured Neighborhood</span>
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-2 mb-4 group-hover:text-silver transition-colors">
                      {hood.name}
                    </h2>
                    <p className="text-white/50 leading-relaxed mb-6">{hood.description}</p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {hood.highlights.map((h) => (
                        <span key={h} className="px-3 py-1.5 text-xs tracking-wider uppercase border border-white/10 text-white/60">
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-white/40 tracking-wider uppercase">Median Price</span>
                        <p className="text-2xl font-extralight tracking-tight">{hood.median}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-silver group-hover:gap-3 transition-all">
                        Explore <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <div className="hairline" />

      {/* All Neighborhoods Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-2xl lg:text-3xl font-bold tracking-tight mb-12">
              All Neighborhoods
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.filter(n => !n.featured).map((hood) => (
              <AnimatedSection key={hood.slug}>
                <motion.div variants={fadeUp}>
                  <Link
                    href={`/neighborhoods/${hood.slug}`}
                    className="group block folio-frame overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={hood.image}
                        alt={`${hood.name} neighborhood`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-silver" />
                        <span className="text-xs tracking-wider uppercase text-white/70">{hood.name}</span>
                      </div>
                    </div>
                    <div className="p-5 bg-[#161616]">
                      <h3 className="text-lg font-semibold tracking-wide mb-2 group-hover:text-silver transition-colors">
                        {hood.name}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">
                        {hood.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-extralight">{hood.median}</span>
                        <ArrowRight className="w-4 h-4 text-silver opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Investor Intelligence
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-2xl lg:text-3xl font-bold tracking-tight mb-10">
              Investor Strategy Hubs by Area
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Santa Monica Investors", href: "/investors/santa-monica" },
              { label: "Venice Investors", href: "/investors/venice" },
              { label: "Westwood Investors", href: "/investors/westwood" },
              { label: "Culver City Investors", href: "/investors/culver-city" },
              { label: "Beverly Hills Investors", href: "/investors/beverly-hills" },
              { label: "DTLA Investors", href: "/investors/dtla" },
              { label: "USC Area Investors", href: "/investors/usc-area" },
              { label: "South Bay Investors", href: "/investors/south-bay" },
            ].map((item) => (
              <AnimatedSection key={item.href}>
                <motion.div variants={fadeUp}>
                  <Link
                    href={item.href}
                    className="group block folio-frame p-5 bg-[#161616] hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/75 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-silver group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
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
