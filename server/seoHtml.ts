import { investorGeoPages, investorPages } from "../client/src/data/investorPages";

const SITE_ORIGIN = "https://ryanklosangeles.com";
const TITLE_SUFFIX = " | Ryan K Real Estate";

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

export type RouteSeo = {
  documentTitle: string;
  ogTitle: string;
  description: string;
  canonical: string;
};

function buildInvestorRouteMeta(): Map<string, RouteSeo> {
  const map = new Map<string, RouteSeo>();

  const add = (slug: string, title: string, metaDescription: string) => {
    const pathname = `/investors/${slug}`;
    map.set(pathname, {
      documentTitle: `${title}${TITLE_SUFFIX}`,
      ogTitle: title,
      description: metaDescription,
      canonical: `${SITE_ORIGIN}${pathname}`,
    });
  };

  for (const page of Object.values(investorPages)) {
    add(page.slug, page.title, page.metaDescription);
  }
  for (const page of investorGeoPages) {
    add(page.slug, page.title, page.metaDescription);
  }

  add(
    "west-la-investor-agent-coverage",
    "West LA, Long Beach & Inglewood Real Estate Investor Agent Coverage",
    "Investor-focused real estate agent coverage map: West Los Angeles, Long Beach, Gardena, Inglewood, and linked city investor hubs. Ryan Kleczynski | Ryan K Real Estate.",
  );
  add(
    "rental-listing-agent-los-angeles",
    "LA Rental Listing Agent for Investors",
    "Los Angeles rental listing agent for property owners and investors. Get full-service leasing, gold-standard tenant screening, and pay only after successful placement.",
  );

  return map;
}

function coreSeo(path: string, ogTitle: string, description: string): RouteSeo {
  const canonical = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  return {
    documentTitle: `${ogTitle}${TITLE_SUFFIX}`,
    ogTitle,
    description,
    canonical,
  };
}

/** Marketing + hub routes — keep in sync with each page's <SEO /> (Home, Investors, Buyers, etc.). */
const staticRouteSeo = new Map<string, RouteSeo>([
  [
    "/",
    coreSeo(
      "/",
      "West LA Real Estate | Homes, Investments, and Market Insights",
      "Explore West Los Angeles real estate opportunities for investors, buyers, and sellers across Brentwood, Santa Monica, Westwood, Century City, Palms, Sawtelle, Venice, and more.",
    ),
  ],
  [
    "/investors",
    coreSeo(
      "/investors",
      "Los Angeles Real Estate Investor Agent | West LA, Long Beach, Gardena & Inglewood",
      "Investor-focused real estate agent hub for Los Angeles: West LA, Long Beach, Gardena, Inglewood, and city-specific strategy pages, off-market requests, 1031 and multifamily resources.",
    ),
  ],
  [
    "/buyers",
    coreSeo(
      "/buyers",
      "First-Time Home Buyer Guide Los Angeles | West LA",
      "Step-by-step first-time buyer guide for Los Angeles with neighborhood insights, financing FAQs, and practical resources.",
    ),
  ],
  [
    "/sellers",
    coreSeo(
      "/sellers",
      "Sell Your Home in Los Angeles | Seller Strategy + Valuation",
      "Seller-focused Los Angeles real estate page with valuation tools, prep checklists, and market-informed selling strategy.",
    ),
  ],
  [
    "/contact",
    coreSeo(
      "/contact",
      "Contact West LA Real Estate Team | Book a Consult",
      "Contact our West LA real estate team for buying, selling, and investor support across Los Angeles neighborhoods.",
    ),
  ],
  [
    "/about",
    coreSeo(
      "/about",
      "About Ryan Kleczynski | West LA Real Estate",
      "Meet Ryan Kleczynski: West Los Angeles real estate with strategic insight, sharp negotiation, and investor-minded expertise for buyers, sellers, and investors.",
    ),
  ],
  [
    "/neighborhoods",
    coreSeo(
      "/neighborhoods",
      "West LA Neighborhood Guides | Santa Monica, Brentwood, Venice + More",
      "Explore West Los Angeles neighborhood guides with market snapshots, lifestyle highlights, and local real estate insights.",
    ),
  ],
  [
    "/blog",
    {
      documentTitle:
        "Los Angeles Real Estate Blog | Market Reports, Investor Insights, Buyer Guides | Ryan K Real Estate",
      ogTitle: "Los Angeles Real Estate Blog | Market Reports, Investor Insights, Buyer Guides",
      description:
        "Read Los Angeles real estate market reports, investor analysis, buyer guides, and seller strategy updates.",
      canonical: `${SITE_ORIGIN}/blog`,
    },
  ],
]);

/** Slugs must match NeighborhoodDetail `neighborhoodData` and sitemap.xml. */
const NEIGHBORHOOD_DISPLAY_NAMES: Record<string, string> = {
  brentwood: "Brentwood",
  "santa-monica": "Santa Monica",
  westwood: "Westwood",
  "century-city": "Century City",
  palms: "Palms",
  sawtelle: "Sawtelle",
  venice: "Venice",
};

function neighborhoodRouteSeo(pathname: string): RouteSeo | undefined {
  const prefix = "/neighborhoods/";
  if (!pathname.startsWith(prefix) || pathname === "/neighborhoods") return undefined;
  const slug = pathname.slice(prefix.length);
  const name = NEIGHBORHOOD_DISPLAY_NAMES[slug];
  if (!name) return undefined;
  const ogTitle = `${name} Real Estate Guide | West LA Neighborhood`;
  const description = `Explore ${name} real estate trends, pricing, lifestyle, schools, and investor-friendly neighborhood insights.`;
  return coreSeo(pathname, ogTitle, description);
}

function buildAllRouteSeo(): Map<string, RouteSeo> {
  const map = buildInvestorRouteMeta();
  staticRouteSeo.forEach((seo, path) => {
    map.set(path, seo);
  });
  return map;
}

const routeSeoByPath = buildAllRouteSeo();

/**
 * For known routes, inject title, description, canonical, and OG tags into the SPA shell
 * so crawlers see page-specific signals without waiting for React + useEffect.
 */
export function injectSeoIntoIndexHtml(html: string, pathname: string): string {
  const seo = routeSeoByPath.get(pathname) ?? neighborhoodRouteSeo(pathname);
  if (!seo) return html;

  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(seo.documentTitle)}</title>`);

  out = out.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
  );

  out = out.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(seo.ogTitle)}" />`,
  );

  out = out.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
  );

  if (/<meta property="og:url" /.test(out)) {
    out = out.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    );
  } else {
    out = out.replace(
      /<meta property="og:type" content="website" \/>/,
      `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    );
  }

  if (/<link rel="canonical"/.test(out)) {
    out = out.replace(
      /<link rel="canonical" href="[^"]*" *\/?>/,
      `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    );
  } else {
    out = out.replace(
      /<!-- canonical URL should be set dynamically per page -->/,
      `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    );
  }

  return out;
}
