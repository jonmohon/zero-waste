/**
 * JournalPreview — three most-recent blog posts shown as cards on the
 * homepage to drive readers into the journal. Server component — reads
 * directly from `lib/blog-posts.ts` at render time.
 */
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/blog-posts";

export function JournalPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              From the Journal
            </div>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
              Reading worth your time
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-heading text-[12px] font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-accent"
          >
            All posts
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-cream shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]"
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
                <h3 className="font-serif text-xl font-semibold italic leading-snug text-primary transition-colors group-hover:text-accent sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-[14px] leading-[1.7] text-text-secondary">
                  {p.excerpt}
                </p>
                <div className="mt-auto pt-5 text-[11.5px] text-text-secondary">
                  {formatPostDate(p.date)} &middot; {p.readTime} min read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
