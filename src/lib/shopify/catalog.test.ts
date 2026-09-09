import { describe, expect, it } from 'vitest';
import {
  customerFacingProductTitle,
  toCustomerTitle,
  toCustomerVariantLabel,
} from '@/lib/shopify/catalog';

describe('customer-facing Shopify catalog copy', () => {
  it('keeps the curated product identity instead of exposing Shopify SEO copy', () => {
    expect(
      customerFacingProductTitle(
        'Interactive Cat Toys Flying Bird Cat Toy Rechargeable Chirping Flapping Bird(no Flying)',
      ),
    ).toBe('Pájaro Interactivo para Gatos');
  });

  it.each([
    'Sparrow / China Mainland',
    '  SPARROW / china mainland  ',
    'Sparrow/China   Mainland',
  ])('normalizes the supplier variant %j to Gorrión', (supplierLabel) => {
    expect(toCustomerVariantLabel(supplierLabel)).toBe('Gorrión');
  });

  it('routes non-projection Shopify titles through the variant normalizer', () => {
    expect(toCustomerTitle(' Sparrow / CHINA MAINLAND ', null)).toBe('Gorrión');
  });

  it('does not rewrite an unknown Shopify variant', () => {
    expect(toCustomerVariantLabel('Blue Bird / Spain')).toBe('Blue Bird / Spain');
  });
});
