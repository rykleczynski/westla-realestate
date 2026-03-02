/*
 * THE BLACK FOLIO — Properties Page
 * Property search and listings with filtering + Idxcellent MLS widget
 */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize, Heart, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

/* Idxcellent MLS: set VITE_IDXCELLENT_WIDGET_URL to your widget URL from the Idxcellent setup page (Default.aspx?wid=...). Use VITE_IDXCELLENT_SCRIPT_URL for dev (e.g. dev.themls.com). */
const IDXCELLENT_SCRIPT_URL =
  import.meta.env.VITE_IDXCELLENT_SCRIPT_URL || "https://www.themls.com/IDXNET/Scripts/idxwidget.js";
const IDXCELLENT_WIDGET_URL =
  import.meta.env.VITE_IDXCELLENT_WIDGET_URL ||
  "https://www.themls.com/IDXNET/Default.aspx?wid=CG9Atj%2fV2MXwgVaUKuBHtSogjg9NU3931cpRi1%2fNzUQEQL";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

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
const INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031447369/G6dKwWk9EccqvcTqiPXfgn/luxury-interior-XkMNb7ufufLac9VK4t4iEv.webp";

const properties = [
  { id: 1, title: "Modern Oceanfront Estate", address: "123 Pacific Coast Hwy, Santa Monica", price: "$12,500,000", beds: 5, baths: 6, sqft: "6,200", type: "Single Family", image: SANTA_MONICA_IMG, neighborhood: "Santa Monica", status: "Active" },
  { id: 2, title: "Mediterranean Villa", address: "456 Tigertail Rd, Brentwood", price: "$8,750,000", beds: 6, baths: 7, sqft: "8,400", type: "Single Family", image: BRENTWOOD_IMG, neighborhood: "Brentwood", status: "Active" },
  { id: 3, title: "Contemporary Penthouse", address: "789 Avenue of the Stars, Century City", price: "$4,200,000", beds: 3, baths: 3, sqft: "3,100", type: "Condo", image: INTERIOR_IMG, neighborhood: "Century City", status: "Active" },
  { id: 4, title: "Architectural Masterpiece", address: "321 Holmby Ave, Westwood", price: "$6,900,000", beds: 4, baths: 5, sqft: "5,800", type: "Single Family", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", neighborhood: "Westwood", status: "Active" },
  { id: 5, title: "Charming Craftsman", address: "555 Motor Ave, Palms", price: "$1,150,000", beds: 3, baths: 2, sqft: "1,800", type: "Single Family", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80", neighborhood: "Palms", status: "Active" },
  { id: 6, title: "Venice Canal Retreat", address: "222 Carroll Canal, Venice", price: "$3,400,000", beds: 4, baths: 3, sqft: "2,800", type: "Single Family", image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80", neighborhood: "Venice", status: "Active" },
  { id: 7, title: "Luxury High-Rise Unit", address: "2000 Century Park East, Century City", price: "$2,100,000", beds: 2, baths: 2, sqft: "1,900", type: "Condo", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", neighborhood: "Century City", status: "Active" },
  { id: 8, title: "Sawtelle Modern Duplex", address: "1800 Sawtelle Blvd, Sawtelle", price: "$1,650,000", beds: 4, baths: 3, sqft: "2,400", type: "Multi-Family", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", neighborhood: "Sawtelle", status: "Active" },
];

const neighborhoods = ["All", "Santa Monica", "Brentwood", "Westwood", "Century City", "Palms", "Venice", "Sawtelle"];
const priceRanges = ["Any Price", "Under $1M", "$1M - $2M", "$2M - $5M", "$5M - $10M", "$10M+"];
const propertyTypes = ["All Types", "Single Family", "Condo", "Multi-Family"];

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [selectedType, setSelectedType] = useState("All Types");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProperties = properties.filter((p) => {
    if (selectedNeighborhood !== "All" && p.neighborhood !== selectedNeighborhood) return false;
    if (selectedType !== "All Types" && p.type !== selectedType) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
    toast("Feature coming soon — save favorites with an account.");
  };

  // Load Idxcellent widget script (required by MLS iframe)
  useEffect(() => {
    if (document.getElementById("idx-widget-script")) return;
    const script = document.createElement("script");
    script.id = "idx-widget-script";
    script.src = IDXCELLENT_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12">
        <div className="container">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="section-label block mb-4">
              Browse
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Property
              <span className="font-light"> Search</span>
            </motion.h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Idxcellent MLS Search — live listings from the MLS */}
      <section className="pb-12">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-4">
              <h2 className="text-lg font-semibold tracking-wide text-white/90">
                Live MLS Listings
              </h2>
              <p className="text-sm text-white/50 mt-1">
                Search all available properties from the MLS below.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="idx-body w-full max-w-[933px] mx-auto overflow-hidden rounded-sm border border-white/10 bg-[#1a1a1a]"
            >
              <iframe
                id="idxcellent-iframe"
                title="MLS Property Search"
                src={IDXCELLENT_WIDGET_URL}
                className="w-full border-0 bg-[#b7b7b7] min-h-[900px]"
                style={{ width: "100%", maxWidth: "933px", height: "900px" }}
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search & Filters — featured/sample listings */}
      <section className="pb-8 sticky top-20 z-30 bg-[#111111]/95 backdrop-blur-md border-b border-white/5">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by address, neighborhood, or keyword..."
                className="w-full pl-11 pr-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-xs font-medium tracking-[0.1em] uppercase hover:bg-white/5 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3"
            >
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white focus:border-white/30 focus:outline-none"
              >
                {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white focus:border-white/30 focus:outline-none"
              >
                {priceRanges.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-[#1a1a1a] border border-white/10 text-sm text-white focus:border-white/30 focus:outline-none"
              >
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <p className="text-sm text-white/40 mb-6">
            {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <AnimatedSection key={property.id}>
                <motion.div variants={fadeUp} className="group folio-frame overflow-hidden bg-[#161616]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
                      aria-label="Save property"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? "fill-white text-white" : "text-white/70"}`} />
                    </button>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-[0.6rem] tracking-wider uppercase bg-white/10 backdrop-blur-sm text-white/80">
                        {property.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <p className="text-2xl font-extralight tracking-tight">{property.price}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold tracking-wide mb-1 group-hover:text-silver transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                      <MapPin className="w-3 h-3" />
                      {property.address}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {property.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {property.baths}</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3 h-3" /> {property.sqft} sqft</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 mb-4">No properties match your criteria.</p>
              <button
                onClick={() => { setSelectedNeighborhood("All"); setSelectedType("All Types"); setSearchQuery(""); }}
                className="text-xs tracking-[0.15em] uppercase text-silver hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="folio-frame p-10 bg-[#161616] text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-3">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-sm text-white/40 max-w-lg mx-auto mb-6">
                We have access to off-market properties and pocket listings not shown here.
                Tell us what you&apos;re looking for and we&apos;ll find it.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Contact Us <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
