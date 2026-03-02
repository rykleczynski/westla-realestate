/*
 * THE BLACK FOLIO — Footer
 * Minimal, editorial footer with silver hairline borders
 */
import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="container py-16 lg:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-white/40 flex items-center justify-center">
                <span className="text-xs font-bold tracking-widest">RK.</span>
              </div>
              <div>
                <span className="text-sm font-semibold tracking-[0.2em] uppercase">
                  Ryan K
                </span>
                <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-silver">
                  Real Estate
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Your premier resource for luxury real estate in West Los Angeles.
              Serving investors, first-time buyers, and sellers across Brentwood,
              Santa Monica, Westwood, and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="section-label mb-6">Explore</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Neighborhoods", href: "/neighborhoods" },
                { label: "Properties", href: "/properties" },
                { label: "Market Insights", href: "/blog" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="section-label mb-6">Services</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "For Investors", href: "/investors" },
                { label: "First-Time Buyers", href: "/buyers" },
                { label: "Sell Your Home", href: "/sellers" },
                { label: "Home Valuation", href: "/sellers" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-silver mt-0.5 shrink-0" />
                <span className="text-sm text-white/50">
                  West Los Angeles, CA
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-silver shrink-0" />
                <span className="text-sm text-white/50">(310) 555-0100</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-silver shrink-0" />
                <span className="text-sm text-white/50">info@westla.realestate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="hairline mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wider">
            &copy; {new Date().getFullYear()} Ryan K Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30 tracking-wider">DRE# 00000000</span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-xs text-white/30 tracking-wider">Privacy Policy</span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-xs text-white/30 tracking-wider">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
