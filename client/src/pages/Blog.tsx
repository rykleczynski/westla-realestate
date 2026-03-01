/*
 * THE BLACK FOLIO — Blog / Market Insights
 * SEO-rich content hub for market reports, guides, and analysis
 */
import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

const featuredPost = {
  title: "West LA Real Estate Market Report: Q1 2026",
  excerpt: "A comprehensive analysis of West LA's real estate market performance in Q1 2026, including neighborhood-by-neighborhood breakdowns, pricing trends, and forecasts for the remainder of the year.",
  category: "Market Report",
  date: "March 1, 2026",
  readTime: "8 min read",
  image: HERO_IMG,
};

const posts = [
  {
    title: "Is Palms the Best Neighborhood for First-Time Buyers in 2026?",
    excerpt: "With a median price of $950K and strong appreciation, Palms continues to attract first-time buyers. Here's what you need to know about buying in this up-and-coming West LA neighborhood.",
    category: "Neighborhood Spotlight",
    date: "February 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    title: "1031 Exchange Guide for Los Angeles Real Estate Investors",
    excerpt: "Everything you need to know about tax-deferred exchanges in the LA market, including timelines, qualified intermediaries, and common pitfalls to avoid.",
    category: "Investment Guide",
    date: "February 18, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
  {
    title: "How to Sell Your Brentwood Home for Top Dollar",
    excerpt: "Proven strategies for maximizing your sale price in Brentwood, from staging and photography to pricing and negotiation tactics.",
    category: "Seller Tips",
    date: "February 10, 2026",
    readTime: "6 min read",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-brentwood-dgfST7WRrkvkmMgP7r887h.webp",
  },
  {
    title: "Silicon Beach Effect: How Tech Is Reshaping West LA Real Estate",
    excerpt: "The continued growth of tech companies in Venice, Santa Monica, and Playa Vista is driving unprecedented demand for housing in West LA.",
    category: "Market Analysis",
    date: "February 3, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&q=80",
  },
  {
    title: "First-Time Buyer Programs Available in Los Angeles for 2026",
    excerpt: "A complete guide to down payment assistance, FHA loans, CalHFA programs, and other resources available to first-time home buyers in LA County.",
    category: "Buyer Guide",
    date: "January 27, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    title: "Cap Rates and Rental Yields: West LA Investment Analysis",
    excerpt: "A data-driven comparison of cap rates and rental yields across West LA neighborhoods, helping investors identify the best opportunities.",
    category: "Investment Analysis",
    date: "January 20, 2026",
    readTime: "8 min read",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/investor-dashboard-6A7AA9zNUpCJZtV46oacDT.webp",
  },
];

const categories = ["All", "Market Report", "Neighborhood Spotlight", "Investment Guide", "Seller Tips", "Buyer Guide", "Market Analysis", "Investment Analysis"];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#111111]">
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
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 text-xs tracking-[0.1em] uppercase border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 folio-frame overflow-hidden bg-[#161616] cursor-pointer">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 text-[0.6rem] tracking-wider uppercase bg-white/10 text-white/70">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-white/30">Featured</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4 group-hover:text-silver transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={i}>
                <motion.div variants={fadeUp} className="group folio-frame overflow-hidden bg-[#161616] cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                  </div>
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
