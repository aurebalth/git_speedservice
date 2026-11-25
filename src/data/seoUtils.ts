export const SEO_SITE_URL = 'https://speedservices.store';

export interface SeoProductVariant {
  label: string;
  price: number;
  inStock?: boolean;
  sku?: string;
  slug?: string;
  image?: string;
  detailedDescription?: string;
}

export interface SeoCatalogProduct {
  name: string;
  category?: string;
  subCategory?: string;
  description?: string;
  variants: SeoProductVariant[];
}

export function formatSeoPrice(value: number): string {
  return Number(value).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function truncateSeoText(value: string, maxLength = 155): string {
  const clean = String(value || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const shortened = clean.slice(0, maxLength - 1).replace(/\s+\S*$/, '').trim();
  return `${shortened}…`;
}

export function getPackUnitCount(label: string): number | null {
  const unitPattern = '(?:unit[eé]s?|couches?|pi[eè]ces?|serviettes?)';
  const compound = label.match(new RegExp(`(\\d+)\\s*[x×]\\s*(\\d+)\\s*${unitPattern}`, 'i'));
  if (compound) return Number(compound[1]) * Number(compound[2]);
  const simple = label.match(new RegExp(`(\\d+)\\s*${unitPattern}`, 'i'));
  return simple ? Number(simple[1]) : null;
}

export function isBabyDiaperProduct(product: SeoCatalogProduct): boolean {
  const context = `${product.category || ''} ${product.name || ''} ${product.subCategory || ''}`.toLocaleLowerCase('fr');
  return context.includes('bebe')
    && /(couche|culotte)/i.test(context)
    && !/(lingette|al[eè]se|soin)/i.test(context);
}

export function getPricePerBabyDiaper(product: SeoCatalogProduct, variant: SeoProductVariant): number | null {
  if (!isBabyDiaperProduct(product)) return null;
  const count = getPackUnitCount(variant.label || '');
  if (!count || count <= 0 || !Number.isFinite(Number(variant.price))) return null;
  return Number(variant.price) / count;
}

export function getAbsoluteSeoImage(image?: string): string | undefined {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SEO_SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

function cleanProductLine(name: string, brandName: string): string {
  const cleaned = String(name || '').replace(/\s+/g, ' ').trim();
  if (cleaned.toLocaleLowerCase('fr').includes(brandName.toLocaleLowerCase('fr'))) return cleaned;
  return `${brandName} ${cleaned}`;
}

function getCompactVariantLabel(label: string, brandName: string): string {
  const normalized = String(label || '').replace(/\s+/g, ' ').trim();
  const sizeMatch = normalized.match(/Taille\s*([^,\s(]+)(?:\s*\(([^)]*)\))?/i);
  const size = sizeMatch ? `T${sizeMatch[1].trim()}` : '';
  const weightMatch = normalized.match(/\(([^)]*(?:kg|ans?|mois)[^)]*)\)/i);
  const weight = weightMatch ? weightMatch[1].replace(/\s+/g, '') : '';
  const count = getPackUnitCount(normalized);
  const countText = count ? `${count}u` : '';

  if (size) return [size, weight, countText].filter(Boolean).join(' ');
  if (brandName.toLocaleLowerCase('fr') === 'babycare') {
    const family = /natura/i.test(normalized) ? 'Natura' : /aqua\s+pure/i.test(normalized) ? 'Aqua Pure' : 'BabyCare';
    const qualifier = /sans\s+plastique/i.test(normalized) ? 'sans plastique' : /karit[eé]/i.test(normalized) ? 'karité' : /argan/i.test(normalized) ? 'argan' : '';
    return [family, qualifier, countText].filter(Boolean).join(' ');
  }

  if (brandName.toLocaleLowerCase('fr') === 'iasi' && /\d{2,3}\s*[x×]\s*\d{2,3}\s*cm/i.test(normalized)) {
    const dimensions = normalized.match(/(\d{2,3})\s*[x×]\s*(\d{2,3})\s*cm/i);
    const sizeText = dimensions ? `${dimensions[1]}×${dimensions[2]}` : '';
    const qualifier = /\bmaxi\b/i.test(normalized)
      ? 'MAXI'
      : /confort\s+parfum/i.test(normalized)
        ? 'Parfum'
        : '';
    return [qualifier, sizeText, countText].filter(Boolean).join(' ');
  }

  const withoutCount = normalized
    .replace(/\(?\s*\d+\s*(?:unit[eé]s?|couches?|pi[eè]ces?|serviettes?)\s*\)?/i, '')
    .replace(/\([^)]{9,}\)/g, '')
    .replace(/\s*[-–—] *$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return [countText, withoutCount].filter(Boolean).join(' ');
}

function getSeoProductType(product: SeoCatalogProduct): string {
  const name = `${product.name || ''} ${product.subCategory || ''}`.toLocaleLowerCase('fr');
  const category = String(product.category || '').toLocaleLowerCase('fr');
  if (isBabyDiaperProduct(product)) return 'Couches bébé';
  if (category.includes('bebe')) {
    if (name.includes('lingette')) return 'Lingettes bébé';
    if (name.includes('alèse') || name.includes('alese')) return 'Alèses bébé';
    return 'Produits bébé';
  }
  if (category.includes('adulte')) {
    if (name.includes('alèse') || name.includes('alese')) return 'Alèses de protection';
    if (name.includes('culotte')) return 'Culottes absorbantes';
    if (name.includes('slip')) return 'Slips absorbants';
    if (name.includes('anatomique')) return 'Protections anatomiques';
    if (name.includes('change complet')) return 'Changes complets';
    return 'Protections adultes';
  }
  if (category.includes('feminin') || category.includes('féminin')) {
    if (name.includes('serviette')) return 'Serviettes';
    if (name.includes('protège')) return 'Protège-slips';
    if (name.includes('lingette')) return 'Lingettes';
    return 'Hygiène féminine';
  }
  if (name.includes('tapis')) return 'Tapis animaux';
  if (name.includes('lingette')) return 'Lingettes animaux';
  if (name.includes('entretien')) return 'Entretien animaux';
  return 'Produits pour animaux';
}

function getSeoProductModel(product: SeoCatalogProduct, variant: SeoProductVariant, brandName: string): string {
  if (brandName.toLocaleLowerCase('fr') === 'babycare') return '';
  const productName = String(product.name || '').replace(/\s+/g, ' ').trim();
  const brandPosition = productName.toLocaleLowerCase('fr').indexOf(brandName.toLocaleLowerCase('fr'));
  if (brandPosition >= 0) {
    const afterBrand = productName.slice(brandPosition + brandName.length).replace(/^[\s:–—-]+/, '').replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
    if (afterBrand) {
      const normalizedAfter = afterBrand
        .replace(/Paquet Normal/gi, 'Normal')
        .replace(/Format Éco/gi, 'Éco')
        .replace(/Premium Culotte Pants/gi, 'Premium Pants')
        .trim();
      if (normalizedAfter.toLocaleLowerCase('fr') === 'traverse') return normalizedAfter;
      return normalizedAfter;
    }
    if (String(product.category || '').toLocaleLowerCase('fr').includes('adulte')) {
      const beforeWords = productName.slice(0, brandPosition)
        .replace(/[&]/g, ' ')
        .replace(/[()]/g, ' ')
        .split(/\s+/)
        .filter((word) => word && !['de', 'du', 'des', 'la', 'le', 'les', 'et', 'pour'].includes(word.toLocaleLowerCase('fr')));
      return beforeWords.slice(-2).join(' ');
    }
    return '';
  }
  const label = String(variant.label || '').replace(/\s+/g, ' ').trim();
  const labelBrandPosition = label.toLocaleLowerCase('fr').indexOf(brandName.toLocaleLowerCase('fr'));
  if (labelBrandPosition >= 0) {
    return label.slice(labelBrandPosition + brandName.length).replace(/^[\s:–—-]+/, '').replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  if (!/^Taille\s/i.test(label)) {
    return label
      .replace(/\s*[-–—]\s*\d+\s*(?:unit[eé]s?|couches?|pi[eè]ces?|serviettes?)\s*$/i, '')
      .replace(/\s*\(?\d+\s*(?:unit[eé]s?|couches?|pi[eè]ces?|serviettes?)\s*\)?/i, '')
      .replace(/^(?:lingettes?|alèses? de change|serviettes?)\s+/i, '')
      .trim();
  }
  return '';
}

export function buildProductSeo(product: SeoCatalogProduct, variant: SeoProductVariant, brandName: string) {
  const productLine = cleanProductLine(product.name, brandName);
  const fullLabel = String(variant.label || '').replace(/\s+/g, ' ').trim();
  const completeName = `${productLine} – ${fullLabel}`.replace(/\s+/g, ' ').trim();
  const compactVariant = getCompactVariantLabel(fullLabel, brandName);
  const productType = getSeoProductType(product);
  const productModel = getSeoProductModel(product, variant, brandName);
  // For IASI, the dimensions / pack details distinguish each traverse variant,
  // so they are deliberately placed before the generic range name in the title.
  const isIasiTraverse = brandName.toLocaleLowerCase('fr') === 'iasi' && /traverse/i.test(productModel);
  const isBabyCare = brandName.toLocaleLowerCase('fr') === 'babycare';
  const titleCore = (isBabyCare
    ? `${productType} ${brandName} ${compactVariant}`
    : isIasiTraverse
      ? `${productType} ${brandName} ${compactVariant} ${productModel}`
      : `${productType} ${brandName} ${productModel} ${compactVariant}`)
    .replace(/\s+/g, ' ')
    .trim();
  const suffix = ' | Speed Services';
  const title = `${truncateSeoText(titleCore, 76 - suffix.length)}${suffix}`;
  const priceText = `${formatSeoPrice(variant.price)} € TTC`;
  const count = getPackUnitCount(fullLabel);
  const perDiaper = getPricePerBabyDiaper(product, variant);
  const isBabyDiaper = isBabyDiaperProduct(product);
  const priceSentence = isBabyDiaper
    ? `Prix bas : ${priceText}.${perDiaper === null ? '' : ` Soit ${formatSeoPrice(perDiaper)} € par couche.`}`
    : `Prix : ${priceText}.`;
  const sourceText = String(variant.detailedDescription || product.description || '').replace(/\s+/g, ' ').trim();
  const description = truncateSeoText(
    `${completeName}. ${priceSentence} ${sourceText}`,
    158,
  );
  return { title, description, completeName, priceText, count, perDiaper };
}

const BRAND_KEYWORDS: Record<string, string> = {
  Babylino: 'Couches bébé Babylino',
  Pampers: 'Couches bébé Pampers',
  PINGO: 'Couches bébé Pingo',
  'Lotus Baby': 'Couches bébé Lotus Baby',
  BabyCare: 'Lingettes et soins bébé BabyCare',
  TENA: 'Protections adultes TENA',
  IASI: 'Protections absorbantes adultes IASI',
  EveryDay: 'Serviettes hygiéniques EveryDay',
  'Pom Pon': 'Lingettes démaquillantes Pom Pon',
  RISPET: 'Hygiène et soins pour animaux RISPET',
};

export function buildBrandSeo(brandName: string, productNames: string[], minimumPrice?: number) {
  const normalizedBrand = brandName.trim().toLocaleLowerCase('fr');
  const keyword = Object.entries(BRAND_KEYWORDS).find(([name]) => name.toLocaleLowerCase('fr') === normalizedBrand)?.[1] || `Produits ${brandName.trim()}`;
  const title = `${truncateSeoText(`${keyword} : gammes et prix TTC`, 70 - ' | Speed Services'.length)} | Speed Services`;
  const lines = [...new Set(productNames)].slice(0, 3).join(', ');
  const price = Number.isFinite(minimumPrice) ? ` Prix dès ${formatSeoPrice(minimumPrice as number)} € TTC.` : '';
  const description = truncateSeoText(
    `${keyword}. Retrouvez ${lines || `la sélection ${brandName}`} chez Speed Services. Comparez les formats et profitez de prix compétitifs affichés TTC.${price}`, 
    158,
  );
  return { title, description, keyword };
}

export function buildGroupSeo(product: SeoCatalogProduct, brandNames: string[], minimumPrice: number) {
  const brandPhrase = brandNames.length === 1
    ? `de la marque ${brandNames[0]}`
    : brandNames.length > 1 ? `des marques ${brandNames.join(', ')}` : '';
  const title = `${truncateSeoText(`${product.name} : tailles et prix TTC`, 70 - ' | Speed Services'.length)} | Speed Services`;
  const description = truncateSeoText(
    `${product.name}${brandPhrase ? ` ${brandPhrase}` : ''}. ${product.description || 'Consultez les formats disponibles.'} Prix compétitifs et affichés TTC, dès ${formatSeoPrice(minimumPrice)} € chez Speed Services.`,
    158,
  );
  return { title, description };
}

export function buildUniverseSeo(title: string, description: string, minimumPrice?: number) {
  const isBaby = title.toLocaleLowerCase('fr').includes('couches bébé');
  const pageTitle = `${truncateSeoText(`${title} : marques, formats et ${isBaby ? 'prix bas' : 'prix compétitifs'} TTC`, 70 - ' | Speed Services'.length)} | Speed Services`;
  const priceText = Number.isFinite(minimumPrice) ? ` Prix à partir de ${formatSeoPrice(minimumPrice as number)} € TTC.` : '';
  const pageDescription = truncateSeoText(`${description} Comparez les références et les formats, avec des prix ${isBaby ? 'bas' : 'compétitifs'} affichés TTC chez Speed Services.${priceText}`, 158);
  return { title: pageTitle, description: pageDescription };
}
