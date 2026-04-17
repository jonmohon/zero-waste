/**
 * Static blog content for the journal.
 *
 * Why a TS file and not a CMS:
 *   The launch needed real, rich content fast. Storing posts as typed data
 *   gives us the fastest possible build and easy edits without standing up
 *   Sanity / Contentful / MDX tooling. Migrating to MDX or a headless CMS
 *   later is mechanical — every consumer reads through `getAllPosts()` /
 *   `getPostBySlug()`.
 *
 * Each post body is composed of typed `Block`s that the article renderer
 * understands (paragraph, heading, quote, image, list).
 */

/** A typed block within a post body — keeps the renderer simple. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] };

/** A single blog post. */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Display name only — author profile pages are out of scope. */
  author: string;
  /** ISO date string. */
  date: string;
  /** Estimated read time in minutes. */
  readTime: number;
  /** Hero image — wide aspect ratio works best (16:9 or wider). */
  heroImage: string;
  /** Body composed of typed blocks rendered by `<ArticleBody>`. */
  body: Block[];
}

/**
 * All published blog posts, newest first. Add new posts to the top.
 * Keep slugs URL-safe (kebab-case).
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-easy-swaps-to-cut-plastic-from-your-bathroom",
    title: "5 Easy Swaps to Cut Plastic from Your Bathroom",
    excerpt:
      "The bathroom is the single biggest source of household plastic. Here are five swaps anyone can make this month — no perfection required.",
    category: "Skin Care",
    author: "Maya Linden",
    date: "2026-04-09",
    readTime: 6,
    heroImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=85",
    body: [
      {
        type: "p",
        text: "If you opened your bathroom cabinet right now and counted the plastic bottles, tubes, and pumps inside, the number would probably surprise you. The average American throws away just over 21 kilograms of bathroom plastic every year — most of it travels less than a meter from sink to bin to landfill.",
      },
      {
        type: "p",
        text: "The good news: bathroom waste is the easiest place to start. The product cycles are short, the swaps are well-tested, and you'll see the difference in your trash within a week.",
      },
      {
        type: "h2",
        text: "1. Swap shampoo bottles for shampoo bars",
      },
      {
        type: "p",
        text: "A single shampoo bar replaces between two and three full-size 250ml bottles, and it lasts longer than people expect — most of our customers report 50 to 75 washes from a single bar. The trick is letting it dry between uses on a draining shelf or dish.",
      },
      {
        type: "quote",
        text: "We thought it would lather differently or feel weird. After two washes I forgot I'd ever used a bottle.",
        cite: "Erin S., Portland",
      },
      {
        type: "h2",
        text: "2. Trade your plastic toothbrush for bamboo",
      },
      {
        type: "p",
        text: "The American Dental Association recommends replacing your toothbrush every three to four months, which means each person sends roughly four toothbrushes to landfill every year. Bamboo handles compost in a backyard pile in two to four months. The bristles, made from BPA-free nylon, can be plucked out before composting.",
      },
      {
        type: "h2",
        text: "3. Switch from canned shaving cream to a soap bar",
      },
      {
        type: "p",
        text: "Pressurized shaving cream cans are notoriously hard to recycle and contain a long list of unnecessary additives. A dedicated shaving soap (or even a high-fat bar soap) gives a closer shave, lasts five to ten times longer, and skips the propellants entirely.",
      },
      {
        type: "h2",
        text: "4. Replace cotton rounds with washable rounds",
      },
      {
        type: "p",
        text: "Disposable cotton rounds are typically bleached, individually packaged, and thrown out after a single use. Reusable bamboo or organic cotton rounds wash with your laundry, dry overnight, and last for a year or more.",
      },
      {
        type: "h2",
        text: "5. Buy refillable lip balm",
      },
      {
        type: "p",
        text: "Lip balm is a deceptive culprit — small, but the per-gram plastic ratio is one of the worst in the bathroom. Refillable metal tins are heavier in the hand, last longer, and feel more intentional.",
      },
      {
        type: "p",
        text: "Pick one swap. Make it the next time you would have rebought the disposable version. That's it. The compound effect is what matters — not perfection.",
      },
    ],
  },
  {
    slug: "why-we-refuse-to-ship-anything-in-plastic",
    title: "Why We Refuse to Ship Anything in Plastic",
    excerpt:
      "Plastic-free shipping costs us roughly 18% more per order. Here's why we made the call anyway — and what it actually looks like behind the scenes.",
    category: "Sustainability",
    author: "James Okafor",
    date: "2026-03-22",
    readTime: 5,
    heroImage:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1600&q=85",
    body: [
      {
        type: "p",
        text: "When we started this store in 2019, the first decision we made was the one nobody saw: every order would ship without a single piece of plastic. No bubble wrap. No air pillows. No poly mailers. No tape with plastic backing. It sounds simple. It is not.",
      },
      {
        type: "h2",
        text: "What plastic-free shipping actually looks like",
      },
      {
        type: "p",
        text: "Our outer mailers are kraft paper sourced from FSC-certified mills. Inside, we use crinkle-paper void fill made from post-consumer recycled paper, and tape made from kraft with a natural rubber adhesive. Fragile items get wrapped in honeycomb paper — the stuff that looks like a paper version of bubble wrap.",
      },
      {
        type: "quote",
        text: "If we ship a plastic-free product in plastic packaging, we've defeated our own point.",
      },
      {
        type: "h2",
        text: "Why it costs more",
      },
      {
        type: "p",
        text: "Honeycomb paper is roughly 4x more expensive than bubble wrap by volume. Kraft mailers cost more than poly. Recycled-content tape isn't cheap. All in, plastic-free packaging adds about 18% to our per-order cost. We absorb most of that and let it show up as slightly higher product prices, not shipping fees.",
      },
      {
        type: "h2",
        text: "What this means for you",
      },
      {
        type: "p",
        text: "Every part of your order can go in your home compost or curbside paper recycling. Nothing in the box needs a special drop-off. If you ever receive an order with even a single piece of plastic, email us. We want to know.",
      },
    ],
  },
  {
    slug: "a-beginners-guide-to-bar-shampoo",
    title: "A Beginner's Guide to Bar Shampoo",
    excerpt:
      "How to pick the right bar for your hair type, how to lather it properly, and what to do in week two when your scalp adjusts.",
    category: "Hair Care",
    author: "Priya Anand",
    date: "2026-03-08",
    readTime: 7,
    heroImage:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=1600&q=85",
    body: [
      {
        type: "p",
        text: "Switching from bottled shampoo to a bar is one of the highest-impact swaps you can make. It's also the one most likely to make you doubt your decision around day six. This guide is the one we wish we had when we started.",
      },
      {
        type: "h2",
        text: "Choosing the right bar",
      },
      {
        type: "p",
        text: "Bar shampoos are formulated like solid shampoo, not like soap. The pH-balanced ones (most modern bars) won't strip color or trigger the dreaded scalp panic. Here's a quick guide:",
      },
      {
        type: "list",
        items: [
          "Fine or oily hair: look for clarifying bars with apple cider vinegar or rosemary",
          "Curly or coily hair: shea butter and coconut milk bars hold moisture",
          "Color-treated hair: pH-balanced 'gentle' or 'sulfate-free' formulas",
          "Dandruff-prone scalp: tea tree or charcoal bars",
        ],
      },
      {
        type: "h2",
        text: "How to actually lather",
      },
      {
        type: "p",
        text: "Wet your hair completely. Run the bar between your palms or directly along your scalp four or five times. Set the bar down, then massage your scalp with both hands. Most beginners under-lather — you want a rich foam at the roots before you rinse.",
      },
      {
        type: "h2",
        text: "The transition week",
      },
      {
        type: "p",
        text: "Around days four through ten, your scalp may feel waxy or heavy. This is the natural sebum re-balancing after years of detergent stripping. It always passes. A weekly apple cider vinegar rinse (one tablespoon to a cup of water) speeds the adjustment dramatically.",
      },
      {
        type: "quote",
        text: "Week two is when you'll know. After that, you'll never go back to bottles.",
        cite: "Maya, Hair Care Lead",
      },
      {
        type: "h2",
        text: "Storage matters more than people think",
      },
      {
        type: "p",
        text: "A bar that sits in standing water dies in two weeks. A bar on a draining dish lasts up to twelve. Buy a bamboo or stainless soap shelf — the small upfront cost more than pays for itself in extended bar life.",
      },
    ],
  },
  {
    slug: "how-beeswax-wraps-replaced-our-plastic-wrap",
    title: "How Beeswax Wraps Replaced Our Plastic Wrap, For Good",
    excerpt:
      "We tested every plastic wrap alternative on the market for six months. Here's what worked, what didn't, and what we use every day now.",
    category: "Kitchen",
    author: "James Okafor",
    date: "2026-02-20",
    readTime: 5,
    heroImage:
      "https://images.unsplash.com/photo-1610736703500-d8b1bea5ef85?w=1600&q=85",
    body: [
      {
        type: "p",
        text: "Plastic cling wrap was invented in 1933 and has barely changed since. It's also nearly impossible to recycle. Roughly 1.6 million miles of the stuff get used in American kitchens each year — enough to wrap the equator 64 times.",
      },
      {
        type: "h2",
        text: "What we tried",
      },
      {
        type: "list",
        items: [
          "Silicone stretch lids — great for bowls, useless for wrapping cheese",
          "Glass containers with seals — perfect for storage, but you can't wrap a half-eaten avocado",
          "Beeswax wraps — the closest one-to-one replacement we found",
          "Vegan plant-wax wraps — same idea as beeswax, slightly less tacky but better for vegans",
        ],
      },
      {
        type: "h2",
        text: "Why beeswax wraps work",
      },
      {
        type: "p",
        text: "The wax-coated cotton becomes pliable from your hand's warmth. You wrap, press, and release — the wax holds the shape. Wash in cool water with mild soap, hang to dry, and reuse for roughly a year.",
      },
      {
        type: "quote",
        text: "Three wraps replaced an entire roll of plastic wrap in our house in two weeks.",
      },
      {
        type: "h2",
        text: "What they're not for",
      },
      {
        type: "p",
        text: "Don't use them for raw meat (the wax doesn't sanitize between uses) or anything you need to microwave. For everything else — half-cut produce, cheese, sandwiches, bowl covers — they replace cling wrap completely.",
      },
    ],
  },
  {
    slug: "the-real-cost-of-disposable-razors",
    title: "The Real Cost of Disposable Razors",
    excerpt:
      "Two billion plastic razors hit US landfills every year. The math on switching to a safety razor is more compelling than most people realize.",
    category: "Bath & Body",
    author: "Sam Reyes",
    date: "2026-02-04",
    readTime: 4,
    heroImage:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1600&q=85",
    body: [
      {
        type: "p",
        text: "Disposable razors are a uniquely terrible product: a small piece of metal sandwiched in plastic and rubber, designed to be thrown out after a few uses. The EPA estimates Americans dispose of about two billion of them every year.",
      },
      {
        type: "h2",
        text: "The five-year cost comparison",
      },
      {
        type: "p",
        text: "A pack of four cartridge razors runs about $20. Most people use roughly 60 cartridges over five years — call it $300, plus the handles. A single stainless safety razor costs $30 to $50 once. A pack of 100 double-edged blades is $12 and lasts 18 months. Five-year math: $300 versus about $80.",
      },
      {
        type: "quote",
        text: "I switched mostly for the planet. I stayed for the closer shave.",
        cite: "Devon, customer since 2022",
      },
      {
        type: "h2",
        text: "How to start without nicking yourself",
      },
      {
        type: "p",
        text: "Hold the razor at a 30-degree angle, no pressure, short strokes. The weight of the head does the work. Most people grip too hard the first time — relax your hand and let it glide. Fifteen minutes of practice and it feels normal.",
      },
    ],
  },
  {
    slug: "behind-the-brand-where-our-soaps-come-from",
    title: "Behind the Brand: Where Our Soaps Come From",
    excerpt:
      "Most of our bar soaps are cold-processed by small-batch makers across the US. Here's a look at how they're made and how we choose them.",
    category: "Story",
    author: "Maya Linden",
    date: "2026-01-15",
    readTime: 6,
    heroImage:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=1600&q=85",
    body: [
      {
        type: "p",
        text: "Walk into a soap maker's workshop and the first thing that hits you is the scent: not perfume, but the layered, warm note of saponifying oils. We've spent the last four years visiting nearly every workshop that supplies our store, and the pattern is remarkably consistent.",
      },
      {
        type: "h2",
        text: "Cold process: the slow way",
      },
      {
        type: "p",
        text: "Most of our bars are cold-processed, which means oils and lye react slowly at room temperature over the course of four to six weeks. The slower process preserves more of the natural glycerin (commercial soap usually strips this out and sells it separately) and produces a milder bar.",
      },
      {
        type: "h2",
        text: "How we vet a maker",
      },
      {
        type: "list",
        items: [
          "Sourcing — we look at where their oils come from before we look at their bars",
          "Packaging — if a sample arrives wrapped in plastic, the conversation usually ends there",
          "Working conditions — small batch only, paid fair, no contract manufacturing for big-box brands",
          "Story — we want to feature them, not hide them",
        ],
      },
      {
        type: "quote",
        text: "We don't carry products we wouldn't use ourselves. That's the only filter that ever held up.",
        cite: "Maya, Founder",
      },
      {
        type: "h2",
        text: "What's next",
      },
      {
        type: "p",
        text: "We're slowly bringing more of our supplier stories to the journal — names, faces, places. If there's a maker behind a product you love and want to know more, send us a note.",
      },
    ],
  },
];

/** Returns all posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns one post by slug, or undefined if not found. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Returns up to `limit` posts that share the same category as `post`,
 * excluding the post itself. Falls back to most recent posts if not enough
 * category matches exist.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = getAllPosts().filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = getAllPosts().filter(
    (p) => p.slug !== post.slug && !sameCategory.includes(p)
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Formats an ISO date as "April 9, 2026" for display in article headers
 * and post cards.
 */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
