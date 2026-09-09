# bamzuk.com — headless Shopify landing

Astro (`output: static`, no adapter) landing page with a Shopify Storefront API
commerce layer. Catalog data is fetched at **build time**; cart mutations run
**client-side**; checkout is Shopify-hosted (no custom checkout UI).

## Environment variables

Copy `.env.example` to `.env` and fill in the real Storefront token:

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SHOPIFY_STORE_DOMAIN` | The `*.myshopify.com` domain (not the custom domain) — the Storefront GraphQL endpoint is canonically served there. |
| `PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Storefront API **public** access token (scope `unauthenticated_*` only). Generate in Shopify Admin → Apps → Develop apps (or the Headless sales channel). Never the Admin API token. |
| `PUBLIC_SHOPIFY_API_VERSION` | Pinned Storefront API version, e.g. `2026-07`. Bump when Shopify deprecates the pinned quarter. |

All three MUST be `PUBLIC_`-prefixed — `src/lib/shopify/client.ts` runs both at
build time (Node) and in the browser (client-side cart), and only
`PUBLIC_`-prefixed vars are inlined into the client bundle by Vite.

`npm run build` fails loudly (no stale-data fallback) if any var is missing,
the token is invalid, or the product handle doesn't resolve.

## Deployment (Vercel)

- Framework preset: Astro. Build command `npm run build`, output `dist/`,
  install `npm ci`, Node 22.x. No `vercel.json`, no `@astrojs/vercel` adapter.
- Set the 3 env vars above in both **Production** and **Preview** environments,
  entered directly in the Vercel dashboard — never committed.
- They are inlined at build time, so rotating the token requires a redeploy,
  not just an env edit.

## Catalog-freshness webhook

Editing the product in Shopify Admin should trigger an automatic rebuild:

1. **Vercel** → Project → Settings → Git → Deploy Hooks → create a hook named
   `shopify-products-update`, branch `main`. Treat the generated URL as a
   secret — never commit it.
2. **Shopify Admin** → Settings → Notifications → Webhooks → Create webhook →
   event `Product update`, format `JSON`, URL = the Deploy Hook URL from step 1.

No HMAC verification is possible without a server — acceptable here, because
the endpoint only triggers a rebuild and trusts no payload content (the
rebuild re-queries Shopify itself). Worst case from a leaked URL is rebuild
spam; Vercel dedupes concurrent builds.

## Two-unit discount

`src/data/product.ts` declares a `5%` merchandising discount for the two-unit
pack, but `commerce.bundleOfferActive` remains `false` until the matching
automatic quantity discount exists and has been verified in Shopify Admin.
While the gate is off, both quantity options remain available, but the landing
shows the full Shopify unit total: no discount badge, savings copy or projected
price reduction.

**Activation gate:**

1. Configure the automatic 5% discount for quantity 2 in Shopify Admin.
2. Add two units to a real cart and verify that `cart.cost.totalAmount` and
   `discountAllocations` contain the expected discount.
3. Change `commerce.bundleOfferActive` to `true` and redeploy.

With the gate active, the initial card price is a projection from Shopify's
current unit price; no custom checkout price is created or sent to Shopify.
Once the exact selected variant and quantity exist in a cart,
`cart.cost.totalAmount` is authoritative. The UI replaces the projection with
that total and hides the discount badge if Shopify does not confirm it.

The legacy gift/BXGY progress UI additionally requires `freeUnits > 0`.
Therefore this percentage-only offer never shows "2 + 1 gratis" or gift
progress, even after `bundleOfferActive` is enabled.
