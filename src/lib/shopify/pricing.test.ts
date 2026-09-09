import { describe, expect, it } from 'vitest';
import {
  findPackByTotalQuantity,
  isCartSelectionMatch,
  packDiscountBadge,
  packSelectorHeading,
  projectPack,
  resolveSelectionTotalCents,
  shouldShowGiftProgress,
} from '@/lib/shopify/pricing';
import type { CartSnapshot, VariantOption } from '@/lib/shopify/types';
import type { PricePack } from '@/types/content';

const variant: VariantOption = {
  id: 'gid://shopify/ProductVariant/sparrow',
  title: 'Gorrión',
  projectionCount: null,
  optionValue: 'Gorrión',
  availableForSale: true,
  unitPriceCents: 771,
  unitCompareAtCents: null,
  imageIndex: null,
};

const oneUnit: PricePack = {
  id: 'x1',
  units: 1,
  freeUnits: 0,
  label: '1 unidad',
  default: true,
};

const twoUnits: PricePack = {
  id: 'x2',
  units: 2,
  freeUnits: 0,
  label: '2 unidades',
  discountPercent: 5,
};

function cart(overrides: Partial<CartSnapshot> = {}): CartSnapshot {
  return {
    id: 'cart',
    checkoutUrl: 'https://example.test/checkout',
    totalQuantity: 2,
    subtotalCents: 1542,
    totalCents: 1465,
    discountCents: 77,
    line: { id: 'line', variantId: variant.id, quantity: 2 },
    ...overrides,
  };
}

describe('pack offer gate', () => {
  it('does not promise savings in the selector heading while the offer is inactive', () => {
    expect(packSelectorHeading(false)).toBe('Elige la cantidad');
    expect(packSelectorHeading(true)).toBe('Compra más y ahorra');
  });

  it('keeps both packs at full Shopify unit price while the offer is inactive', () => {
    expect(projectPack(variant, oneUnit, false)).toMatchObject({
      totalUnits: 1,
      priceCents: 771,
      savingsCents: 0,
    });
    const projection = projectPack(variant, twoUnits, false);
    expect(projection).toMatchObject({ totalUnits: 2, priceCents: 1542, savingsCents: 0 });
    expect(packDiscountBadge(twoUnits, projection, null, false)).toBeNull();
  });

  it('projects and announces 5% only after the offer gate is active', () => {
    const projection = projectPack(variant, twoUnits, true);
    expect(projection).toMatchObject({ totalUnits: 2, priceCents: 1465, savingsCents: 77 });
    expect(packDiscountBadge(twoUnits, projection, null, true)).toBe('5% de descuento');
  });

  it('keeps the one-unit pack undiscounted when the offer is active', () => {
    const projection = projectPack(variant, oneUnit, true);
    expect(projection.priceCents).toBe(771);
    expect(packDiscountBadge(oneUnit, projection, null, true)).toBeNull();
  });

  it('does not expose legacy gift progress for a percentage-only offer', () => {
    expect(shouldShowGiftProgress(twoUnits, true)).toBe(false);
    expect(
      shouldShowGiftProgress(
        { id: 'x2-plus-one', units: 2, freeUnits: 1, label: '2 + 1 gratis' },
        true,
      ),
    ).toBe(true);
    expect(
      shouldShowGiftProgress(
        { id: 'x2-plus-one', units: 2, freeUnits: 1, label: '2 + 1 gratis' },
        false,
      ),
    ).toBe(false);
  });

  it('keeps the badge only when a matching authoritative cart confirms the discount', () => {
    const projection = projectPack(variant, twoUnits, true);
    expect(packDiscountBadge(twoUnits, projection, cart(), true)).toBe('5% de descuento');
    expect(
      packDiscountBadge(
        twoUnits,
        projection,
        cart({ totalCents: 1542, discountCents: 0 }),
        true,
      ),
    ).toBeNull();
  });
});

describe('authoritative cart selection', () => {
  const projection = projectPack(variant, twoUnits, true);

  it('uses cart total only when variant and quantity match the selection', () => {
    const matchingCart = cart({ totalCents: 1400 });
    expect(isCartSelectionMatch(matchingCart, variant.id, projection.totalUnits)).toBe(true);
    expect(resolveSelectionTotalCents(matchingCart, variant.id, projection)).toBe(1400);
  });

  it('keeps the projection for a mismatched variant or quantity', () => {
    const wrongVariant = cart({
      line: { id: 'line', variantId: 'gid://shopify/ProductVariant/other', quantity: 2 },
    });
    const wrongQuantity = cart({
      line: { id: 'line', variantId: variant.id, quantity: 1 },
    });

    expect(isCartSelectionMatch(wrongVariant, variant.id, projection.totalUnits)).toBe(false);
    expect(isCartSelectionMatch(wrongQuantity, variant.id, projection.totalUnits)).toBe(false);
    expect(resolveSelectionTotalCents(wrongVariant, variant.id, projection)).toBe(projection.priceCents);
    expect(resolveSelectionTotalCents(wrongQuantity, variant.id, projection)).toBe(projection.priceCents);
  });

  it('restores x1 and x2 selection by the authoritative cart quantity', () => {
    expect(findPackByTotalQuantity([oneUnit, twoUnits], 1)?.id).toBe('x1');
    expect(findPackByTotalQuantity([oneUnit, twoUnits], 2)?.id).toBe('x2');
    expect(findPackByTotalQuantity([oneUnit, twoUnits], 3)).toBeUndefined();
  });
});
