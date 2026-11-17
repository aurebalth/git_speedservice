import { ADULT_CATALOG } from '../../src/data/adultCatalog.ts';
import { BABY_CATALOG } from '../../src/data/babyCatalog.ts';
import { FEMALE_CATALOG } from '../../src/data/femaleCatalog.ts';
import { PET_CATALOG } from '../../src/data/petCatalog.ts';

const catalogs = [ADULT_CATALOG, BABY_CATALOG, FEMALE_CATALOG, PET_CATALOG];
const variantsBySku = new Map();
for (const catalog of catalogs) {
  for (const product of catalog) {
    for (const variant of product.variants || []) {
      const sku = String(variant.sku);
      if (variantsBySku.has(sku)) throw new Error(`SKU dupliqué dans le catalogue: ${sku}`);
      variantsBySku.set(sku, { product, variant });
    }
  }
}

export function priceOrderItems(input) {
  if (!Array.isArray(input) || input.length === 0 || input.length > 100) {
    throw new Error('Le panier est vide ou contient trop de lignes.');
  }
  const seen = new Set();
  const items = input.map((raw) => {
    const sku = String(raw?.sku ?? '').trim();
    const slug = String(raw?.variantSlug ?? '').trim();
    const quantity = Number(raw?.quantity);
    if (!sku || !slug || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error('Une ligne du panier est invalide.');
    }
    if (seen.has(sku)) throw new Error('Le panier contient un SKU en double.');
    seen.add(sku);
    const match = variantsBySku.get(sku);
    if (!match || match.variant.slug !== slug) throw new Error(`Produit ou variante introuvable (${sku}).`);
    if (!match.variant.inStock) throw new Error(`Le produit ${match.product.name} n'est plus disponible.`);
    const unitPrice = Number(match.variant.price);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) throw new Error(`Prix catalogue invalide pour ${sku}.`);
    return {
      sku,
      productId: match.product.id,
      productName: match.product.name,
      label: match.variant.label,
      variantLabel: match.variant.label,
      variantSlug: match.variant.slug,
      quantity,
      unitPrice: Number(unitPrice.toFixed(2)),
      lineTotal: Number((unitPrice * quantity).toFixed(2)),
    };
  });
  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  let shippingFee = 0;
  if (subtotal < 50) {
    shippingFee = itemCount <= 2 ? 1.90 : itemCount <= 5 ? 3.90 : itemCount <= 8 ? 5.90 : 7.90;
  }
  return { items, subtotal, itemCount, shippingFee, total: Number((subtotal + shippingFee).toFixed(2)) };
}
