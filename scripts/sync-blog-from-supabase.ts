/* eslint-disable no-console */
/**
 * Build-time sync: pull all blog posts from Supabase and write
 * client/src/data/blogPosts.ts. Runs before `vite build`.
 *
 * Reads SUPABASE_URL + SUPABASE_ANON_KEY from env.
 *
 * Pulls BOTH 'published' and 'scheduled' posts so the site can keep
 * its existing date-gating (publishDate <= today) — that way the cron
 * publishing the post is what flips status, but the site doesn't strictly
 * need the cron to fire to make a post visible if its publishDate has hit.
 */
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "[sync-blog] Missing SUPABASE_URL / SUPABASE_ANON_KEY env vars — aborting build sync.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface SupabasePost {
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  category: string | null;
  publish_date: string;
  display_date: string | null;
  read_time: string | null;
  image_url: string | null;
  image_alt: string | null;
  faqs: { q: string; a: string }[] | null;
  content: string | null;
  status: string;
}

async function main() {
  console.log("[sync-blog] Fetching blog posts from Supabase…");
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "slug,title,meta_title,meta_description,excerpt,category,publish_date,display_date,read_time,image_url,image_alt,faqs,content,status",
    )
    .in("status", ["published", "scheduled"])
    .order("publish_date", { ascending: true });

  if (error) {
    console.error(`[sync-blog] Supabase error: ${error.message}`);
    process.exit(1);
  }

  const posts = (data ?? []) as SupabasePost[];

  const mapped = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    metaTitle: p.meta_title ?? p.title,
    metaDescription: p.meta_description ?? "",
    excerpt: p.excerpt ?? "",
    category: p.category ?? "",
    publishDate: p.publish_date,
    displayDate: p.display_date ?? "",
    readTime: p.read_time ?? "",
    image: p.image_url ?? "",
    imageAlt: p.image_alt ?? "",
    faqs: p.faqs ?? [],
    content: p.content ?? "",
  }));

  const fileBody = `/*
 * THE BLACK FOLIO — Blog Post Data
 * AEO-optimized content with inline CTAs | Ryan K Real Estate
 *
 * AUTO-SYNCED FROM SUPABASE AT BUILD TIME. DO NOT EDIT MANUALLY.
 * Edit posts via the social-dashboard app at /blog instead.
 *
 * Date-gated: post appears when publishDate <= today (browser-local).
 */

export interface BlogPostData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishDate: string;
  displayDate: string;
  readTime: string;
  image: string;
  imageAlt: string;
  faqs: { q: string; a: string }[];
  content: string;
}

export const blogPosts: BlogPostData[] = ${JSON.stringify(mapped, null, 2)};

/** Returns only posts whose publishDate is today or earlier. */
export function getPublishedPosts(): BlogPostData[] {
  const today = new Date().toISOString().split("T")[0];
  return blogPosts.filter((p) => p.publishDate <= today);
}

/** Returns a single post by slug, or undefined if not yet published. */
export function getPublishedPost(slug: string): BlogPostData | undefined {
  const today = new Date().toISOString().split("T")[0];
  return blogPosts.find((p) => p.slug === slug && p.publishDate <= today);
}
`;

  const outPath = resolve(__dirname, "../client/src/data/blogPosts.ts");
  writeFileSync(outPath, fileBody, "utf-8");
  console.log(
    `[sync-blog] ✓ Wrote ${mapped.length} posts (${
      mapped.filter((p) => {
        const today = new Date().toISOString().slice(0, 10);
        return p.publishDate <= today;
      }).length
    } currently visible) → ${outPath}`,
  );
}

main().catch((err) => {
  console.error("[sync-blog]", err);
  process.exit(1);
});
