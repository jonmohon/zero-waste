/**
 * ArticleBody — renders a typed `Block[]` body from `lib/blog-posts.ts`
 * into an editorial article layout. Adds a drop cap to the first
 * paragraph and styles pull quotes with an accent-green left border.
 *
 * Server component — pure projection from data to markup.
 *
 * @param blocks - typed body blocks (paragraph, h2, quote, image, list)
 */
import Image from "next/image";
import type { Block } from "@/lib/blog-posts";

interface ArticleBodyProps {
  blocks: Block[];
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  /* The first paragraph in the body gets a drop cap; downstream paragraphs
     render normally. We track the first-paragraph index so the renderer
     branches once instead of carrying state through every block. */
  const firstParagraphIdx = blocks.findIndex((b) => b.type === "p");

  return (
    <div className="space-y-7">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={i}
                className={
                  i === firstParagraphIdx
                    ? "first-paragraph text-[17px] leading-[1.85] text-text-secondary"
                    : "text-[17px] leading-[1.85] text-text-secondary"
                }
              >
                {i === firstParagraphIdx ? (
                  <>
                    <span className="float-left mr-2 mt-1 font-serif text-6xl font-semibold italic leading-[0.8] text-primary sm:text-7xl">
                      {block.text.charAt(0)}
                    </span>
                    {block.text.slice(1)}
                  </>
                ) : (
                  block.text
                )}
              </p>
            );

          case "h2":
            return (
              <h2
                key={i}
                className="mt-12 font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl"
              >
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-4 border-accent bg-surface-sage/30 py-6 pl-6 pr-4 sm:my-12 sm:pl-8"
              >
                <p className="font-serif text-2xl font-semibold italic leading-snug text-primary sm:text-3xl">
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.cite && (
                  <footer className="mt-4 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                    &mdash; {block.cite}
                  </footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={i} className="my-10">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-[12.5px] italic text-text-secondary">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            return (
              <ul key={i} className="space-y-3 pl-2">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[16.5px] leading-[1.75] text-text-secondary"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
