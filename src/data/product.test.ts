import { describe, expect, it } from 'vitest';
import { product } from '@/data/product';

describe('product merchandising configuration', () => {
  it('uses the friendly identity and customer-facing variant group', () => {
    expect(product.displayName).toBe('Pájaro Interactivo para Gatos');
    expect(product.variantGroupLabel).toBe('Modelo');
    expect(product.errors.noDiscount).toBe(
      'El descuento no se pudo aplicar. El total mostrado es el importe final.',
    );
  });

  it('offers one unit by default and a two-unit pack with a declared 5% discount', () => {
    expect(product.packs).toEqual([
      expect.objectContaining({
        id: 'x1',
        units: 1,
        freeUnits: 0,
        label: '1 unidad',
        default: true,
      }),
      expect.objectContaining({
        id: 'x2',
        units: 2,
        freeUnits: 0,
        label: '2 unidades',
        discountPercent: 5,
        default: false,
      }),
    ]);
    expect(product.packs.filter((pack) => pack.default)).toHaveLength(1);
    expect(product.commerce.bundleOfferActive).toBe(false);
  });
});
