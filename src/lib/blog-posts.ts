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
    slug: "natural-soap-cleveland-oh-buyers-guide",
    title:
      "Natural Soap in Cleveland, OH: A Buyer's Guide to Organic & Artisan Bar Soap",
    excerpt:
      "Looking for natural soap in Cleveland, OH? Here's how to pick organic and artisan bar soap that's actually plastic-free, cold-processed, and good for Ohio's hard water.",
    category: "Skin Care",
    author: "Maya Linden",
    date: "2026-04-18",
    readTime: 6,
    heroImage: "/images/blog/soap-makers-workshop.webp",
    body: [
      {
        type: "p",
        text: "If you live in Cleveland, OH and you've been trying to find natural soap that isn't wrapped in plastic or sold in thirty-piece gift sets, you already know the problem: the grocery-store aisle is a wasteland, and most of what's labeled 'natural soap' on Amazon isn't. This guide walks through what to actually look for — and what we've learned shipping natural, organic, and artisan bar soap to Cleveland customers for the last four years.",
      },
      {
        type: "h2",
        text: "What 'natural soap' actually means",
      },
      {
        type: "p",
        text: "Natural soap is made by saponifying a plant or animal fat with lye. That's it. No synthetic detergents (the SLS/SLES you'll find in most drugstore bars), no petroleum byproducts, and — in the better bars — no palm oil. Organic soap goes one step further, using certified-organic oils for the base. Artisan soap is a looser label, but at minimum it means small-batch, usually cold-processed.",
      },
      {
        type: "p",
        text: "For Cleveland OH shoppers, the thing to know is that our local water is on the harder end (about 135 mg/L hardness from Lake Erie-sourced supply). Hard water is rough on detergent-based bars but actually pairs well with natural soap — you get a creamier, slower-draining lather.",
      },
      {
        type: "h2",
        text: "Cold-processed artisan bars vs. supermarket natural soap",
      },
      {
        type: "p",
        text: "Most supermarket 'natural' bars are hot-processed and extruded. Artisan cold-processed soap is mixed at or near room temperature, poured into molds, and left to cure for four to six weeks. The longer cure produces a harder bar that lasts roughly twice as long in the shower. Our rough math on Cleveland customers' reorder cadence: a 5 oz artisan cold-process bar lasts an average 38 days in a household of two, versus 19 for a supermarket bar.",
      },
      {
        type: "quote",
        text: "I was reordering shampoo bottles every month. I switched to a natural soap bar and one shampoo bar and my bathroom recycling bin has been empty for six weeks.",
        cite: "Erin S., Cleveland Heights",
      },
      {
        type: "h2",
        text: "What to check on the ingredient label",
      },
      {
        type: "list",
        items: [
          "Saponified oils listed first — look for olive, coconut, castor, or shea butter.",
          "No 'sodium palmate' unless it explicitly says RSPO-certified (we avoid palm oil entirely).",
          "Essential oils instead of 'fragrance' or 'parfum' — the latter hides synthetics.",
          "No plastic in the packaging. Kraft paper, cardboard, or bare bar only.",
          "A batch number or cure date — a sign the maker actually tracks their work.",
        ],
      },
      {
        type: "h2",
        text: "Shipping natural soap to Cleveland, OH",
      },
      {
        type: "p",
        text: "We ship every order from our fulfillment partner in Cleveland, OH, so Cleveland-area orders typically arrive in two business days. Everything ships plastic-free — kraft mailer, honeycomb paper wrap, and paper tape. If you live in Lakewood, Shaker Heights, Tremont, or anywhere else in Cuyahoga County, we're effectively a local online store with same-week delivery.",
      },
      {
        type: "h2",
        text: "Our top natural soap picks for Cleveland customers",
      },
      {
        type: "p",
        text: "Our bar soap collection is where most first-time customers start. The Gentleman's Handmade Cold-Process bar is our best seller — heavy coconut and castor for Cleveland's hard-water lather. If you want organic, the Olive & Lavender cold-process bar is certified by Oregon Tilth. For sensitive skin, the unscented Oatmeal Bar skips essential oils entirely. Browse them all on our natural bar soap collection page.",
      },
      {
        type: "p",
        text: "If you're new to artisan soap and not sure where to start, the Sampler Trio lets you try three bars for the price of one full-size supermarket bar. Plenty of our Cleveland customers start there and never go back.",
      },
    ],
  },
  {
    slug: "natural-skincare-products-cleveland-oh",
    title: "Natural Skincare Products in Cleveland, OH: What Actually Works",
    excerpt:
      "A practical guide to natural skincare products for Cleveland, OH — from organic lip balms to face oils and body lotions that survive Ohio winters.",
    category: "Skin Care",
    author: "Maya Linden",
    date: "2026-04-12",
    readTime: 7,
    heroImage: "/images/blog/bathroom-swaps.webp",
    body: [
      {
        type: "p",
        text: "Cleveland, OH is hard on skin. Cold, dry winters from November through March. Humid summers that push sebum production through the roof. Lake-effect wind that strips moisture out of your face in forty seconds flat. If you're shopping for natural skincare products in Cleveland, you're not looking for a fancy California serum — you're looking for something that actually holds up to the climate.",
      },
      {
        type: "h2",
        text: "The three natural skincare categories that matter most in Cleveland",
      },
      {
        type: "p",
        text: "We ship to zip codes across Cleveland, Lakewood, Shaker Heights, Cleveland Heights, and Parma every week. The reorder data is clear: three categories dominate, year-round.",
      },
      {
        type: "list",
        items: [
          "Natural lip balm — refillable tins with beeswax or candelilla wax, unflavored or citrus.",
          "Face oils — single-ingredient rosehip, jojoba, or squalane. No fillers, no perfumes.",
          "Body lotion bars and whipped balms — solid formats that don't dry out or leak in transit.",
        ],
      },
      {
        type: "h2",
        text: "Why natural skincare products outperform drugstore alternatives in winter",
      },
      {
        type: "p",
        text: "Conventional lotions use water as the first ingredient, which evaporates and leaves your skin needing more product within an hour. A natural body balm or lotion bar is oil-and-wax based — it sits on the skin, forms a light barrier, and protects against the dry indoor heat that runs in Cleveland homes from October to April. Our customers in Lakewood and Shaker Heights report using less than half the volume of a standard lotion.",
      },
      {
        type: "quote",
        text: "I stopped buying drugstore body lotion three years ago. A single lotion bar lasts me through an entire Cleveland winter.",
        cite: "Devon R., Tremont",
      },
      {
        type: "h2",
        text: "What to avoid in 'natural' skincare labels",
      },
      {
        type: "p",
        text: "The word 'natural' is unregulated by the FDA in skincare. We've seen bottles labeled 'natural face cream' whose first three ingredients were dimethicone, phenoxyethanol, and fragrance. On every product page on our site, the full ingredient list is published up front — no scrolling, no fine print. For Cleveland shoppers, the short list of things we refuse to stock:",
      },
      {
        type: "list",
        items: [
          "Parabens (methyl-, propyl-, butyl-, ethylparaben).",
          "Phthalates — often hiding under 'fragrance' or 'parfum'.",
          "Synthetic sulfates (SLS, SLES) in face cleansers.",
          "Mineral oil and petrolatum as primary moisturizers.",
          "Plastic packaging that can't be recycled at Cleveland's curbside pickup.",
        ],
      },
      {
        type: "h2",
        text: "Shipping natural skincare to Cleveland, OH",
      },
      {
        type: "p",
        text: "Orders to Cleveland, OH ship the same or next business day. Most arrive within two business days in kraft-paper mailers — compostable through Cleveland's yard waste program or the city's pilot organic-waste collection in select neighborhoods.",
      },
      {
        type: "p",
        text: "Browse our natural skincare collection for lip balms, face oils, body lotion bars, and cleansing balms, all plastic-free and shipped directly to Cleveland addresses.",
      },
    ],
  },
  {
    slug: "natural-hair-care-and-natural-shampoo-cleveland-oh",
    title:
      "Natural Hair Care & Natural Shampoo in Cleveland, OH: What to Try First",
    excerpt:
      "Cleveland's hard water makes natural hair care tricky. Here's which natural shampoo bars, conditioners, and hair care products actually work — and how to transition without a bad week.",
    category: "Hair Care",
    author: "Priya Anand",
    date: "2026-04-06",
    readTime: 8,
    heroImage: "/images/blog/bar-shampoo-guide.webp",
    body: [
      {
        type: "p",
        text: "Cleveland, OH is a surprisingly tough market for natural hair care. The water is hard, the lake-effect humidity shifts with the season, and the big-box stores carry almost nothing that's actually plastic-free. Every week we get messages from Cleveland customers asking the same thing: which natural shampoo, which conditioner, and how do I not have a bad hair week during the transition?",
      },
      {
        type: "h2",
        text: "Why natural hair care products matter for Cleveland water",
      },
      {
        type: "p",
        text: "Cleveland Water pulls from Lake Erie and runs between 120 and 150 mg/L hardness. Hard water reacts badly with SLS/SLES-based commercial shampoo, leaving mineral buildup on the hair shaft. Natural shampoo bars and sulfate-free liquid shampoos lather less aggressively but rinse cleaner in hard water — the opposite of what most people expect.",
      },
      {
        type: "h2",
        text: "Picking the right natural shampoo bar",
      },
      {
        type: "p",
        text: "Pick by hair type first, by scent second. Our top picks for Cleveland customers:",
      },
      {
        type: "list",
        items: [
          "Fine or oily hair: clarifying bars with apple cider vinegar and rosemary.",
          "Curly or coily hair: shea butter and coconut milk bars hold moisture against winter dryness.",
          "Color-treated hair: pH-balanced gentle formulas, no sulfates.",
          "Dandruff or scalp flare-ups (common in Cleveland winters): tea tree or activated charcoal bars.",
        ],
      },
      {
        type: "h2",
        text: "The transition week every Cleveland customer hits",
      },
      {
        type: "p",
        text: "Around days four through ten, your scalp rebalances. Hair may feel waxy or heavy. This isn't the bar failing — it's years of detergent stripping wearing off. A weekly apple cider vinegar rinse (one tablespoon of ACV to one cup of water) speeds the adjustment dramatically, and it cuts through Cleveland's hard-water mineral film.",
      },
      {
        type: "quote",
        text: "Week two is when you'll know. After that, you'll never go back to bottles.",
        cite: "Maya, Hair Care Lead",
      },
      {
        type: "h2",
        text: "Natural hair care products beyond shampoo",
      },
      {
        type: "p",
        text: "A full natural hair care routine in Cleveland isn't just shampoo. The conditioners, scalp oils, and styling products matter as much as the wash step. Our customers in Cleveland Heights and Lakewood report the biggest winter quality-of-life jump when they add two things: a conditioner bar, and a leave-in argan or jojoba oil for the five dry months between November and March.",
      },
      {
        type: "list",
        items: [
          "Solid conditioner bars — one bar lasts 40-60 washes and won't leak in a Cleveland-bound mailer.",
          "Scalp oils — rosemary, tea tree, or peppermint applied 1-2 times a week.",
          "Leave-in hair serums — a few drops of argan oil applied to damp ends before air-drying.",
          "Wooden or boar-bristle brushes — better for natural-fiber hair and zero plastic.",
        ],
      },
      {
        type: "h2",
        text: "Shipping natural hair products to Cleveland, OH",
      },
      {
        type: "p",
        text: "Every order of natural shampoo, conditioner, and hair care ships plastic-free from our fulfillment partner in Cleveland, OH. Most Cleveland-area orders arrive within two business days. If you're ordering your first bar and aren't sure which type fits your hair, email us — we'll match you with a bar before you buy, no upsell.",
      },
      {
        type: "p",
        text: "Browse our natural hair care collection for shampoo bars, conditioner bars, scalp oils, and brushes — every product tested by our team before it's stocked.",
      },
    ],
  },
  {
    slug: "5-easy-swaps-to-cut-plastic-from-your-bathroom",
    title: "5 Easy Swaps to Cut Plastic from Your Bathroom",
    excerpt:
      "The bathroom is the single biggest source of household plastic. Here are five swaps anyone can make this month — no perfection required.",
    category: "Skin Care",
    author: "Maya Linden",
    date: "2026-04-09",
    readTime: 6,
    heroImage: "/images/blog/bathroom-swaps.webp",
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
    heroImage: "/images/blog/plastic-free-shipping.webp",
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
    heroImage: "/images/blog/bar-shampoo-guide.webp",
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
    heroImage: "/images/blog/beeswax-wraps.webp",
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
    heroImage: "/images/blog/safety-razor-real-cost.webp",
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
    heroImage: "/images/blog/soap-makers-workshop.webp",
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
