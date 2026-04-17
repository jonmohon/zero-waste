/**
 * FoundersLetter — personal first-person letter from the founder, styled
 * like a stationery card with a handwritten signature SVG. Used near the
 * top of the About page to set a human, non-corporate tone before the
 * mission/values blocks.
 *
 * All bracketed copy below is placeholder for the client to replace.
 *
 * Server component — pure presentation.
 */
export function FoundersLetter() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          <span className="h-0.5 w-7 rounded-full bg-accent" />
          A Letter From Our Founder
          <span className="h-0.5 w-7 rounded-full bg-accent" />
        </div>

        {/* Letter card */}
        <div className="relative rounded-2xl bg-white px-8 py-10 shadow-[0_8px_32px_rgba(26,43,28,0.08)] sm:px-12 sm:py-14">
          <div className="absolute left-8 top-8 font-serif text-5xl italic leading-none text-accent/20">
            &ldquo;
          </div>

          <p className="mb-6 mt-3 text-center font-serif text-2xl italic leading-snug text-primary sm:text-3xl">
            [Add a 1&ndash;2 sentence opening line here &mdash; the mission
            you want this letter to anchor to.]
          </p>

          <div className="mx-auto mb-8 h-[2px] w-12 rounded-full bg-accent" />

          <div className="space-y-4 text-[15px] leading-[1.85] text-text-secondary">
            <p>
              [Paragraph 1 &mdash; how the store started. A formative
              moment, an observation, a frustration that pushed you to
              build this. 3&ndash;4 sentences.]
            </p>
            <p>
              [Paragraph 2 &mdash; what makes your approach different.
              Sourcing, packaging, philosophy. Be specific where you can.]
            </p>
            <p>
              [Paragraph 3 &mdash; why it matters. The bigger picture
              behind the product decisions.]
            </p>
            <p>[Closing line &mdash; warm, direct, no marketing voice.]</p>
          </div>

          {/* Signature */}
          <div className="mt-10 flex flex-col items-start gap-2">
            <SignatureSvg />
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              [Founder Name]
            </p>
            <p className="text-[11px] text-text-secondary">
              [Title &mdash; e.g. Founder &amp; Owner]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * SignatureSvg — handwritten-style signature SVG. Drawn in cursive
 * single-stroke paths so it scales cleanly and looks like a real signature
 * without needing a raster image. Will be replaced by the founder's actual
 * signature when provided.
 */
function SignatureSvg() {
  return (
    <svg
      width="160"
      height="60"
      viewBox="0 0 160 60"
      fill="none"
      stroke="#1a2b1c"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 32 Q 12 14, 22 24 T 38 32 Q 44 38, 36 44 Q 28 50, 32 36 Q 38 22, 50 30 Q 60 38, 56 26" />
      <path d="M62 30 Q 70 18, 76 28 Q 82 38, 88 26 Q 94 16, 100 28 Q 106 40, 112 28" />
      <path d="M118 26 Q 126 14, 132 26 Q 138 38, 146 24 Q 154 12, 152 30" />
      <path d="M14 48 L 150 48" stroke="#4aaa42" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}
