import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Download, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getBreadcrumbSchema, getFAQSchema, getWebPageSchema } from "@/components/SEO";
import type { InvestorPageData } from "@/data/investorPages";
import GetInTouchForm from "@/components/GetInTouchForm";

interface InvestorPageTemplateProps {
  page: InvestorPageData;
}

const BASE_URL = "https://westla.realestate";

export default function InvestorPageTemplate({ page }: InvestorPageTemplateProps) {
  const pageUrl = `${BASE_URL}/investors/${page.slug}`;
  const downloadLeadMagnet = () => {
    const content = [
      `${page.h1} — Investor Deal Snapshot`,
      "",
      "Practical Checklist:",
      ...page.takeawayItems.map((item, i) => `${i + 1}. ${item}`),
      "",
      "Strategy Prompts:",
      ...page.strategyPoints.map((item, i) => `${i + 1}. ${item}`),
      "",
      "Disclaimer: Educational content only. Verify assumptions with licensed legal/tax/financial professionals.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${page.slug}-investor-deal-snapshot.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast.success("Lead magnet downloaded.");
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title={page.title}
        description={page.metaDescription}
        canonical={pageUrl}
        schema={[
          getWebPageSchema(page.title, page.metaDescription, pageUrl),
          getFAQSchema(page.faqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "Investors", url: `${BASE_URL}/investors` },
            { name: page.h1, url: pageUrl },
          ]),
        ]}
      />

      <Navigation />

      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20">
        <div className="container">
          <span className="section-label block mb-4">Investor Guide</span>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-5">{page.h1}</h1>
          <p className="text-lg text-white/50 max-w-3xl leading-relaxed">{page.intro}</p>
          <p className="text-sm text-white/35 mt-4">Built for: {page.audience}</p>
        </div>
      </section>

      <div className="hairline" />

      <section className="py-14 lg:py-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="folio-frame p-7 bg-[#161616]">
            <h2 className="text-2xl font-semibold tracking-tight mb-5">Market Strategy Framework</h2>
            <ul className="space-y-3">
              {page.strategyPoints.map((point) => (
                <li key={point} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-silver mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="folio-frame p-7 bg-[#161616]">
            <h2 className="text-2xl font-semibold tracking-tight mb-5">{page.takeawayTitle}</h2>
            <ul className="space-y-3 mb-6">
              {page.takeawayItems.map((item) => (
                <li key={item} className="text-white/60 text-sm leading-relaxed border-b border-white/10 pb-2">
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={downloadLeadMagnet}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-xs font-semibold tracking-[0.12em] uppercase hover:bg-white/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Deal Snapshot
            </button>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#0e0e0e]">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Lead Magnet + Conversion</h2>
          <p className="text-white/50 max-w-3xl mb-8">
            Request off-market opportunities and get a practical investment snapshot you can use during underwriting.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="folio-frame p-7 bg-[#161616]">
              <h3 className="text-xl font-semibold mb-4">Request Off-Market Deals</h3>
              <p className="text-sm text-white/45 mb-5">Share your buy box and we&apos;ll match opportunities when available.</p>
              <GetInTouchForm />
            </div>

            <div className="folio-frame p-7 bg-[#161616] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Book an Investor Consult</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-6">
                  Get a practical 1:1 review of your goals, buy box, and deal pipeline with market-specific guidance.
                </p>
                <p className="text-xs text-white/35">Primary conversion goals: off-market request + consult booking.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors self-start">
                Book Consult <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#0e0e0e]">
        <div className="container">
          <div className="folio-frame p-7 bg-[#161616]">
            <h2 className="text-2xl font-semibold tracking-tight mb-5">Google Search Console Quick Setup</h2>
            <ul className="space-y-2 text-sm text-white/55">
              <li>1) Add property in GSC (Domain property preferred).</li>
              <li>2) Verify ownership via DNS TXT record.</li>
              <li>3) Submit sitemap: <span className="text-silver">https://westla.realestate/sitemap.xml</span>.</li>
              <li>4) Request indexing for top investor pages first.</li>
              <li>5) Monitor queries, CTR, and coverage weekly.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.q} className="folio-frame p-6 bg-[#161616]">
                <h3 className="text-base font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="folio-frame p-6 bg-[#161616] border border-amber-200/20">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-200 mt-0.5" />
              <p className="text-xs text-white/55 leading-relaxed">
                Compliance note: This page is educational and not legal/tax/financial advice. Market conditions and returns vary. Verify all assumptions with licensed professionals and apply brokerage/fair-housing/DRE disclosures as required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
