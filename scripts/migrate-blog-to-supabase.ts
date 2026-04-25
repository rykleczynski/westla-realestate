/* eslint-disable no-console */
/**
 * One-time migration: push existing blogPosts.ts into Supabase blog_posts.
 *
 * Run from westla-realestate2:
 *   npx tsx scripts/migrate-blog-to-supabase.ts
 *
 * Reads SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or anon key if RLS is off)
 * from your env (or pass them inline). Posts are upserted by slug, so it's
 * safe to run multiple times.
 */
import { createClient } from "@supabase/supabase-js";
import { blogPosts } from "../client/src/data/blogPosts.ts";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in env",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`Importing ${blogPosts.length} posts…`);

  for (const p of blogPosts) {
    const status = p.publishDate <= today ? "published" : "scheduled";
    const row = {
      slug: p.slug,
      title: p.title,
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      excerpt: p.excerpt,
      category: p.category,
      publish_date: p.publishDate,
      display_date: p.displayDate,
      read_time: p.readTime,
      image_url: p.image,
      image_alt: p.imageAlt,
      faqs: p.faqs,
      content: p.content,
      status,
      source: "manual",
    };
    const { error } = await supabase
      .from("blog_posts")
      .upsert(row, { onConflict: "slug" });
    if (error) {
      console.error(`  ✗ ${p.slug}: ${error.message}`);
    } else {
      console.log(`  ✓ ${p.slug} → ${status} (${p.publishDate})`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
