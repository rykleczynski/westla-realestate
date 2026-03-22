/*
 * THE BLACK FOLIO — SEO Component
 * JSON-LD structured data, Open Graph, and meta tags
 * Supports RealEstateAgent, LocalBusiness, FAQPage schemas
 */
import { useEffect } from "react";

export const DEFAULT_SITE_URL = "https://ryanklosangeles.com";

export function getSiteUrl() {
  const envUrl = (import.meta as any).env?.VITE_SITE_URL as string | undefined;
  const normalizedEnvUrl = envUrl?.trim().replace(/\/+$/, "");
  if (normalizedEnvUrl) return normalizedEnvUrl;
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return DEFAULT_SITE_URL;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: object | object[];
}

export default function SEO({ title, description, canonical, ogImage, schema }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Ryan K Real Estate`;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMeta("description", description);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", "website", true);
    if (ogImage) updateMeta("og:image", ogImage, true);
    if (canonical) {
      updateMeta("og:url", canonical, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Twitter card
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    if (ogImage) updateMeta("twitter:image", ogImage);

    // JSON-LD Schema
    if (schema) {
      // Remove old schema
      document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());

      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-schema", "true");
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
    };
  }, [title, description, canonical, ogImage, schema]);

  return null;
}

/* Pre-built schema generators */

export function getLocalBusinessSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Ryan K Real Estate",
    "description":
      "Real estate team led by Ryan Kleczynski, investor-focused agent serving West Los Angeles, Long Beach, Gardena, Inglewood, and surrounding markets with acquisition strategy, off-market sourcing, 1031 guidance, and leasing support.",
    "url": siteUrl,
    "telephone": "(224)-249-1004",
    "email": "rkleczynski@kw.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West Los Angeles",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90025",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0407,
      "longitude": -118.4328
    },
    "areaServed": [
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "City", "name": "Santa Monica" },
      { "@type": "City", "name": "Venice" },
      { "@type": "City", "name": "Culver City" },
      { "@type": "City", "name": "Beverly Hills" },
      { "@type": "City", "name": "Westwood" },
      { "@type": "City", "name": "Long Beach" },
      { "@type": "City", "name": "Gardena" },
      { "@type": "City", "name": "Inglewood" },
      { "@type": "AdministrativeArea", "name": "West Los Angeles" },
      { "@type": "AdministrativeArea", "name": "South Bay" },
    ],
    "priceRange": "$$$",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "16:00" }
    ],
    "sameAs": []
  };
}

export function getFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };
}

export function getServiceSchema(input: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  areaServed?: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": input.name,
    "description": input.description,
    "serviceType": input.serviceType,
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Ryan K Real Estate",
      "url": siteUrl,
    },
    ...(input.areaServed && {
      "areaServed": { "@type": "City", "name": input.areaServed },
    }),
    "url": input.url,
  };
}

export function getWebPageSchema(name: string, description: string, url: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Ryan K Real Estate",
      "url": siteUrl
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/** ItemList for AI-friendly / SEO hub pages (city coverage, resources). */
export function getItemListSchema(input: { name: string; description: string; url: string; items: { name: string; url: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": input.name,
    "description": input.description,
    "url": input.url,
    "numberOfItems": input.items.length,
    "itemListElement": input.items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "WebPage",
        "name": item.name,
        "url": item.url,
      },
    })),
  };
}
