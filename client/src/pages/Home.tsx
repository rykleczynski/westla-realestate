/*
 * THE BLACK FOLIO — Homepage
 * Cinematic full-viewport sections, editorial layout
 * Dark canvas with luminous property imagery
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Home as HomeIcon,
  DollarSign,
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
  Award,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/hero-westla-skyline-VBWfTyAEiaSCRKVWtRKwdj.webp";
const SANTA_MONICA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-santa-monica-DrPbXuiz8e6QYKHUR9nkro.webp";
const BRENTWOOD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-brentwood-dgfST7WRrkvkmMgP7r887h.webp";
const INVESTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/investor-dashboard-6A7AA9zNUpCJZtV46oacDT.webp";
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/luxury-interior-XkMNb7ufufLac9VK4t4iEv.webp";

/* Animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Counter animation */
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* Featured listings data */
const featuredListings = [
  {
    id: 1,
    title: "Modern Oceanfront Estate",
    location: "Santa Monica",
    price: "$12,500,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    image: SANTA_MONICA_IMG,
  },
  {
    id: 2,
    title: "Mediterranean Villa",
    location: "Brentwood",
    price: "$8,750,000",
    beds: 6,
    baths: 7,
    sqft: "8,400",
    image: BRENTWOOD_IMG,
  },
  {
    id: 3,
    title: "Contemporary Penthouse",
    location: "Century City",
    price: "$4,200,000",
    beds: 3,
    baths: 3,
    sqft: "3,100",
    image: INTERIOR_IMG,
  },
  {
    id: 4,
    title: "Architectural Masterpiece",
    location: "Westwood",
    price: "$6,900,000",
    beds: 4,
    baths: 5,
    sqft: "5,800",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
];

/* Neighborhoods data */
const neighborhoods = [
  { name: "Brentwood", slug: "brentwood", median: "$3.2M", image: BRENTWOOD_IMG },
  { name: "Santa Monica", slug: "santa-monica", median: "$2.8M", image: SANTA_MONICA_IMG },
  { name: "Westwood", slug: "westwood", median: "$1.8M", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80" },
  { name: "Century City", slug: "century-city", median: "$1.5M", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { name: "Palms", slug: "palms", median: "$950K", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
];

/* Testimonials */
const testimonials = [
  {
    quote: "They found us the perfect investment property in Palms. The ROI analysis and market data they provided was invaluable for our decision.",
    name: "Michael R.",
    role: "Real Estate Investor",
  },
  {
    quote: "As first-time buyers, we were overwhelmed by the LA market. Their step-by-step guidance made the entire process feel manageable and exciting.",
    name: "Sarah & James K.",
    role: "First-Time Home Buyers",
  },
  {
    quote: "Sold our Brentwood home 15% above asking price in just 12 days. Their marketing strategy and staging recommendations were exceptional.",
    name: "Patricia L.",
    role: "Home Seller",
  },
];

export default function Home() {
  const [currentListing, setCurrentListing] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Background image with Ken Burns effect */}
        <motion.div
          className="absolute inset-0"
            animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={HERO_IMG}
            alt="West Los Angeles aerial view at golden hour"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 container pb-20 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="section-label block mb-4">West Los Angeles</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-3xl">
              Luxury Living,
              <br />
              <span className="font-light">Redefined.</span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-white/60 max-w-xl leading-relaxed">
              Your premier resource for luxury homes, investment properties, and
              expert guidance across West Los Angeles&apos;s most coveted neighborhoods.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                <Search className="w-4 h-4" />
                Find Your Home
              </Link>
              <Link
                href="/sellers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                What&apos;s My Home Worth?
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-white/5 bg-[#0e0e0e]">
        <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: 500, suffix: "+", label: "Properties Sold", icon: Building2 },
            { value: 2, prefix: "$", suffix: "B+", label: "Total Sales Volume", icon: TrendingUp },
            { value: 15, suffix: "+", label: "Years Experience", icon: Award },
            { value: 98, suffix: "%", label: "Client Satisfaction", icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 text-silver mx-auto mb-3" />
              <div className="text-3xl lg:text-4xl font-extralight tracking-tight">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
              </div>
              <p className="text-xs tracking-[0.15em] uppercase text-white/40 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PERSONA PATHWAYS ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              How Can We Help?
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold tracking-tight mb-16">
              Tailored to Your
              <span className="font-light"> Goals</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "For Investors",
                description:
                  "Access off-market deals, cap rate calculators, and data-driven insights to maximize your ROI in West LA's hottest markets.",
                href: "/investors",
                image: INVESTOR_IMG,
              },
              {
                icon: HomeIcon,
                title: "First-Time Buyers",
                description:
                  "Navigate the LA market with confidence. From mortgage pre-approval to closing, we guide you through every step.",
                href: "/buyers",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
              },
              {
                icon: DollarSign,
                title: "Selling Your Home",
                description:
                  "Get a free home valuation, professional staging consultation, and a proven marketing strategy to sell for top dollar.",
                href: "/sellers",
                image: INTERIOR_IMG,
              },
            ].map((pathway, i) => (
              <AnimatedSection key={pathway.title}>
                <motion.div variants={fadeUp}>
                  <Link href={pathway.href} className="group block">
                    <div className="relative overflow-hidden aspect-[4/3] mb-6">
                      <img
                        src={pathway.image}
                        alt={pathway.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <pathway.icon className="w-5 h-5 text-silver" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold tracking-wide mb-2 group-hover:text-silver transition-colors">
                      {pathway.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {pathway.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-silver group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED LISTINGS ===== */}
      <section className="py-24 lg:py-32 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <motion.span variants={fadeUp} className="section-label block mb-4">
                  Featured
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold tracking-tight">
                  Exclusive
                  <span className="font-light"> Listings</span>
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setCurrentListing(Math.max(0, currentListing - 1))}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Previous listing"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentListing(Math.min(featuredListings.length - 1, currentListing + 1))}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Next listing"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredListings.map((listing, i) => (
              <AnimatedSection key={listing.id}>
                <motion.div
                  variants={fadeUp}
                  className="group relative overflow-hidden folio-frame"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="section-label">{listing.location}</span>
                    <h3 className="text-xl font-semibold tracking-wide mt-1 mb-2">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>{listing.beds} Beds</span>
                      <span className="text-white/20">|</span>
                      <span>{listing.baths} Baths</span>
                      <span className="text-white/20">|</span>
                      <span>{listing.sqft} Sq Ft</span>
                    </div>
                    <p className="text-2xl font-extralight tracking-tight mt-3">
                      {listing.price}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <motion.div variants={fadeUp}>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                View All Properties <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== NEIGHBORHOODS ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Explore
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
              West LA
              <span className="font-light"> Neighborhoods</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 max-w-xl mb-12">
              From the beachside luxury of Santa Monica to the tree-lined estates of Brentwood,
              discover what makes each West LA neighborhood unique.
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {neighborhoods.map((hood, i) => (
              <AnimatedSection key={hood.slug}>
                <motion.div variants={fadeUp}>
                  <Link
                    href={`/neighborhoods/${hood.slug}`}
                    className="group block relative overflow-hidden aspect-[3/4]"
                  >
                    <img
                      src={hood.image}
                      alt={`${hood.name} neighborhood`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-base font-semibold tracking-wide mb-1">
                        {hood.name}
                      </h3>
                      <p className="text-xs text-white/50">
                        Median: {hood.median}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-silver" />
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <motion.div variants={fadeUp}>
              <Link
                href="/neighborhoods"
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-silver hover:text-white transition-colors"
              >
                Explore All Neighborhoods <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 lg:py-32 bg-[#0e0e0e]">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4 text-center">
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold tracking-tight mb-16 text-center">
              Client
              <span className="font-light"> Stories</span>
            </motion.h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <motion.div variants={fadeIn} className="text-center">
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-silver text-silver" />
                  ))}
                </div>
                <p className="text-xl lg:text-2xl font-light leading-relaxed text-white/80 mb-8">
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </p>
                <p className="text-sm font-semibold tracking-wider uppercase">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-xs text-silver mt-1">
                  {testimonials[currentTestimonial].role}
                </p>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-10">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-2 h-2 transition-all ${
                        i === currentTestimonial
                          ? "bg-white w-6"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={INTERIOR_IMG}
            alt="Luxury interior"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-[#111111]/70" />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Get Started
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold tracking-tight mb-6 max-w-2xl mx-auto">
              Ready to Make
              <span className="font-light"> Your Move?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 max-w-lg mx-auto mb-10">
              Whether you&apos;re buying, selling, or investing, our team of West LA
              specialists is here to guide you every step of the way.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/sellers"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                Free Home Valuation
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
