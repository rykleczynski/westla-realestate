/*
 * THE BLACK FOLIO — Navigation
 * Floating semi-transparent navigation bar
 * Shifts from transparent to solid black on scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Neighborhoods", href: "/neighborhoods" },
  {
    label: "Services",
    children: [
      { label: "For Investors", href: "/investors" },
      { label: "Rental Listing Agent (LA)", href: "/investors/rental-listing-agent-los-angeles" },
      { label: "First-Time Buyers", href: "/buyers" },
      { label: "Selling Your Home", href: "/sellers" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="RK. Ryan K Real Estate"
              className="h-8 w-8 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase">
                Ryan K
              </span>
              <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-silver">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-xs font-medium tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors">
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 py-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-xs tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors ${
                    location === item.href
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-6 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase border border-white/30 hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#111111]/98 backdrop-blur-lg flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label} className="flex flex-col items-center gap-3">
                    <span className="text-xs tracking-[0.2em] uppercase text-silver">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-2xl font-light tracking-wider text-white/80 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="text-2xl font-light tracking-wider text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="hairline w-24 my-4" />
              <Link
                href="/contact"
                className="px-8 py-3 text-sm font-semibold tracking-[0.15em] uppercase border border-white/30 hover:bg-white hover:text-black transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
