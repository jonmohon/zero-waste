# Zero Waste — Project Guide

## What This Is
A fast, modern ecommerce storefront for zero-waste products. Built to be easy to update — swap products, change copy, adjust styling — without fighting the framework.

## Tech Stack
- **Frontend**: Next.js 15 (App Router, RSC, TypeScript)
- **Commerce Backend**: Medusa v2 (headless)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm

## Architecture Decisions (Do Not Drift)

### Frontend
- **App Router only** — no pages/ directory, no getServerSideProps, no getStaticProps.
- **React Server Components by default** — only add `"use client"` when the component needs interactivity (clicks, forms, state). Never add it preemptively.
- **Data fetching happens in server components** via the Medusa JS SDK. No client-side fetching for product/collection data unless it's search or cart mutations.
- **Route structure mirrors Medusa resources**: `/products/[handle]`, `/collections/[handle]`, `/cart`, `/checkout`.
- **No Redux, no Zustand, no global state libraries.** Use React context sparingly (cart only). Server components + URL state handle the rest.

### Performance (Non-Negotiable)
- **Static generation where possible** — product pages use `generateStaticParams` + ISR with `revalidate`.
- **Images use `next/image`** with proper width/height/sizes. No raw `<img>` tags. Use WebP/AVIF via Next.js image optimization.
- **No layout shift** — all images and dynamic content must have explicit dimensions or aspect-ratio containers.
- **Minimal client JS** — every `"use client"` component should be as small as possible. Prefer composing a thin client wrapper around server-rendered content.
- **No heavy animation libraries** (framer-motion, GSAP). CSS transitions and animations only. Keep it snappy, not flashy.
- **Fonts: use `next/font`** — no external font CDN requests.

### Styling
- **Tailwind only** — no CSS modules, no styled-components, no inline style objects.
- **Design tokens live in `tailwind.config.ts`** — colors, spacing, fonts. Change the brand here, not scattered across components.
- **Mobile-first** — default styles are mobile, use `sm:`, `md:`, `lg:` for larger screens.
- **Dark mode: not yet.** Don't add dark mode classes or logic unless explicitly requested.

### Medusa Integration
- **Medusa JS SDK** (`@medusajs/js-sdk`) for all API calls — no raw fetch to Medusa endpoints.
- **Medusa backend runs separately** — this repo is frontend only. Backend config/customization lives in its own repo.
- **Environment variables**: `NEXT_PUBLIC_MEDUSA_BACKEND_URL` and `MEDUSA_API_KEY` — never hardcode URLs.
- **Products are managed in Medusa Admin** — the frontend reads them. No product data lives in this repo.

### File Organization
```
src/
  app/              # Next.js App Router routes
    (store)/        # Main storefront layout group
      products/
      collections/
      cart/
      checkout/
    api/            # Route handlers (webhooks, etc.)
  components/       # Shared UI components
    ui/             # Primitives (Button, Input, Card)
    layout/         # Header, Footer, Nav
    product/        # Product-specific components
    cart/           # Cart-specific components
  lib/              # Utilities, Medusa client, helpers
  styles/           # Global CSS (Tailwind base only)
```

### Naming Conventions
- **Files**: kebab-case (`product-card.tsx`, `cart-provider.tsx`)
- **Components**: PascalCase (`ProductCard`, `CartProvider`)
- **Utilities/hooks**: camelCase (`formatPrice`, `useCart`)
- **Route folders**: kebab-case matching URL slugs

## Documentation Requirements (Mandatory)

Every piece of code must be documented. This is how we prevent drift — the code explains itself so the next person (or AI) doesn't have to guess intent.

### Components
- **JSDoc block above every component** explaining what it does, where it's used, and what props it expects.
- **Inline comments for non-obvious logic** — conditional rendering, derived state, Medusa-specific workarounds.
- Example:
  ```tsx
  /**
   * ProductCard — displays a single product in grid/list views.
   * Used in: CollectionPage, SearchResults, FeaturedProducts
   *
   * @param product - Medusa Product object (must include variants + prices)
   * @param priority - if true, image loads eagerly (use for above-the-fold cards)
   */
  ```

### Utility Functions (`lib/`)
- **JSDoc with `@param`, `@returns`, and `@example`** on every exported function.
- If the function handles a Medusa-specific edge case, document *why* with a comment.
- Example:
  ```ts
  /**
   * Formats a Medusa money amount into a display string.
   * Medusa stores prices in smallest currency unit (cents for USD).
   *
   * @param amount - price in smallest unit (e.g. 1999 = $19.99)
   * @param currencyCode - ISO 4217 code (e.g. "usd")
   * @returns formatted string (e.g. "$19.99")
   *
   * @example
   * formatPrice(1999, "usd") // "$19.99"
   */
  ```

### Route Files (`page.tsx`, `layout.tsx`)
- **Top-of-file comment** explaining the route, what data it fetches, and its caching/revalidation strategy.
- Example:
  ```tsx
  // Route: /products/[handle]
  // Fetches a single product by handle via Medusa SDK.
  // Statically generated at build time, revalidates every 60s (ISR).
  ```

### API Route Handlers
- **Document the endpoint, method, request body, and response shape.**
- Note any webhooks or external callers.

### Types
- **Exported types/interfaces get a JSDoc description.** Don't just name it — say what it represents and where it's used.

### When NOT to Comment
- Don't comment self-evident Tailwind markup (`{/* this is a flex container */}` — no).
- Don't restate TypeScript types in comments (`// takes a string` above a `name: string` param — no).
- Don't leave TODO/FIXME without a name and date: `// TODO(jon 2026-04-01): handle multi-currency`.

## Rules

1. **Don't add dependencies without justification.** Every new package is tech debt. Tailwind, Medusa SDK, and Next.js cover 95% of needs.
2. **Don't abstract prematurely.** Three similar product cards are fine. A `<DynamicCardFactory>` is not.
3. **Don't put business logic in components.** Product formatting, price calculations, inventory checks go in `lib/`. Components render.
4. **Don't bypass TypeScript.** No `any`, no `@ts-ignore`, no `as unknown as X` escape hatches.
5. **Keep components under 150 lines.** If it's longer, split it — but only along real boundaries, not arbitrary ones.
6. **Test with Lighthouse before PRs.** Performance score must stay above 90.
7. **Commit messages**: imperative mood, lowercase, no period. Example: `add product grid to collection page`
8. **All code must be documented** per the Documentation Requirements above. Undocumented code should not be merged.
