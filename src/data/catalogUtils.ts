export interface BrandableVariant {
  brand?: string;
  image?: string;
  price?: number;
  inStock?: boolean;
}

export interface BrandableProduct {
  brand?: string;
  variants?: BrandableVariant[];
}

const BRAND_ORDER = [
  'Babylino', 'Pampers', 'Pingo', 'Lotus Baby', 'BabyCare',
  'IASI', 'TENA', 'EveryDay', 'Pom Pon', 'RISPET',
];

export function getBrandSlug(brand: string): string {
  return brand
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' et ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getVariantBrand(product: BrandableProduct, variant?: BrandableVariant): string {
  return (variant?.brand || product.brand || 'Autres marques').trim();
}

export function getProductBrands(product: BrandableProduct): string[] {
  const names = new Set<string>();
  for (const variant of product.variants || []) names.add(getVariantBrand(product, variant));
  if (names.size === 0 && product.brand) names.add(product.brand.trim());
  return [...names];
}

export function getCatalogBrands<T extends BrandableProduct>(catalog: T[]): string[] {
  const names = new Set<string>();
  for (const product of catalog) {
    for (const brand of getProductBrands(product)) names.add(brand);
  }
  return [...names].sort((a, b) => {
    const ai = BRAND_ORDER.indexOf(a);
    const bi = BRAND_ORDER.indexOf(b);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return a.localeCompare(b, 'fr');
  });
}

export function getBrandProducts<T extends BrandableProduct>(catalog: T[], brand: string): T[] {
  return catalog.filter((product) =>
    (product.variants || []).some((variant) => getVariantBrand(product, variant) === brand)
  );
}

export function getBrandVariantCount<T extends BrandableProduct>(catalog: T[], brand: string): number {
  return catalog.reduce(
    (total, product) => total + (product.variants || []).filter((variant) => getVariantBrand(product, variant) === brand).length,
    0,
  );
}
