/*
 * THE BLACK FOLIO — Neighborhood Quick Facts Block (AEO)
 * ----------------------------------------------------------------------------
 * AI-search-optimized "Quick Facts" module for /neighborhoods/:slug pages.
 *
 * Why this exists:
 *   AI engines (Perplexity, Google AI Overviews, ChatGPT, Gemini) preferentially
 *   cite neighborhood pages that expose discrete, verifiable, dated facts in a
 *   scannable block — not facts buried in prose. Sawtelle and other West LA
 *   neighborhood pages had been losing position in AEO results because they
 *   read as essays. This component fixes that.
 *
 * What it renders:
 *   - Median sale price
 *   - Median days on market
 *   - $ / sqft (trailing 90-day median)
 *   - Walk Score®
 *   - Source line + "as of" date (both visible to humans and embedded in
 *     a Dataset / SpecialAnnouncement-style JSON-LD via the parent if desired)
 *
 * Design notes:
 *   - Uses the existing folio-frame + silver text utility classes already in
 *     the design system (see index.css). No new tokens.
 *   - Definition list (<dl>) markup for semantic correctness — search and AI
 *     parsers extract <dt>/<dd> pairs reliably.
 *   - The data is passed in as props so the parent owns sourcing/freshness.
 * ----------------------------------------------------------------------------
 */
import { Calendar } from "lucide-react";
import type { NeighborhoodQuickFacts as Facts } from "@/data/neighborhoodQuickFacts";

interface Props {
  neighborhoodName: string;
  facts: Facts;
}

export default function NeighborhoodQuickFacts({ neighborhoodName, facts }: Props) {
  const items: { label: string; value: string }[] = [
    { label: "Median sale price", value: facts.medianPrice },
    { label: "Median days on market", value: facts.medianDom },
    { label: "Price per sqft", value: facts.pricePerSqft },
    { label: "Walk Score®", value: facts.walkScore },
  ];

  return (
    <section
      aria-labelledby={`quick-facts-${facts.slug}`}
      className="folio-frame p-6 lg:p-8 bg-[#161616] mt-10"
    >
      <header className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-silver mb-2">
            Quick Facts
          </p>
          <h2
            id={`quick-facts-${facts.slug}`}
            className="text-xl lg:text-2xl font-bold tracking-tight"
          >
            {neighborhoodName} Real Estate at a Glance
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          <span>
            As of <time dateTime={facts.dataAsOf}>{facts.dataAsOf}</time>
          </span>
        </div>
      </header>

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
        {items.map((item) => (
          <div key={item.label} className="border-l border-white/10 pl-4">
            <dt className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-2">
              {item.label}
            </dt>
            <dd className="text-lg lg:text-xl font-semibold text-white">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-xs text-white/40 mt-6 leading-relaxed">
        <span className="text-white/60 font-medium">Source:</span> {facts.source}.
        Median sale price and days on market reflect trailing 90-day closed
        sales across single-family and condo inventory inside the {neighborhoodName} boundary.
        Walk Score® is a registered trademark of Walk Score and reflects the
        neighborhood centroid.
      </p>
    </section>
  );
}
