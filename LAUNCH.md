# Zero Waste — Launch Playbook

The state of the store as of 2026-04-11 and exactly what needs to happen
to flip it on for real customers.

> **Read this first if you're picking up the project in a new session.**
> It's the single source of truth for what's done, what's broken, and
> what's blocking launch.

---

## Quick links

| Thing                  | URL / Path                                                                 |
| ---------------------- | -------------------------------------------------------------------------- |
| Storefront (live)      | https://main.d1g9qtg3mg0h8g.amplifyapp.com/                                |
| Storefront repo        | https://github.com/jonmohon/zero-waste                                     |
| Backend repo           | https://github.com/jonmohon/zero-waste-backend                             |
| Backend (raw EC2)      | http://34.229.205.244:9000                                                 |
| Backend Admin (raw)    | http://34.229.205.244:9000/app                                             |
| Database (Neon)        | `ep-autumn-paper-amraubj9-pooler.c-5.us-east-1.aws.neon.tech/neondb`       |
| Amplify app id         | `d1g9qtg3mg0h8g`                                                           |
| Backend EC2 instance   | `zero-waste` (i-09656da68b455dea2)                                         |
| AWS profile            | `nexvato`                                                                  |
| Publishable API key    | `pk_b6f1caa6bdeed4103437df2e24b4506da8134b69531975cee427603dd226bb89`      |

See `ARCHITECTURE.md` in this repo for how the code is laid out.

---

## Current state (what works and what doesn't)

### ✅ Works
- **Storefront** is built, deployed, and rendering on Amplify.
- **Catalog**: 124 real products imported from a Shopify CSV, with 577
  webp images served from `/public/products/<handle>/<n>.webp`. 81 are
  published, 43 are draft.
- **Categories**: 9 active (Bar Soap, Hair Care, Skin Care, Oral Care,
  Food Wraps, Bath & Body, Combs & Brushes, Kitchen, Home & Decor).
- **Customer auth**: signup, signin, signout, password reset form, and
  account page. All wired to the Medusa store API.
- **Cart provider** (in-memory + localStorage persistence) and the
  **`/cart` page** with quantity stepper, line totals, and order summary.
- **Add-to-cart buttons** on product cards and the product detail page,
  gated on auth. If a logged-out customer clicks one they're routed to
  `/signin?redirect=<product>` and brought back after auth.
- **`/checkout`** page that walks the customer through the four-step
  Medusa checkout (cart.update with address → addShippingMethod →
  initiatePaymentSession → cart.complete).
- **`/order-confirmation/[id]`** page that fetches the placed order and
  shows order number, items, totals, and shipping address.

### 🚨 Broken (the launch blocker)

**The cart and checkout don't work in real browsers right now.**

- The storefront runs on `https://...amplifyapp.com`.
- Every cart/checkout SDK call is a **client-side fetch** from the browser.
- The Medusa backend is at `http://34.229.205.244:9000` — plain HTTP.
- Modern browsers block HTTPS-page → HTTP-API requests as "active mixed
  content". The fetch silently fails, and the customer sees nothing.

This means a customer can browse the store (server-side rendering works
fine and proxies through Next.js, no mixed content) but **cannot
actually buy anything** until the backend gets HTTPS.

#### How to verify this is still broken
1. Open https://main.d1g9qtg3mg0h8g.amplifyapp.com/ in Chrome
2. Open DevTools → Console + Network
3. Sign in, click Add to Cart on any product
4. Watch for `Mixed Content` errors in the Console and a blocked request
   to `34.229.205.244:9000` in Network

When this is fixed, those errors will disappear and the cart will
populate.

### ⚠️ Other dead-but-not-blocking pieces
- **Real card payments**: the prod region only has Medusa's
  `pp_system_default` which marks orders as paid without charging.
  Stripe is not wired up yet.
- **Order confirmation emails**: the `/order-confirmation` page promises
  one but no email is actually sent.
- **Password reset emails**: the form exists but won't send anything.
- **Footer links** to `/about`, `/contact`, `/shipping`, `/privacy` —
  most likely 404, not built yet.

---

## The launch checklist

Tier 1 = blockers. You can't take real orders without all of Tier 1.
Tier 2 = strong "should have" before traffic.
Tier 3 = polish + growth.

### Tier 1 — blockers

#### 1. HTTPS on the backend API ⛔️ **(highest priority)**

This unblocks the cart and checkout in real browsers.

**What's needed from you (DNS access)**
- A domain you control. Pick a subdomain to use for the API
  (e.g. `api.zerowastestore.com`).
- Ability to add a DNS A record pointing that subdomain at the EC2
  public IP (`34.229.205.244`).

**Steps once you have DNS access**

```bash
# 1. From your laptop, add an A record at your DNS provider:
#    api.zerowastestore.com  →  34.229.205.244
#    Wait for it to propagate (1-30 min depending on TTL).

# 2. SSH to the backend EC2:
ssh -i ~/.ssh/zero-waste-ec2 ubuntu@34.229.205.244

# 3. Install Caddy (if not already there):
sudo apt update
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy

# 4. Drop in the Caddyfile:
sudo tee /etc/caddy/Caddyfile <<'EOF'
api.zerowastestore.com {
  encode gzip
  reverse_proxy localhost:9000
}
EOF

# 5. Open ports 80 + 443 on the EC2 security group (currently only 9000
#    is open). Use the EC2 console or:
aws --profile nexvato ec2 authorize-security-group-ingress \
  --group-id <sg-id> --protocol tcp --port 80 --cidr 0.0.0.0/0
aws --profile nexvato ec2 authorize-security-group-ingress \
  --group-id <sg-id> --protocol tcp --port 443 --cidr 0.0.0.0/0

# 6. Restart Caddy. It will auto-issue a Let's Encrypt cert on first
#    request to api.zerowastestore.com.
sudo systemctl restart caddy
sudo systemctl enable caddy

# 7. Confirm:
curl -I https://api.zerowastestore.com/store/products \
  -H "x-publishable-api-key: pk_b6f1caa6bdeed4103437df2e24b4506da8134b69531975cee427603dd226bb89"
# Expect: HTTP/2 200
```

**Update Medusa env vars on the EC2 to whitelist the new origin**

Edit `/opt/zero-waste-backend/.env`:

```ini
STORE_CORS=https://main.d1g9qtg3mg0h8g.amplifyapp.com,https://zerowastestore.com,https://www.zerowastestore.com
ADMIN_CORS=https://api.zerowastestore.com
AUTH_CORS=https://main.d1g9qtg3mg0h8g.amplifyapp.com,https://zerowastestore.com,https://www.zerowastestore.com
```

Then restart the systemd unit:

```bash
sudo systemctl restart zero-waste
```

**Update Amplify env var to point at HTTPS**

```bash
aws --profile nexvato amplify update-app \
  --app-id d1g9qtg3mg0h8g \
  --environment-variables \
    NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.zerowastestore.com,\
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_b6f1caa6bdeed4103437df2e24b4506da8134b69531975cee427603dd226bb89
```

Then trigger a redeploy:

```bash
aws --profile nexvato amplify start-job \
  --app-id d1g9qtg3mg0h8g --branch-name main --job-type RELEASE
```

**Verification**
- https://main.d1g9qtg3mg0h8g.amplifyapp.com/ loads
- DevTools console has no mixed-content errors
- Add-to-cart actually adds an item, header badge ticks up
- `/cart` shows the item, `/checkout` walks all the way through to a
  real order in the Medusa admin

#### 2. Real card payments — Stripe

**What's needed from you**
- A Stripe account
- Test mode publishable + secret keys (`pk_test_...`, `sk_test_...`)
- Eventually: live keys + a verified business

**Steps**

```bash
# Backend: install the Stripe payment module
cd /Volumes/T9/Development/zero-waste-backend
pnpm add @medusajs/payment-stripe
```

Edit `medusa-config.ts` to register the module:

```ts
modules: {
  [Modules.PAYMENT]: {
    resolve: "@medusajs/payment",
    options: {
      providers: [
        {
          resolve: "@medusajs/payment-stripe",
          id: "stripe",
          options: {
            apiKey: process.env.STRIPE_API_KEY,
          },
        },
      ],
    },
  },
}
```

Add to backend `.env` (both local and prod EC2):

```ini
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Update the US region to enable the new provider:

```bash
# Via admin or a one-shot script. The SDK call is:
# medusa.admin.region.update(regionId, { payment_providers: ["pp_stripe_stripe"] })
```

Set up the webhook in Stripe dashboard pointing at:

```
https://api.zerowastestore.com/hooks/payment/stripe
```

**Storefront changes**
1. Install the Stripe Elements SDK:
   ```bash
   cd /Volumes/T9/Development/zero-waste
   pnpm add @stripe/stripe-js @stripe/react-stripe-js
   ```
2. Wrap the checkout form with `<Elements stripe={stripePromise}>`.
3. Add a `<PaymentElement />` to the Payment section of `checkout-form.tsx`.
4. Between `initializePayment` and `completeCart`, call
   `stripe.confirmPayment()` with the client secret returned from
   `initiatePaymentSession`.

The exact code is fairly mechanical — the rest of the flow stays the
same since `lib/checkout.ts` already calls `initiatePaymentSession` with
whatever provider is configured.

#### 3. Custom domain on Amplify

**Steps**

```bash
# Replace zerowastestore.com with your domain.
aws --profile nexvato amplify create-domain-association \
  --app-id d1g9qtg3mg0h8g \
  --domain-name zerowastestore.com \
  --sub-domain-settings prefix=,branchName=main prefix=www,branchName=main
```

Amplify will print the verification CNAMEs. Add them at your DNS
provider. Once verified, the cert is auto-issued and the storefront is
live at `zerowastestore.com` and `www.zerowastestore.com`.

After the domain is live, also update Medusa's `STORE_CORS` /
`AUTH_CORS` env vars to whitelist the new origin (see HTTPS section
above).

#### 4. Order confirmation emails

The simplest path is **Resend**:

```bash
cd /Volumes/T9/Development/zero-waste-backend
pnpm add @medusajs/notification-resend
```

Add to `medusa-config.ts`:

```ts
modules: {
  [Modules.NOTIFICATION]: {
    resolve: "@medusajs/notification",
    options: {
      providers: [
        {
          resolve: "@medusajs/notification-resend",
          id: "resend",
          options: {
            channels: ["email"],
            api_key: process.env.RESEND_API_KEY,
            from: "orders@zerowastestore.com",
          },
        },
      ],
    },
  },
}
```

Create a subscriber at `src/subscribers/order-placed.ts` that listens to
`order.placed` and calls `notificationModuleService.createNotifications`
with a templated body.

Resend onboarding gives you their `onboarding@resend.dev` for free
sending without verifying a domain. Use that for testing, then verify
your real domain before launch.

Same plumbing serves the password reset flow already in `auth.ts`.

---

### Tier 2 — important before serious traffic

| Item                                            | Why                                                 | Effort |
| ----------------------------------------------- | --------------------------------------------------- | ------ |
| Sales tax (TaxJar / Avalara)                    | Legally required wherever you have nexus            | M      |
| Order history page in `/account`                | Customers need to see what they've bought           | S      |
| Real legal pages (`/about` `/contact` etc.)     | Footer links currently 404                          | S      |
| Inventory display on product pages              | "In Stock" / "Only 3 left" / "Sold Out"             | S      |
| Customer address book at checkout               | Saved addresses pre-filled. Backend supports it.    | M      |
| Backups + Neon PITR check                       | Verify you can recover from data loss               | S      |
| Robots.txt + sitemap.xml                        | SEO basics                                          | XS     |

---

### Tier 3 — polish + growth

| Item                                            | Notes                                                  |
| ----------------------------------------------- | ------------------------------------------------------ |
| Real reviews (Stamped / Yotpo / homegrown)      | Remove the fake "159 reviews" placeholders             |
| Search (MeiliSearch / Algolia)                  | No way to search the catalog right now                 |
| SEO metadata + Product structured data          | Per-product OG tags, JSON-LD                           |
| Sentry error monitoring                         | Storefront + backend                                   |
| Analytics (Plausible / GA)                      | Conversion funnel visibility                           |
| Email marketing capture                         | Newsletter signup in the footer goes nowhere           |
| Drafts → published                              | 43 of 124 products are drafts. Bulk publish in admin   |
| Tag cleanup                                     | 118 imported Shopify tags, lots of redundancy          |

---

## Decisions I need from you to finish Tier 1

When you're ready to resume, answer these and I can power through it:

1. **Domain name** for the backend API (e.g. `api.zerowastestore.com`).
2. **Storefront domain** — same root or different? (e.g.
   `zerowastestore.com` for the storefront.)
3. **Stripe**: do you have an account? Send me `pk_test_...` and
   `sk_test_...` to start in test mode. We can flip to live keys with
   one config change.
4. **Email**: Resend or AWS SES? If Resend, an API key. If SES, I can
   provision via your nexvato AWS account but you need to verify the
   sending domain.
5. **Sending email address** (e.g. `orders@zerowastestore.com`).

---

## How to resume in a new session

1. Read this file top to bottom.
2. Read `ARCHITECTURE.md` for how the code is laid out.
3. Check the latest deploy:
   ```bash
   aws --profile nexvato amplify list-jobs \
     --app-id d1g9qtg3mg0h8g --branch-name main --max-items 3 \
     --query 'jobSummaries[*].[jobId,status,startTime]' --output table
   ```
4. Confirm the cart is still broken (mixed content) — open the live URL
   and watch the console.
5. Pick the first unchecked Tier 1 item and execute it.

## How to redeploy from scratch

```bash
# Storefront — Amplify auto-deploys on push to main
cd /Volumes/T9/Development/zero-waste
git push origin main
# then watch:
aws --profile nexvato amplify start-job --app-id d1g9qtg3mg0h8g \
  --branch-name main --job-type RELEASE

# Backend — push to GitHub then deploy to EC2
cd /Volumes/T9/Development/zero-waste-backend
git push origin main
EC2_HOST=34.229.205.244 KEY=~/.ssh/zero-waste-ec2 bash deploy/push.sh

# Database — Medusa migrations run on backend deploy via systemd
# Ad-hoc DB scripts: medusa exec ./src/scripts/<file>.ts
```

## How to re-import products from a Shopify CSV

```bash
cd /Volumes/T9/Development/zero-waste-backend

# 1. Drop the new CSV in /Users/jonathanmohon/Downloads/products_export_1.csv
#    (or pass --csv path/to/file.csv)
# 2. Re-build the import data + download new images:
python3 scripts/build-import-data.py

# 3. Run the import (wipes existing products + categories + tags first):
DATABASE_URL=<local or neon> npx medusa exec ./src/scripts/import-products.ts

# 4. Commit and push the new webp images:
cd ../zero-waste
git add public/products
git commit -m "refresh product images"
git push
```

---

## Files / scripts you should know about

### Storefront (`zero-waste/`)
- `src/lib/medusa.ts` — Medusa SDK client + product/region helpers
- `src/lib/auth.ts` — customer auth helpers (signup/login/logout/etc.)
- `src/lib/cart.ts` — cart business logic (create/retrieve/add/update/remove)
- `src/lib/checkout.ts` — checkout flow (address/shipping/payment/complete)
- `src/lib/types.ts` — local types mirroring Medusa store API shapes
- `src/components/auth/auth-provider.tsx` — auth context
- `src/components/cart/cart-provider.tsx` — cart context (+ logout reset)
- `src/components/checkout/checkout-form.tsx` — single-page checkout UI
- `src/components/checkout/order-confirmation.tsx` — order success page

### Backend (`zero-waste-backend/`)
- `src/scripts/seed.ts` — original demo seed (24 hardcoded products)
- `src/scripts/import-products.ts` — CSV import (used for the 124-product run)
- `scripts/build-import-data.py` — CSV → JSON pipeline + image webp conversion
- `scripts/products-import.json` — generated import artifact
- `medusa-config.ts` — module config (where Stripe + Resend would slot in)

---

_Last updated: 2026-04-11. Single source of truth — keep it current as
the project evolves._
