import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  Calculator,
  PhoneCall,
  Mail,
  CalendarDays,
  ShieldCheck,
  CircleX,
  Users,
  SearchCheck,
  Megaphone,
  MessagesSquare,
  FileCheck2,
  Handshake,
  BadgeDollarSign,
  Clock3,
  Star,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, {
  getBreadcrumbSchema,
  getFAQSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getSiteUrl,
  getWebPageSchema,
} from "@/components/SEO";

const strategyItems = [
  {
    icon: Users,
    title: "Exclusive Tenant Network Pool",
    description:
      "Before your listing goes public, I tap into my private database of pre-screened, actively searching tenants. Many units are filled before they ever hit the market.",
  },
  {
    icon: SearchCheck,
    title: "MLS + 300+ Syndicated Sites",
    description:
      "Your property is listed on the MLS and syndicated to 300+ rental platforms, including Zillow, Trulia, Realtor.com, and Apartments.com.",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "Targeted paid and organic campaigns across Instagram, Facebook, and Nextdoor reach local in-market renters with professional creative and copy.",
  },
  {
    icon: MessagesSquare,
    title: "All Inquiries & Showings Handled",
    description:
      "Every call, text, email, and showing request is managed for you. You do not have to coordinate appointments or field repetitive tenant questions.",
  },
  {
    icon: FileCheck2,
    title: "In-Depth Tenant Screening",
    description:
      "Full credit, background, and income verification are baseline. Personal reference checks and face-to-face interviews add an extra quality filter.",
  },
  {
    icon: Handshake,
    title: "End-to-End Lease Coordination",
    description:
      "From offer to signed lease, I manage negotiations and paperwork so your lease execution is clean, compliant, and efficient.",
  },
];

const faqItems = [
  {
    q: "How much does a rental listing agent cost in Los Angeles?",
    a: "This service fee is 6% of one year's rental income and is only paid after a successful tenant placement.",
  },
  {
    q: "Do I pay anything upfront to list my rental?",
    a: "No. The structure is no-rent, no-fee, so there are no out-of-pocket costs before placement.",
  },
  {
    q: "How do you screen tenants?",
    a: "Screening includes credit and background review, income verification, rental history, personal references, and a face-to-face interview.",
  },
  {
    q: "Is this property management?",
    a: "No. This is a leasing and tenant placement service designed to get your property rented efficiently without ongoing management contracts.",
  },
];

export default function RentalListingAgentLosAngeles() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/investors/rental-listing-agent-los-angeles`;
  const [monthlyRent, setMonthlyRent] = useState(2500);

  const annualRent = useMemo(() => monthlyRent * 12, [monthlyRent]);
  const serviceFee = useMemo(() => annualRent * 0.06, [annualRent]);

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="LA Rental Listing Agent for Investors"
        description="Los Angeles rental listing agent for property owners and investors. Get full-service leasing, gold-standard tenant screening, and pay only after successful placement."
        canonical={pageUrl}
        schema={[
          getWebPageSchema(
            "Los Angeles Rental Listing Agent for Investors",
            "Investor-focused rental listing and tenant placement service in Los Angeles with no-rent, no-fee structure.",
            pageUrl,
          ),
          getLocalBusinessSchema(),
          getServiceSchema({
            name: "Los Angeles Rental Listing Agent Service",
            description:
              "Full-service rental listing, marketing, showing coordination, and tenant screening for Los Angeles property investors and landlords.",
            serviceType: "Rental Listing Agent",
            url: pageUrl,
            areaServed: "Los Angeles",
          }),
          getFAQSchema(faqItems),
          getBreadcrumbSchema([
            { name: "Home", url: baseUrl },
            { name: "Investors", url: `${baseUrl}/investors` },
            { name: "Rental Listing Agent Los Angeles", url: pageUrl },
          ]),
        ]}
      />

      <Navigation />

      <section className="relative pt-32 pb-14 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80"
            alt="Los Angeles rental property exterior"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/70 via-[#111111]/75 to-[#111111]" />
        </div>
        <div className="container relative z-10">
          <span className="section-label block mb-4">Rental Listing Services - Property Owner Guide</span>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 max-w-5xl">
            The Smarter Way to
            <span className="font-light"> Rent Your Unit in Los Angeles</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed mb-10">
            Most landlords spend weeks, sometimes months, fielding unqualified calls and coordinating
            showings. This process handles every step of leasing with a proven system designed to rent
            faster to stronger tenants with zero upfront risk.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-4xl">
            {[
              { label: "No Upfront Fees", value: "Pay only on placement", icon: BadgeDollarSign },
              { label: "Average Timeline Focus", value: "Faster leasing cycles", icon: Clock3 },
              { label: "Screening Standard", value: "5-layer tenant review", icon: ShieldCheck },
            ].map((item) => (
              <div key={item.label} className="folio-frame bg-black/35 border-white/20 p-4">
                <item.icon className="w-4 h-4 text-amber-300 mb-2" />
                <p className="text-[11px] tracking-[0.15em] uppercase text-white/45 mb-1">{item.label}</p>
                <p className="text-sm text-white/90">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-300 text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-amber-200 transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              Book Rental Strategy Call
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
            >
              Request Tenant Placement Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="hairline" />

      <section className="py-14 lg:py-20">
        <div className="container">
          <div className="folio-frame p-8 lg:p-10 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-300 text-black">
            <p className="text-xs tracking-[0.18em] uppercase mb-3 font-semibold">No Rent, No Fee Offer</p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
              You Do Not Pay Unless It Gets Rented
            </h2>
            <p className="text-sm lg:text-base max-w-3xl text-black/80 leading-relaxed">
              The fee is 6% of one year&apos;s rental income, paid only upon successful placement.
              On a $2,500/month unit, that&apos;s $1,800 total. Less than one month of rent for a
              fully managed leasing process.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-black/85 transition-colors"
              >
                Claim the No-Risk Leasing Offer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#0e0e0e]">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="folio-frame p-7 bg-gradient-to-br from-[#161616] to-[#1c1c1c]">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-cyan-300" />
              <h2 className="text-2xl font-semibold tracking-tight">6% Annual Rental Income Calculator</h2>
            </div>
            <p className="text-sm text-white/65 mb-6">
              Estimate the total placement fee based on your monthly rent.
            </p>
            <label htmlFor="monthlyRent" className="text-xs tracking-[0.15em] uppercase text-white/50 block mb-2">
              Monthly Rent (USD)
            </label>
            <input
              id="monthlyRent"
              type="number"
              min={0}
              step={50}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-[#111111] border border-white/15 px-4 py-3 text-white mb-6"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-cyan-300/25 p-4 bg-cyan-300/10">
                <p className="text-xs tracking-[0.12em] uppercase text-white/45 mb-1">Annual Rent</p>
                <p className="text-2xl font-semibold">
                  ${annualRent.toLocaleString()}
                </p>
              </div>
              <div className="border border-emerald-300/30 p-4 bg-emerald-300/10">
                <p className="text-xs tracking-[0.12em] uppercase text-white/45 mb-1">6% Service Fee</p>
                <p className="text-2xl font-semibold text-emerald-300">
                  ${serviceFee.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-white/40 mt-4">
              Example from guide: $2,500/month x 12 = $30,000 annual rent; 6% fee = $1,800.
            </p>
          </div>

          <div className="folio-frame p-7 bg-gradient-to-br from-[#161616] to-[#1b1411] flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight mb-4">
                Why LA Investors Use a Dedicated Rental Listing Agent
              </h3>
              <p className="text-sm text-white/55 leading-relaxed mb-6">
                A vacancy or poor tenant match can cost far more than a leasing fee. This process
                is designed to protect your time, reduce leasing friction, and improve placement quality.
              </p>
              <ul className="space-y-3">
                {[
                  "Qualified exposure across MLS plus major rental platforms",
                  "Hands-off inquiry and showing management",
                  "Multi-layer tenant vetting before lease execution",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/65">
                    <ShieldCheck className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-300 text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-amber-200 transition-colors"
              >
                Get My Rent Plan <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                Schedule Leasing Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container">
          <span className="section-label block mb-4">Section 1 - My Proven 6-Part Leasing System</span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-10">
            Full-Service Rental Listing Process for
            <span className="font-light"> Los Angeles Owners</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategyItems.map((item, i) => (
              <div key={item.title} className="folio-frame p-6 bg-[#161616]">
                <item.icon className="w-5 h-5 text-cyan-300 mb-3" />
                <p className="text-xs tracking-[0.15em] uppercase text-silver mb-3">
                  {(i + 1).toString().padStart(2, "0")} -
                </p>
                <h3 className="text-xl font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#0e0e0e]">
        <div className="container">
          <span className="section-label block mb-4">Section 2 - Tenant Screening Gold Standard</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="folio-frame p-7 bg-[#161616]">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
                alt="Agent reviewing tenant applications"
                className="w-full h-52 object-cover mb-5"
              />
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-4">
                Not all tenants are created equal.
              </h2>
              <p className="text-sm text-white/55 leading-relaxed">
                A bad tenant can create lost rent, legal expenses, and property damage.
                Screening here is designed to surface the full picture beyond algorithm-only checks.
              </p>
            </div>
            <div className="folio-frame p-7 bg-[#161616]">
              <ol className="space-y-4">
                {[
                  "Credit and background check against strict benchmarks",
                  "Income verification at 3x monthly rent minimum",
                  "Rental history review with direct landlord reference calls",
                  "Personal reference checks to confirm character and reliability",
                  "Face-to-face interview before final recommendation",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-300 text-black text-xs font-semibold shrink-0">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container">
          <span className="section-label block mb-4">Section 3 - How It Stacks Up</span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="folio-frame p-6 bg-[#161616]">
              <p className="text-xs tracking-[0.15em] uppercase text-white/45 mb-4">Doing It Yourself</p>
              {[
                "Hours of inquiry management",
                "Limited listing exposure",
                "Shallow screening process",
                "Self-managed showings",
                "Legal and lease risk on owner",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-white/55 mb-2">
                  <CircleX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="folio-frame p-6 bg-emerald-300/15 border-emerald-300/40">
              <p className="text-xs tracking-[0.15em] uppercase text-silver mb-4">Working With Me</p>
              {[
                "All inquiries handled for you",
                "MLS + 300+ site syndication",
                "5-layer tenant screening",
                "Showings fully managed",
                "Pay only when rented",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-white/80 mb-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="folio-frame p-6 bg-[#161616]">
              <p className="text-xs tracking-[0.15em] uppercase text-white/45 mb-4">Property Management Co.</p>
              {[
                "8% to 12% monthly management fees",
                "Additional leasing fees",
                "Maintenance markups",
                "Long-term contracts",
                "Fees even when vacant",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-white/55 mb-2">
                  <CircleX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#0e0e0e]">
        <div className="container">
          <div className="folio-frame p-8 lg:p-12 bg-gradient-to-r from-[#1c1710] via-[#1a1a1a] to-[#102018] text-center">
            <Star className="w-6 h-6 text-amber-300 mx-auto mb-4" />
            <p className="text-xs tracking-[0.18em] uppercase text-silver mb-4">Ready to Get Your Unit Rented?</p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              The Most Hands-Off Way to Lease
              <span className="font-light"> Your LA Rental Property</span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto mb-8">
              Whether you own one unit or a portfolio, this leasing system is built for speed, quality,
              and no-upfront-cost execution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-300 text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-amber-200 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Book a Call
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact for Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            FAQ: Los Angeles Rental Listing Agent Services
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.q} className="folio-frame p-6 bg-[#161616]">
                <h3 className="text-base font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
