/*
 * THE BLACK FOLIO — Neighborhood Quick Facts (AEO)
 * ----------------------------------------------------------------------------
 * Discrete, scannable, source-cited market facts per neighborhood. Designed
 * specifically for AI search engines (Perplexity, ChatGPT, Gemini, Google AI
 * Overviews) which preferentially cite pages presenting verifiable numbers in
 * a structured, dated block rather than buried in prose.
 *
 * Each entry is dated and sourced. When you refresh the data, also bump
 * `dataAsOf`. Do not ship undated numbers — AEO citations rely on freshness.
 *
 * Sources:
 *  - CRMLS / The MLS sold + active data, pulled by Ryan K Real Estate
 *  - Walk Score® (walkscore.com) — neighborhood-centroid score
 *  - $/sqft = trailing 90-day median sold $ per livable sqft (SFR + condo)
 *  - Median DOM = trailing 90-day median days on market (active to pending)
 *
 * Numbers below were compiled by Ryan Kleczynski, Keller Williams, in
 * Q1 2026 from the above sources. Update the constants and `dataAsOf` when
 * you refresh.
 * ----------------------------------------------------------------------------
 */

export interface NeighborhoodQuickFacts {
  /** Slug matches the route param in /neighborhoods/:slug */
  slug: string;
  /** Median sold price across SFR + condo, trailing 90 days. */
  medianPrice: string;
  /** Median days on market across active-to-pending, trailing 90 days. */
  medianDom: string;
  /** Median sold $ per livable sqft, trailing 90 days. */
  pricePerSqft: string;
  /** Walk Score® for the neighborhood centroid (0–100). */
  walkScore: string;
  /** ISO date the snapshot was compiled. Bump every refresh. */
  dataAsOf: string;
  /** Short, human-readable source line — shown to readers and AI engines. */
  source: string;
}

export const NEIGHBORHOOD_QUICK_FACTS: Record<string, NeighborhoodQuickFacts> = {
  brentwood: {
    slug: "brentwood",
    medianPrice: "$3,200,000",
    medianDom: "42 days",
    pricePerSqft: "$1,180 / sqft",
    walkScore: "62 / 100 (Somewhat Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
  "santa-monica": {
    slug: "santa-monica",
    medianPrice: "$2,800,000",
    medianDom: "35 days",
    pricePerSqft: "$1,340 / sqft",
    walkScore: "83 / 100 (Very Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
  westwood: {
    slug: "westwood",
    medianPrice: "$1,800,000",
    medianDom: "38 days",
    pricePerSqft: "$905 / sqft",
    walkScore: "78 / 100 (Very Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
  "century-city": {
    slug: "century-city",
    medianPrice: "$1,500,000",
    medianDom: "45 days",
    pricePerSqft: "$1,050 / sqft",
    walkScore: "81 / 100 (Very Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
  palms: {
    slug: "palms",
    medianPrice: "$950,000",
    medianDom: "28 days",
    pricePerSqft: "$735 / sqft",
    walkScore: "82 / 100 (Very Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
  sawtelle: {
    slug: "sawtelle",
    medianPrice: "$1,100,000",
    medianDom: "32 days",
    pricePerSqft: "$870 / sqft",
    walkScore: "86 / 100 (Very Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
  venice: {
    slug: "venice",
    medianPrice: "$2,100,000",
    medianDom: "40 days",
    pricePerSqft: "$1,210 / sqft",
    walkScore: "84 / 100 (Very Walkable)",
    dataAsOf: "2026-Q1",
    source: "CRMLS sold data (trailing 90 days) + Walk Score®, compiled by Ryan K Real Estate",
  },
};

/** Convenience accessor used by NeighborhoodDetail. Returns undefined if unknown. */
export function getNeighborhoodQuickFacts(slug: string | undefined): NeighborhoodQuickFacts | undefined {
  if (!slug) return undefined;
  return NEIGHBORHOOD_QUICK_FACTS[slug];
}
