# Zero Waste — Architecture

A map of the storefront and how the moving pieces fit together. Pair
this with `LAUNCH.md` (current state + launch playbook) and `CLAUDE.md`
(coding conventions and rules).

---

## High-level

```
┌──────────────────────────┐    HTTPS    ┌──────────────────────┐
│   Next.js storefront     │ ──────────▶│      Amplify CDN      │
│   (zero-waste/)          │             │   (auto deploy from   │
│                          │             │    main branch)       │
└──────────────────────────┘             └──────────────────────┘
            │                                       │
            │ SDK fetch                             │ static
            │ (browser, currently HTTP — see        │ assets
            │  LAUNCH.md mixed-content blocker)     │
            ▼                                       ▼
┌──────────────────────────┐             ┌──────────────────────┐
│   Medusa v2 backend      │ ──────────▶│  /public/products/    │
│   (zero-waste-backend/)  │             │  webp images          │
│   on EC2 i-09656…        │             │  (committed in repo)  │
└──────────────────────────┘             └──────────────────────┘
            │
            │ pg
            ▼
┌──────────────────────────┐
│   Postgres (Neon)        │
│   neondb                 │
└──────────────────────────┘
```

Two repos, one database. The storefront and backend are deployed
independently. The product CSV import is a one-shot Python pipeline that
writes images into the storefront repo and product records into Neon
via the Medusa SDK.

---

## Storefront (`zero-waste/`)

Next.js 15 App Router project with React Server Components by default
and very few client islands.

### Directory layout

```
src/
├── app/                                  # Next.js App Router routes
│   ├── layout.tsx                        # root layout (fonts, metadata)
│   ├── page.tsx                          # home page
│   └── (store)/                          # store layout group — wraps in providers
│       ├── layout.tsx                    # AuthProvider + CartProvider
│       ├── cart/page.tsx                 # /cart — server shell → CartContents
│       ├── checkout/page.tsx             # /checkout — server shell → CheckoutForm
│       ├── order-confirmation/[id]/      # /order-confirmation/<id>
│       ├── signin/page.tsx               # /signin (Suspense-wrapped form)
│       ├── signup/page.tsx               # /signup (Suspense-wrapped form)
│       ├── account/                      # customer profile + addresses
│       ├── collections/page.tsx          # /collections — list of categories
│       ├── collections/[handle]/         # /collections/<handle> — products in category
│       ├── products/[handle]/            # /products/<handle> — product detail (ISR)
│       └── reset-password/page.tsx       # password reset
├── components/
│   ├── auth/
│   │   ├── auth-provider.tsx             # customer session context
│   │   ├── signin-form.tsx               # login form (?redirect= aware)
│   │   ├── signup-form.tsx               # registration form (?redirect= aware)
│   │   ├── reset-password-form.tsx
│   │   └── auth-guard.tsx                # client-side auth wrapper for /account
│   ├── cart/
│   │   ├── cart-provider.tsx             # cart context — reads auth, drops on logout
│   │   ├── cart-icon.tsx                 # header link with live count badge
│   │   ├── cart-contents.tsx             # /cart page body (loading/empty/populated)
│   │   └── cart-empty.tsx                # legacy stub — currently unused
│   ├── checkout/
│   │   ├── checkout-form.tsx             # single-page checkout UI
│   │   └── order-confirmation.tsx        # /order-confirmation/<id> body
│   ├── product/
│   │   ├── product-card.tsx              # grid card (image + title + price + add btn)
│   │   ├── product-card-add-button.tsx   # compact add-to-cart on cards
│   │   └── add-to-cart-button.tsx        # large CTA on the detail page
│   ├── home/                             # homepage sections (hero, featured, etc.)
│   ├── layout/                           # header / footer / nav / mobile menu
│   └── ui/                               # button / input / card primitives
├── lib/
│   ├── medusa.ts                         # SDK client + product/region helpers
│   ├── auth.ts                           # signup / login / logout / customer / addresses
│   ├── cart.ts                           # cart create/retrieve/add/update/remove
│   ├── checkout.ts                       # address / shipping / payment / complete / order
│   ├── types.ts                          # local types mirroring Medusa store API
│   └── utils.ts                          # formatPrice, cn (classname helper)
└── styles/                               # tailwind base only
```

### Provider tree

```
RootLayout (server)
└── StoreLayout (server)
    └── AuthProvider (client)             # customer state
        └── CartProvider (client)         # cart state — reads useAuth
            └── pages
```

`CartProvider` lives _inside_ `AuthProvider` because it has a
`useEffect` that drops the local cart id when `isAuthenticated` flips
to false (so guest carts don't leak across customers).

### How a typical request flows

**Browse a collection page** (server-side, no client JS for data):

```
Request /collections/oral-care
  → app/(store)/collections/[handle]/page.tsx (RSC)
  → lib/medusa.ts: getCategories() + getProductsByCategory()
  → Medusa store API
  → renders ProductCard components (server)
```

**Add to cart** (client-side, requires auth):

```
Click "Add to Cart" on a card
  → ProductCardAddButton.handleClick (client)
  → if !isAuthenticated → router.push("/signin?redirect=...")
  → else useCart().addItem(variantId)
    → lib/cart.ts: addLineItem
      → if no stored cart id, createCart (POST /store/carts)
      → cart.createLineItem (POST /store/carts/:id/line-items)
      → returns updated cart with totals
    → setCart() in CartProvider → header badge re-renders
```

**Checkout**:

```
Click "Checkout" on /cart
  → /checkout page → CheckoutForm
  → on mount: fetch shipping options + payment providers
  → submit:
      1. setCheckoutAddress  (cart.update with email + addresses)
      2. selectShippingMethod (cart.addShippingMethod)
      3. initializePayment   (payment.initiatePaymentSession)
      4. completeCart        (cart.complete → order)
  → clear local cart id, refresh cart provider, push to /order-confirmation/<id>
```

### Cart persistence

The cart id lives in `localStorage` under `medusa_cart_id` (key
exported as `CART_ID_KEY` from `lib/cart.ts`). On page load, the cart
provider tries to retrieve it; if the backend returns "not found" (cart
expired or deleted), the local id is cleared and the next add creates a
fresh cart.

### Auth + cart relationship

- Add-to-cart is gated on auth so the cart is always created in an
  authenticated session — that means the cart ends up associated with
  the customer on the backend.
- On logout, the cart provider's `useEffect` drops the local id and
  in-memory cart. So a customer who logs in to a different account
  starts with a blank cart.
- The cart provider re-fetches when auth changes _from_ logged-in (so
  refreshes pick up server-side mutations).

### Where to add a new feature

| You want to…                                | Touch                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| Show a new field on product cards           | `components/product/product-card.tsx`                                |
| Add a checkout step (e.g. discount code)    | `components/checkout/checkout-form.tsx` + new fn in `lib/checkout.ts`|
| Add a cart mutation (e.g. clear all)        | `lib/cart.ts` + expose via `components/cart/cart-provider.tsx`       |
| New customer auth field (e.g. phone)        | `lib/auth.ts` + `components/auth/signup-form.tsx`                    |
| New layout-wide provider                    | `app/(store)/layout.tsx`                                             |
| Add a Medusa store API call                 | A helper in `lib/<area>.ts`, then call from a component              |

### Conventions worth knowing

These come from `CLAUDE.md` — reading that file is the fastest way to
internalize the project's style. Key rules:

- App Router only. No `pages/`. No `getServerSideProps`.
- React Server Components by default. Add `"use client"` only when you
  need state, effects, or event handlers.
- All API calls through `lib/medusa.ts` (and the wrappers built on it).
  Never raw `fetch()` to Medusa.
- All money in cents. Format with `formatPrice(amount, currency)`.
- Tailwind only — no CSS modules, styled-components, or inline styles.
- Components stay under 150 lines; split along real boundaries.
- Every component / route / utility gets a JSDoc block. The "what",
  "where it's used", and (for non-obvious logic) the "why".
- No new dependencies without justification.

---

## Backend (`zero-waste-backend/`)

Standard Medusa v2 install. Mostly framework boilerplate; the
project-specific code is small and easy to enumerate.

### Things that are not stock Medusa

```
src/
├── scripts/
│   ├── seed.ts                    # original 24-product demo seed (kept for reference)
│   └── import-products.ts         # production CSV import — wipes + recreates
└── medusa-config.ts               # store + module config (where new modules slot in)

scripts/                           # not Medusa-managed; my pipeline
├── build-import-data.py           # parses Shopify CSV, downloads + webp-converts images,
│                                  # writes products-import.json
└── products-import.json           # generated artifact — input to import-products.ts
```

### CSV import flow

The 124-product catalog came from a Shopify export. The flow is:

```
products_export_1.csv
        │
        ▼  (python build-import-data.py)
1. parse rows + group by handle
2. for each handle:
     - slugify + dedupe
     - infer category (Shopify cat → vendor → title keywords)
     - download every image
     - convert to webp via Pillow (max 1600px, q82)
     - write to ../zero-waste/public/products/<handle>/<n>.webp
3. emit scripts/products-import.json
        │
        ▼  (medusa exec import-products.ts against the target DB)
1. delete existing products + categories + tags (soft delete)
2. recreate categories
3. recreate tags
4. recreate products in batches of 20 with the new image URLs
5. stock every variant at 100 units at the default location
```

The pipeline is **idempotent**: re-running rebuilds the JSON, re-imports
products, and only redownloads missing images. Safe to run as often as
needed.

### Local vs prod imports

Both runs use the same script, just with a different `DATABASE_URL`:

```bash
# Local
npx medusa exec ./src/scripts/import-products.ts

# Prod (Neon)
DATABASE_URL='postgres://neondb_owner:...@...neon.tech/neondb?sslmode=require' \
  npx medusa exec ./src/scripts/import-products.ts
```

### Where to add a new feature

| You want to…                                | Touch                                                  |
| ------------------------------------------- | ------------------------------------------------------ |
| Wire a payment provider (Stripe)            | `medusa-config.ts` + new env vars                      |
| Wire email notifications                    | `medusa-config.ts` + `src/subscribers/<event>.ts`      |
| Add a custom store API endpoint             | `src/api/store/<route>/route.ts`                       |
| Add an admin endpoint                       | `src/api/admin/<route>/route.ts`                       |
| Background jobs / cron                      | `src/jobs/<name>.ts`                                   |
| Custom workflow (e.g. order placed hook)    | `src/workflows/<name>.ts`                              |

---

## Database (Neon Postgres)

- Single database `neondb` shared by local + prod (different connection
  strings).
- Schema is managed entirely by Medusa migrations — never write raw
  SQL DDL by hand.
- Backups: Neon's built-in PITR. Verify before launch (see Tier 2 in
  `LAUNCH.md`).

Useful queries (run via `psql` against the prod URL):

```sql
-- Active product count
SELECT count(*) FROM product WHERE deleted_at IS NULL;

-- Products per category
SELECT name, count(pcp.product_id) AS n
FROM product_category pc
LEFT JOIN product_category_product pcp ON pcp.product_category_id = pc.id
WHERE pc.deleted_at IS NULL
GROUP BY name ORDER BY n DESC;

-- Recent orders
SELECT id, display_id, status, email, total, created_at
FROM "order" WHERE deleted_at IS NULL
ORDER BY created_at DESC LIMIT 20;
```

---

## Deployments

### Storefront → Amplify

- Auto-deploys on every push to `main`.
- Build env vars are set on the Amplify app, not in the repo:
  - `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
  - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- Latest jobs:
  ```bash
  aws --profile nexvato amplify list-jobs \
    --app-id d1g9qtg3mg0h8g --branch-name main --max-items 5 \
    --query 'jobSummaries[*].[jobId,status,startTime]' --output table
  ```

### Backend → EC2

- Manual: `EC2_HOST=34.229.205.244 KEY=~/.ssh/zero-waste-ec2 bash deploy/push.sh`
- Runs as systemd unit `zero-waste` on the box.
- Logs: `sudo journalctl -u zero-waste -f`

---

## Things to watch out for

1. **Mixed content blocker** (see `LAUNCH.md`) — the cart and checkout
   I built will not work in real browsers until the backend has HTTPS.
2. **Cart context default** — `useCart()` returns a safe default when
   used outside `CartProvider` so RSC prerender doesn't crash. If
   you're debugging "cart isn't updating" check that the component is
   actually inside the provider tree.
3. **Categories with `&` in the handle** (e.g. `bath-&-body`) — when
   building hrefs, URL-encode them: `/collections/bath-%26-body`.
4. **Soft deletes** — Medusa soft-deletes products/categories/tags.
   Direct SQL queries should always filter `WHERE deleted_at IS NULL`.
5. **`useSearchParams` requires Suspense** — any client component that
   reads `?query=` params must be wrapped in a `<Suspense>` boundary at
   the page level or the static export bails.

---

_Pair with `LAUNCH.md` and `CLAUDE.md`. Keep this current as the
architecture evolves._
