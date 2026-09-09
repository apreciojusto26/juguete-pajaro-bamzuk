import type { CartSnapshot, PackProjection, VariantOption } from '@/lib/shopify/types';
import type { PricePack } from '@/types/content';

/**
 * The ONLY place a pre-cart price is computed. Pure, shared by both islands
 * via use-selection.ts so BundleSelector and StickyAddToCart can never disagree.
 * Superseded by cart.cost only when that cart contains the exact selected
 * variant and quantity.
 */
export function projectPack(v: VariantOption, pack: PricePack, offerActive: boolean): PackProjection {
  const totalUnits = pack.units + pack.freeUnits;
  const claimsFreeUnits = offerActive && pack.freeUnits > 0;
  const paidUnits = claimsFreeUnits ? pack.units : totalUnits; // honest when BXGY is off
  const configuredDiscountPercent = pack.discountPercent ?? 0;
  if (configuredDiscountPercent < 0 || configuredDiscountPercent > 100) {
    throw new RangeError(
      `Pack discountPercent must be between 0 and 100; received ${configuredDiscountPercent}`,
    );
  }
  const effectiveDiscountPercent = offerActive ? configuredDiscountPercent : 0;

  const basePriceCents = v.unitPriceCents * paidUnits;
  // BXGY wins when active: applying both would silently stack two promotions.
  // Otherwise round the final percentage-adjusted total to the nearest cent.
  const priceCents = claimsFreeUnits
    ? basePriceCents
    : Math.round(basePriceCents * ((100 - effectiveDiscountPercent) / 100));
  const compareAtCents = (v.unitCompareAtCents ?? v.unitPriceCents) * totalUnits;

  return {
    packId: pack.id,
    totalUnits,
    paidUnits,
    priceCents,
    compareAtCents,
    savingsCents: Math.max(0, compareAtCents - priceCents),
    claimsFreeUnits,
  };
}

/**
 * Badge copy derives from the same configuration that changes price. Once an
 * authoritative cart exists, suppress the claim unless Shopify confirms the
 * exact projected total.
 */
export function packDiscountBadge(
  pack: PricePack,
  projection: PackProjection,
  authoritativeCart: CartSnapshot | null,
  offerActive: boolean,
): string | null {
  if (!offerActive || !pack.discountPercent) return null;
  if (
    authoritativeCart !== null &&
    (authoritativeCart.discountCents <= 0 || authoritativeCart.totalCents !== projection.priceCents)
  ) {
    return null;
  }
  return `${pack.discountPercent}% de descuento`;
}

/** A cart total is authoritative only for the exact selection it contains. */
export function isCartSelectionMatch(
  cart: CartSnapshot | null,
  variantId: string,
  totalUnits: number,
): boolean {
  return !!cart?.line && cart.line.variantId === variantId && cart.line.quantity === totalUnits;
}

/** Central price-source rule shared by every selection surface. */
export function resolveSelectionTotalCents(
  cart: CartSnapshot | null,
  variantId: string,
  projection: PackProjection,
): number {
  return isCartSelectionMatch(cart, variantId, projection.totalUnits)
    ? cart!.totalCents
    : projection.priceCents;
}

/** Restores the merchandising selection represented by a Shopify cart line. */
export function findPackByTotalQuantity(
  packs: readonly PricePack[],
  quantity: number,
): PricePack | undefined {
  return packs.find((pack) => pack.units + pack.freeUnits === quantity);
}

/** Percentage-only offers must never inherit the legacy BXGY progress UI. */
export function shouldShowGiftProgress(pack: PricePack, offerActive: boolean): boolean {
  return offerActive && pack.freeUnits > 0;
}

/** Avoids promising savings before the Shopify offer has passed its launch gate. */
export function packSelectorHeading(offerActive: boolean): string {
  return offerActive ? 'Compra más y ahorra' : 'Elige la cantidad';
}

/** Suppresses "gratis" pack copy until BXGY is verified live in Shopify admin (design decision #9). */
export function packDisplayLabel(pack: PricePack, projection: PackProjection): string {
  if (projection.claimsFreeUnits) return pack.label;
  return `${projection.totalUnits} ${projection.totalUnits === 1 ? 'unidad' : 'unidades'}`;
}
