/*
 * THE BLACK FOLIO — Individual Blog Post Page
 * AEO-optimized: Article schema, FAQ schema, breadcrumb schema
 * Date-gated: posts only render on/after their publishDate
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getBreadcrumbSchema, getFAQSchema } from "@/components/SEO";
import { getPublishedPost, getPublishedPosts } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function getArticleSchema(post: {
  title: string;
  metaDescription: string;
  publishDate: string;
  image: string;
  imageAlt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    image: post.image,
    author: {
      "@type": "Person",
      name: "Ryan Kleczynski",
      url: "https://ryanklosangeles.com/about",
      jobTitle: "Real Estate Agent, DRE #02402858",
      worksFor: {
        "@type": "Organization",
        name: "Keller Williams LA",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Ryan K Real Estate",
      url: "https://ryanklosangeles.com",
    },
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPublishedPost(slug ?? "");
  const allPublished = getPublishedPosts();

  if (!post) {
    return (
      <div className="min-h-screen bg-[#111111]">
        <Navigation />
        <div className="container pt-48 pb-32 text-center">
          <p className="section-label mb-4">Not Found</p>
          <h1 className="text-3xl font-bold mb-6">This post isn't available yet.</h1>
          <p className="text-white/40 mb-10">
            Check back on the scheduled publish date, or browse posts that are live now.
          </p>
          <Link href="/blog">
            <span className="inline-block px-6 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors cursor-pointer">
              ← Back to Blog
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const canonical = `https://ryanklosangeles.com/blog/${post.slug}`;
  const related = allPublished.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={canonical}
        ogImage={post.image}
        schema={[
          getArticleSchema(post),
          getFAQSchema(post.faqs),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "Blog", url: "https://ryanklosangeles.com/blog" },
            { name: post.title, url: canonical },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero image */}
      <div className="relative w-full h-[45vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
      </div>

      {/* Article header */}
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-2xl mx-auto -mt-16 relative z-10 mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-1 text-[0.6rem] tracking-wider uppercase bg-white/10 text-white/70">
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-xs text-white/35">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {post.displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Ryan Kleczynski · Keller Williams LA
            </span>
          </div>
        </motion.div>

        <div className="hairline mb-12" />

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* FAQ section — AEO structured */}
        {post.faqs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-2xl mx-auto mb-20"
          >
            <div className="hairline mb-10" />
            <span className="section-label block mb-6">Frequently Asked Questions</span>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i} className="folio-frame p-6 bg-[#161616]">
                  <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* End CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="hairline mb-10" />
          <div className="folio-frame p-8 lg:p-12 bg-[#161616] text-center">
            <span className="section-label block mb-4">Work With Ryan</span>
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight mb-3">
              Ready to Talk Numbers?
            </h2>
            <p className="text-white/45 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
              Book a complimentary 15-minute conversation. No pitch — just a clear picture of
              what your property is worth and what your next move looks like.
            </p>
            <Link href="/contact">
              <span className="inline-block px-8 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-colors cursor-pointer">
                Book a Free Consultation
              </span>
            </Link>
            <p className="text-white/25 text-xs mt-4">
              Ryan Kleczynski · Keller Williams LA · DRE #02402858
            </p>
          </div>
        </motion.div>

        {/* Author bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="flex gap-4 items-start p-6 folio-frame bg-[#161616]">
            <div className="flex-1">
              <p className="text-xs font-semibold text-white mb-1">Ryan Kleczynski</p>
              <p className="text-xs text-white/40 leading-relaxed">
                Real estate agent at Keller Williams LA · DRE #02402858 · Specializing in West LA
                investor strategy, 1031 exchanges, and relocation buyers from Chicago and Scottsdale.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-2xl mx-auto mb-24">
            <div className="hairline mb-10" />
            <span className="section-label block mb-6">More from the Blog</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <div className="group folio-frame bg-[#161616] overflow-hidden cursor-pointer h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-[0.6rem] tracking-wider uppercase text-white/40 mb-1">
                        {r.category}
                      </span>
                      <p className="text-xs font-semibold text-white group-hover:text-silver transition-colors leading-snug">
                        {r.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="max-w-2xl mx-auto mb-16">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Market Intelligence
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
