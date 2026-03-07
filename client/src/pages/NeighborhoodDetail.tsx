/*
 * THE BLACK FOLIO — Neighborhood Detail Page
 * Hyper-local SEO pillar page with market data, lifestyle, and listings
 */
import { useParams, Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, MapPin, School, Clock, TrendingUp, Home as HomeIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from "@/components/SEO";

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

const SANTA_MONICA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-santa-monica-DrPbXuiz8e6QYKHUR9nkro.webp";
const BRENTWOOD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/neighborhood-brentwood-dgfST7WRrkvkmMgP7r887h.webp";

const neighborhoodData: Record<string, {
  name: string; tagline: string; description: string; image: string;
  median: string; avgDom: string; yoyChange: string; inventory: string;
  lifestyle: string; schools: string[]; commute: string;
  faqs: { q: string; a: string }[];
}> = {
  brentwood: {
    name: "Brentwood", tagline: "Where Elegance Meets Nature",
    description: "Brentwood is one of the most prestigious neighborhoods in West Los Angeles, known for its tree-lined streets, luxury estates, and village-like atmosphere. Nestled between the Santa Monica Mountains and the Westside, Brentwood offers a rare combination of natural beauty and urban convenience. The neighborhood is home to the Getty Center, the Brentwood Country Mart, and some of the best schools in Los Angeles County.",
    image: BRENTWOOD_IMG,
    median: "$3,200,000", avgDom: "42 days", yoyChange: "+8.5%", inventory: "85 homes",
    lifestyle: "Brentwood residents enjoy a refined yet relaxed lifestyle. Morning hikes on the Mandeville Canyon trails, afternoon shopping at the Brentwood Country Mart, and evening dining along San Vicente Boulevard define the daily rhythm. The neighborhood attracts families, entertainment executives, and professionals seeking privacy and prestige without sacrificing accessibility.",
    schools: ["Brentwood School (K-12)", "Kenter Canyon Elementary", "Paul Revere Charter Middle School", "Palisades Charter High School"],
    commute: "15 min to Century City, 20 min to Santa Monica, 30 min to Downtown LA",
    faqs: [
      { q: "Is Brentwood a good neighborhood for families?", a: "Brentwood is one of the best family neighborhoods in West LA, with top-rated public and private schools, safe tree-lined streets, and numerous parks including the Brentwood Recreation Center." },
      { q: "What is the average home price in Brentwood?", a: "The median home price in Brentwood is approximately $3.2 million as of 2026, with luxury estates ranging from $5M to $30M+ in the hills." },
      { q: "How is the investment potential in Brentwood?", a: "Brentwood has shown consistent year-over-year appreciation of 6-9%, making it a strong long-term investment. Rental demand is high among professionals working in Century City and Santa Monica." },
    ],
  },
  "santa-monica": {
    name: "Santa Monica", tagline: "Pacific Coast Living at Its Finest",
    description: "Santa Monica is the crown jewel of West LA's coastal communities. With 3.5 miles of pristine beaches, a thriving tech scene (Silicon Beach), and world-class dining and entertainment, Santa Monica offers an unparalleled lifestyle. The city combines the energy of a major urban center with the laid-back charm of a beach town.",
    image: SANTA_MONICA_IMG,
    median: "$2,800,000", avgDom: "35 days", yoyChange: "+6.2%", inventory: "120 homes",
    lifestyle: "Life in Santa Monica revolves around the ocean. Morning surf sessions, bike rides along the Marvin Braude trail, and sunset dinners on the pier are everyday luxuries. The Third Street Promenade and Montana Avenue offer premier shopping, while the city's farm-to-table restaurant scene is among the best in LA.",
    schools: ["Franklin Elementary", "Lincoln Middle School", "Santa Monica High School", "Crossroads School"],
    commute: "10 min to Venice, 15 min to Brentwood, 25 min to Beverly Hills",
    faqs: [
      { q: "Is Santa Monica good for real estate investment?", a: "Santa Monica offers strong investment potential with consistent appreciation and high rental demand driven by the tech industry (Silicon Beach). Short-term rental regulations should be considered." },
      { q: "What types of properties are available in Santa Monica?", a: "Santa Monica offers diverse property types from beachfront condos and mid-century modern homes to luxury estates in the North of Montana area. Prices range from $800K for condos to $20M+ for oceanfront properties." },
      { q: "What makes Santa Monica attractive for first-time buyers?", a: "While prices are high, Santa Monica condos offer a more accessible entry point. The city's strong rental market, excellent public transit (Expo Line), and walkability make it appealing for young professionals." },
    ],
  },
  westwood: {
    name: "Westwood", tagline: "Academic Excellence Meets Urban Living",
    description: "Home to UCLA, Westwood is a vibrant neighborhood that blends academic energy with upscale residential living. The area offers excellent dining, cultural attractions like the Hammer Museum, and easy access to both the Westside and the San Fernando Valley.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
    median: "$1,800,000", avgDom: "38 days", yoyChange: "+5.8%", inventory: "65 homes",
    lifestyle: "Westwood offers a unique blend of college-town energy and residential tranquility. Residents enjoy proximity to UCLA's cultural events, Westwood Village's theaters and restaurants, and the serene beauty of the Los Angeles National Cemetery's grounds.",
    schools: ["Warner Avenue Elementary", "Emerson Middle School", "University High School", "UCLA Lab School"],
    commute: "10 min to Brentwood, 15 min to Century City, 20 min to Santa Monica",
    faqs: [
      { q: "Is Westwood a good area to buy a home?", a: "Westwood offers excellent value compared to neighboring Brentwood and Beverly Hills, with strong appreciation potential driven by UCLA's presence and ongoing development." },
      { q: "What is the rental market like in Westwood?", a: "Westwood has one of the strongest rental markets in West LA due to UCLA's student and faculty population. Investors can expect strong occupancy rates and competitive rental yields." },
      { q: "What are the best streets to live on in Westwood?", a: "The Holmby Hills area of Westwood (north of Wilshire) features some of LA's most prestigious estates. South of Wilshire offers more accessible condos and townhomes." },
    ],
  },
  "century-city": {
    name: "Century City", tagline: "The Modern Heart of the Westside",
    description: "Century City is a major commercial and residential hub on the Westside, known for its gleaming high-rise condos, the Westfield Century City mall, and proximity to Beverly Hills. Built on the former backlot of 20th Century Fox, the area offers a distinctly modern, urban lifestyle.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    median: "$1,500,000", avgDom: "45 days", yoyChange: "+4.5%", inventory: "90 homes",
    lifestyle: "Century City residents enjoy a walkable, urban lifestyle with world-class shopping, dining, and entertainment at their doorstep. The area is a major employment center for law firms, talent agencies, and financial institutions.",
    schools: ["Beverly Hills Unified (nearby)", "Century Park Elementary", "Overland Avenue Elementary"],
    commute: "5 min to Beverly Hills, 10 min to Westwood, 15 min to Santa Monica",
    faqs: [
      { q: "Are Century City condos a good investment?", a: "Century City condos offer strong investment potential with high rental demand from professionals working in the area's major office towers. The luxury condo market has shown steady appreciation." },
      { q: "What is the lifestyle like in Century City?", a: "Century City offers a modern, urban lifestyle with walkable access to shopping, dining, and entertainment. The area is quieter than nearby Beverly Hills while offering similar amenities." },
      { q: "How are property values trending in Century City?", a: "Century City has seen consistent 4-5% annual appreciation, with luxury condos in newer buildings commanding premium prices. The area benefits from ongoing commercial development." },
    ],
  },
  palms: {
    name: "Palms", tagline: "West LA's Best-Kept Secret",
    description: "Palms is one of the most affordable and accessible neighborhoods in West LA, making it an ideal entry point for first-time buyers and a smart choice for investors. Located near Silicon Beach and the Expo Line, Palms offers excellent connectivity and a diverse, community-oriented atmosphere.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    median: "$950,000", avgDom: "28 days", yoyChange: "+7.2%", inventory: "45 homes",
    lifestyle: "Palms is a diverse, walkable neighborhood with a growing food scene and strong community feel. Residents enjoy easy access to the Expo Line, proximity to Culver City's entertainment district, and a variety of parks and recreation options.",
    schools: ["Palms Elementary", "Palms Middle School", "Venice High School", "Hamilton High School"],
    commute: "5 min to Culver City, 10 min to Santa Monica (Expo Line), 15 min to Century City",
    faqs: [
      { q: "Is Palms a good neighborhood for first-time buyers?", a: "Palms is one of the best neighborhoods in West LA for first-time buyers, with a median price of $950K — significantly below the West LA average. The area offers strong appreciation potential and excellent transit access." },
      { q: "What is the rental yield in Palms?", a: "Palms offers some of the best rental yields in West LA, with cap rates averaging 4-5% for multi-family properties. Strong demand from young professionals working in Silicon Beach drives consistent occupancy." },
      { q: "How is Palms changing?", a: "Palms is experiencing significant gentrification with new mixed-use developments, restaurant openings, and improved infrastructure. Property values have appreciated 7%+ annually in recent years." },
    ],
  },
  sawtelle: {
    name: "Sawtelle", tagline: "Culture, Community & Character",
    description: "Known as Little Osaka, Sawtelle is a vibrant, walkable neighborhood celebrated for its Japanese restaurants, boutique shops, and strong community feel. The area offers a unique cultural experience within West LA.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    median: "$1,100,000", avgDom: "32 days", yoyChange: "+6.8%", inventory: "30 homes",
    lifestyle: "Sawtelle's Japantown corridor is the neighborhood's beating heart, offering some of LA's best ramen, sushi, and izakaya dining. The area attracts a young, diverse population drawn to its walkability and cultural richness.",
    schools: ["Nora Sterry Elementary", "Emerson Middle School", "University High School"],
    commute: "5 min to Westwood, 10 min to Santa Monica, 15 min to Century City",
    faqs: [
      { q: "What makes Sawtelle unique?", a: "Sawtelle's Japantown corridor offers a unique cultural experience with dozens of authentic Japanese restaurants, specialty shops, and community events. It's one of the most walkable neighborhoods in West LA." },
      { q: "Is Sawtelle good for investment?", a: "Sawtelle offers strong investment potential with rising property values and high rental demand from young professionals. The neighborhood's growing popularity and limited inventory drive consistent appreciation." },
      { q: "What types of homes are in Sawtelle?", a: "Sawtelle features a mix of single-family homes, duplexes, and small apartment buildings. Many properties offer renovation potential, making it attractive for value-add investors." },
    ],
  },
  venice: {
    name: "Venice", tagline: "Where Art Meets Innovation",
    description: "Venice is a legendary LA neighborhood where bohemian culture meets tech-industry innovation. From the iconic Venice Boardwalk to the boutique-lined Abbot Kinney Boulevard, Venice offers an eclectic, creative lifestyle unlike anywhere else in LA.",
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=1200&q=80",
    median: "$2,100,000", avgDom: "40 days", yoyChange: "+5.5%", inventory: "55 homes",
    lifestyle: "Venice is a neighborhood of contrasts — street art and luxury boutiques, surf culture and tech startups, historic canals and modern architecture. Residents enjoy a creative, free-spirited atmosphere with world-class dining on Abbot Kinney and Rose Avenue.",
    schools: ["Westminster Avenue Elementary", "Mark Twain Middle School", "Venice High School"],
    commute: "5 min to Santa Monica, 10 min to Marina del Rey, 20 min to Century City",
    faqs: [
      { q: "Is Venice a good investment?", a: "Venice has seen significant appreciation driven by Silicon Beach's growth. Properties near Abbot Kinney and the canals command premium prices. The area offers strong short-term and long-term rental potential." },
      { q: "What is the Venice real estate market like?", a: "Venice's market is diverse, ranging from $1M condos to $10M+ architectural homes. The neighborhood attracts tech professionals, artists, and investors seeking unique properties with character." },
      { q: "How walkable is Venice?", a: "Venice is one of the most walkable neighborhoods in LA, with Abbot Kinney, Rose Avenue, and the Boardwalk all accessible on foot. The area also offers excellent biking infrastructure." },
    ],
  },
};

export default function NeighborhoodDetail() {
  const params = useParams<{ slug: string }>();
  const data = neighborhoodData[params.slug || ""];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <Navigation />
        <div className="text-center pt-32">
          <h1 className="text-3xl font-bold mb-4">Neighborhood Not Found</h1>
          <Link href="/neighborhoods" className="text-silver hover:text-white transition-colors">
            &larr; Back to Neighborhoods
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title={`${data.name} Real Estate Guide | West LA Neighborhood`}
        description={`Explore ${data.name} real estate trends, pricing, lifestyle, schools, and investor-friendly neighborhood insights.`}
        canonical={`https://westla.realestate/neighborhoods/${params.slug}`}
        schema={[
          getWebPageSchema(
            `${data.name} Real Estate Guide`,
            `Market trends, lifestyle, and local insights for ${data.name}.`,
            `https://westla.realestate/neighborhoods/${params.slug}`,
          ),
          getFAQSchema(data.faqs),
          getBreadcrumbSchema([
            { name: "Home", url: "https://westla.realestate/" },
            { name: "Neighborhoods", url: "https://westla.realestate/neighborhoods" },
            { name: data.name, url: `https://westla.realestate/neighborhoods/${params.slug}` },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
        <div className="relative z-10 container pb-16">
          <Link href="/neighborhoods" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-silver hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" /> All Neighborhoods
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-lg text-white/60 mt-2">{data.tagline}</p>
        </div>
      </section>

      {/* Market Stats */}
      <section className="border-y border-white/5 bg-[#0e0e0e]">
        <div className="container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Median Price", value: data.median, icon: HomeIcon },
            { label: "Avg. Days on Market", value: data.avgDom, icon: Clock },
            { label: "YoY Appreciation", value: data.yoyChange, icon: TrendingUp },
            { label: "Active Inventory", value: data.inventory, icon: MapPin },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-4 h-4 text-silver mx-auto mb-2" />
              <p className="text-2xl font-extralight tracking-tight">{stat.value}</p>
              <p className="text-xs tracking-[0.12em] uppercase text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <motion.div variants={fadeUp}>
                  <h2 className="text-2xl font-bold tracking-tight mb-6">
                    About {data.name}
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-8">{data.description}</p>

                  <h3 className="text-xl font-semibold tracking-tight mb-4">Lifestyle</h3>
                  <p className="text-white/60 leading-relaxed mb-8">{data.lifestyle}</p>

                  <h3 className="text-xl font-semibold tracking-tight mb-4">Schools</h3>
                  <div className="space-y-2 mb-8">
                    {data.schools.map((school) => (
                      <div key={school} className="flex items-center gap-3 py-2 border-b border-white/5">
                        <School className="w-4 h-4 text-silver shrink-0" />
                        <span className="text-sm text-white/60">{school}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight mb-4">Commute Times</h3>
                  <p className="text-white/60 leading-relaxed mb-8">{data.commute}</p>
                </motion.div>
              </AnimatedSection>

              {/* FAQ Section - AEO optimized */}
              <AnimatedSection className="mt-12">
                <motion.div variants={fadeUp}>
                  <h2 className="text-2xl font-bold tracking-tight mb-8">
                    Frequently Asked Questions About {data.name}
                  </h2>
                  <div className="space-y-6">
                    {data.faqs.map((faq, i) => (
                      <div key={i} className="folio-frame p-6 bg-[#161616]">
                        <h3 className="text-base font-semibold mb-3">{faq.q}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* CTA Card */}
                <div className="folio-frame p-6 bg-[#161616]">
                  <h3 className="text-lg font-semibold mb-3">
                    Interested in {data.name}?
                  </h3>
                  <p className="text-sm text-white/50 mb-6">
                    Get personalized market insights and exclusive listings for this neighborhood.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full py-3 bg-white text-black text-center text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
                  >
                    Schedule a Tour
                  </Link>
                  <Link
                    href="/properties"
                    className="block w-full py-3 mt-3 border border-white/20 text-center text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
                  >
                    View Listings
                  </Link>
                </div>

                {/* Newsletter */}
                <div className="folio-frame p-6 bg-[#161616]">
                  <h3 className="text-base font-semibold mb-2">
                    {data.name} Market Updates
                  </h3>
                  <p className="text-xs text-white/40 mb-4">
                    Get monthly market reports and new listings delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#111111] border border-white/10 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors mb-3"
                  />
                  <button className="w-full py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
