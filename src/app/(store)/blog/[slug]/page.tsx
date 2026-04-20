// Route: /blog/[slug]
// Single article — magazine-style layout with reading progress, drop
// caps, pull quotes, and related posts. Statically generated for every
// known slug at build time via generateStaticParams.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
  formatPostDate,
} from "@/lib/blog-posts";
import { ArticleBody } from "@/components/blog/article-body";
import { ReadingProgress } from "@/components/blog/reading-progress";

interface ArticleProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every known post slug at build time. */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

const SITE_URL = "https://zerowastesimplified.com";

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  /* Article schema — lets Google show author, date, and hero image in
     SERP rich results. BreadcrumbList schema mirrors the visible trail. */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Zero Waste Simplified",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ReadingProgress />

      <article>
        {/* Header */}
        <header className="bg-white px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-[12.5px] text-text-secondary">
              <Link
                href="/"
                className="transition-colors hover:text-primary"
              >
                Home
              </Link>
              <span className="text-neutral-300">/</span>
              <Link
                href="/blog"
                className="transition-colors hover:text-primary"
              >
                Journal
              </Link>
              <span className="text-neutral-300">/</span>
              <span className="font-medium text-primary">{post.category}</span>
            </nav>

            <p className="mb-3 font-heading text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent">
              {post.category}
            </p>
            <h1 className="font-serif text-4xl font-semibold italic leading-[1.1] text-primary sm:text-5xl lg:text-[56px]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] text-text-secondary">
              <span className="font-heading font-bold uppercase tracking-[0.06em] text-primary">
                {post.author}
              </span>
              <span className="text-text-secondary/40">&middot;</span>
              <span>{formatPostDate(post.date)}</span>
              <span className="text-text-secondary/40">&middot;</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="bg-white pb-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <ArticleBody blocks={post.body} />
          </div>
        </div>

        {/* Author byline */}
        <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:p-8">
            <p className="mb-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
              Written by
            </p>
            <p className="font-serif text-2xl font-semibold italic text-primary">
              {post.author}
            </p>
            <p className="mt-2 text-[14.5px] leading-[1.7] text-text-secondary">
              Part of the Zero Waste Simplified team. We write about the
              products, suppliers, and small daily habits that shape a
              plastic-free home.
            </p>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-cream px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              Keep Reading
            </div>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                      {p.category}
                    </p>
                    <h3 className="font-serif text-xl font-semibold italic leading-snug text-primary transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <div className="mt-auto pt-4 text-[11.5px] text-text-secondary">
                      {p.readTime} min read
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
