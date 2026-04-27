/*
 * THE BLACK FOLIO — Blog / Market Insights
 * Date-gated: only published posts appear in the grid
 */
import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getWebPageSchema, getBreadcrumbSchema } from "@/components/SEO";
import { getPublishedPosts } from "@/data/blogPosts";

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

const ALL_CATEGORIES = [
  "All",
  "Market Report",
  "Investment Guide",
  "Investment Analysis",
  "Seller Tips",
  "Buyer Guide",
];

const NEIGHBORHOOD_SPOTLIGHTS = [
  {
    name: "Sawtelle (Little Osaka)",
    slug: "sawtelle",
    blurb:
      "Walkable Westside corridor between Westwood and Santa Monica. Condo inventory under $900K, R1 bungalows with ADU potential, and current open house schedule.",
    badge: "Featured",
  },
  {
    name: "Palms",
    slug: "palms",
    blurb: "West LA's best yields. Median ~$950K with 4–5% cap rates on small multifamily near the Expo Line.",
  },
  {
    name: "Culver City",
    slug: "culver-city",
    blurb: "Strong Q1 2026 outperformer (+4.8% YoY) anchored by Amazon Studios and Apple TV+ employment.",
  },
  {
    name: "Westwood",
    slug: "westwood",
    blurb: "UCLA-driven rental demand and value vs. neighboring Brentwood — see the full neighborhood guide.",
  },
];

export default function Blog() {
  const published = getPublishedPosts();
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = published[0];
  const rest = published.slice(1);

  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Los Angeles Real Estate Blog | Market Reports, Investor Insights, Buyer Guides"
        description="Read Los Angeles real estate market reports, investor analysis, buyer guides, and seller strategy updates."
        canonical="https://ryanklosangeles.com/blog"
        schema={[
          getWebPageSchema(
            "Los Angeles Real Estate Blog",
            "Market reports, investor insights, and practical real estate guides.",
            "https://ryanklosangeles.com/blog",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "Blog", url: "https://ryanklosangeles.com/blog" },
          ]),
        ]}
      />
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Insights
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Market
              <span className="font-light"> Intelligence</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/50 max-w-2xl">
              Expert analysis, neighborhood spotlights, and actionable insights for
              West LA real estate investors, buyers, and sellers.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <div className="hairline" />

      {/* Category Filter */}
      <section className="py-6 overflow-x-auto">
        <div className="container">
          <div className="flex gap-3 min-w-max">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "border-white/50 text-white"
                    : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-8 lg:py-12">
          <div className="container">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <Link href={`/blog/${featured.slug}`}>
                  <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 folio-frame overflow-hidden bg-[#161616] cursor-pointer">
                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-1 text-[0.6rem] tracking-wider uppercase bg-white/10 text-white/70">
                          {featured.category}
                        </span>
                        <span className="text-xs text-white/30">Featured</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4 group-hover:text-silver transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-white/40 leading-relaxed mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/30 mb-6">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.displayDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-white/60 group-hover:text-white transition-colors">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      {filtered.length > 0 && (
        <section className="py-8 lg:py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <AnimatedSection key={post.slug}>
                  <motion.div variants={fadeUp}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="group folio-frame overflow-hidden bg-[#161616] cursor-pointer h-full flex flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-2 py-1 text-[0.6rem] tracking-wider uppercase bg-black/40 backdrop-blur-sm text-white/70">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-base font-semibold tracking-wide mb-2 group-hover:text-silver transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-white/40 leading-relaxed mb-4 flex-1 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-white/30">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.displayDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {published.length === 0 && (
        <section className="py-20">
          <div className="container text-center">
            <p className="text-white/40">The first post publishes April 22, 2026. Check back soon.</p>
          </div>
        </section>
      )}

      {/* Neighborhood Spotlights — internal links to deepen topical authority */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="section-label block mb-2">Neighborhood Spotlights</span>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  Read by West LA Neighborhood
                </h2>
              </div>
              <Link href="/neighborhoods" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-silver hover:text-white transition-colors">
                All Neighborhoods <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {NEIGHBORHOOD_SPOTLIGHTS.map((n) => (
              <AnimatedSection key={n.slug}>
                <motion.div variants={fadeUp}>
                  <Link
                    href={`/neighborhoods/${n.slug}`}
                    className="group folio-frame p-5 bg-[#161616] h-full flex flex-col hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-silver" />
                      <h3 className="text-sm font-semibold group-hover:text-white transition-colors">{n.name}</h3>
                      {n.badge && (
                        <span className="ml-auto px-2 py-0.5 text-[0.55rem] tracking-wider uppercase bg-white/10 text-white/70">
                          {n.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed flex-1">{n.blurb}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-silver group-hover:text-white transition-colors">
                      View Guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="folio-frame p-10 lg:p-16 bg-[#161616] text-center">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
                Stay Informed
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-8">
                Get weekly market insights, new listings, and investment opportunities
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-[#111111] border border-white/10 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
                />
                <button className="px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
