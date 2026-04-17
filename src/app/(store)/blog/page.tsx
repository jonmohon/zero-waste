// Route: /blog
// Blog listing — featured (latest) post + grid of remaining posts.
// Pure static content from lib/blog-posts.ts; no Medusa calls.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Practical guides, swap stories, and supplier features from the Zero Waste Simplified team.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-accent" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
              The Journal
            </span>
          </div>
          <h1 className="font-serif text-5xl font-semibold italic leading-[1.05] text-white drop-shadow-md sm:text-6xl lg:text-7xl">
            Stories &amp; swaps.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Practical guides for living with less plastic, supplier features,
            and the occasional opinion on consumer waste.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              Latest
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="mb-3 font-heading text-[10.5px] font-bold uppercase tracking-[0.18em] text-accent">
                  {featured.category}
                </p>
                <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary transition-colors group-hover:text-accent sm:text-4xl lg:text-[42px]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.75] text-text-secondary">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-[12px] text-text-secondary">
                  <span className="font-heading font-semibold uppercase tracking-[0.06em]">
                    {featured.author}
                  </span>
                  <span className="text-text-secondary/40">&middot;</span>
                  <span>{formatPostDate(featured.date)}</span>
                  <span className="text-text-secondary/40">&middot;</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <span className="mt-6 inline-flex w-fit items-center gap-2 font-heading text-[12px] font-bold uppercase tracking-[0.08em] text-primary transition-colors group-hover:text-accent">
                  Read the article
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              More from the Journal
            </div>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                      {post.category}
                    </p>
                    <h3 className="font-serif text-xl font-semibold italic leading-snug text-primary transition-colors group-hover:text-accent sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-text-secondary">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-5 text-[11.5px] text-text-secondary">
                      <span>{formatPostDate(post.date)}</span>
                      <span className="text-text-secondary/40">&middot;</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter strip */}
      <section className="bg-surface-sage/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl">
            Get new posts in your inbox
          </h2>
          <p className="mt-3 text-[15px] text-text-secondary">
            One email a month. Practical swaps, supplier stories, no spam.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-neutral-200 bg-white px-5 py-3.5 text-sm text-primary placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:max-w-sm"
            />
            <button
              type="button"
              className="rounded-xl bg-primary px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
