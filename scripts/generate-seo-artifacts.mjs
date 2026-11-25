import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = 'https://speedservices.store';
const htmlTemplate = await readFile(path.join(dist, 'index.html'), 'utf8');

const vite = await createServer({
  configFile: path.join(root, 'vite.config.ts'),
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const escapeXml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const jsonForHtml = (value) => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
const absoluteImage = (image) => /^https?:\/\//i.test(image || '') ? image : `${site}${String(image || '').startsWith('/') ? '' : '/'}${image || ''}`;
const priceText = (value) => Number(value).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const packCount = (label) => {
  const compound = String(label || '').match(/(\d+)\s*[x×]\s*(\d+)\s*unit[eé]s?/i);
  if (compound) return Number(compound[1]) * Number(compound[2]);
  const simple = String(label || '').match(/(\d+)\s*unit[eé]s?/i);
  return simple ? Number(simple[1]) : null;
};
const isBabyDiaper = (product) => {
  const text = `${product.category || ''} ${product.name || ''} ${product.subCategory || ''}`.toLocaleLowerCase('fr');
  return text.includes('bebe') && /(couche|culotte)/i.test(text) && !/(lingette|al[eè]se|soin)/i.test(text);
};
const perDiaperPrice = (product, variant) => {
  if (!isBabyDiaper(product)) return null;
  const count = packCount(variant.label);
  return count && count > 0 ? Number(variant.price) / count : null;
};
const unique = (values) => [...new Set(values.filter(Boolean))];

function setMeta(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function prepareHtml({ title, description, canonical, type = 'website', image, jsonLd = [], body }) {
  let html = htmlTemplate;
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title data-seo-prerender="true">${escapeHtml(title)}</title>`);
  html = setMeta(html, /<meta\s+name="description"[^>]*>/i, `<meta data-seo-prerender="true" name="description" content="${escapeHtml(description)}" />`);
  html = setMeta(html, /<meta\s+name="robots"[^>]*>/i, '<meta data-seo-prerender="true" name="robots" content="index,follow,max-image-preview:large" />');
  html = setMeta(html, /<link\s+rel="canonical"[^>]*>/i, `<link data-seo-prerender="true" rel="canonical" href="${escapeHtml(canonical)}" />`);
  html = setMeta(html, /<meta\s+property="og:site_name"[^>]*>/i, '<meta data-seo-prerender="true" property="og:site_name" content="Speed Services" />');
  html = setMeta(html, /<meta\s+property="og:locale"[^>]*>/i, '<meta data-seo-prerender="true" property="og:locale" content="fr_FR" />');
  html = setMeta(html, /<meta\s+property="og:title"[^>]*>/i, `<meta data-seo-prerender="true" property="og:title" content="${escapeHtml(title)}" />`);
  html = setMeta(html, /<meta\s+property="og:description"[^>]*>/i, `<meta data-seo-prerender="true" property="og:description" content="${escapeHtml(description)}" />`);
  html = setMeta(html, /<meta\s+property="og:type"[^>]*>/i, `<meta data-seo-prerender="true" property="og:type" content="${escapeHtml(type)}" />`);
  html = setMeta(html, /<meta\s+property="og:url"[^>]*>/i, `<meta data-seo-prerender="true" property="og:url" content="${escapeHtml(canonical)}" />`);
  if (image) {
    html = setMeta(html, /<meta\s+(?:data-seo-prerender="true"\s+)?property="og:image"[^>]*>/i, `<meta data-seo-prerender="true" property="og:image" content="${escapeHtml(image)}" />`);
    html = setMeta(html, /<meta\s+(?:data-seo-prerender="true"\s+)?property="og:image:alt"[^>]*>/i, `<meta data-seo-prerender="true" property="og:image:alt" content="${escapeHtml(title)}" />`);
  }
  html = setMeta(html, /<meta\s+name="twitter:card"[^>]*>/i, '<meta data-seo-prerender="true" name="twitter:card" content="summary_large_image" />');
  html = setMeta(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta data-seo-prerender="true" name="twitter:title" content="${escapeHtml(title)}" />`);
  html = setMeta(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta data-seo-prerender="true" name="twitter:description" content="${escapeHtml(description)}" />`);
  if (image) html = setMeta(html, /<meta\s+name="twitter:image"[^>]*>/i, `<meta data-seo-prerender="true" name="twitter:image" content="${escapeHtml(image)}" />`);
  const scripts = jsonLd.map((item) => `<script data-seo-prerender="true" type="application/ld+json">${jsonForHtml(item)}</script>`).join('\n');
  html = html.replace('</head>', `${scripts}\n</head>`);
  const rootMarkup = `<div id="root">${body}</div>`;
  return html.replace('<div id="root"></div>', rootMarkup);
}

async function writeRoute(route, html) {
  const directory = route === '/' ? dist : path.join(dist, route.replace(/^\/+/, ''));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html, 'utf8');
}

const universeDefinitions = [
  { key: 'baby', path: '/produit/couches/bebe', title: 'Couches bébé', catalogModule: '/src/data/babyCatalog.ts', exportName: 'BABY_CATALOG', description: 'Couches bébé classiques, couches-culottes, formats économiques et produits de change de plusieurs marques. Comparez les tailles, le nombre d’unités et les prix TTC.' },
  { key: 'female', path: '/produit/hygiene-feminine', title: 'Hygiène féminine', catalogModule: '/src/data/femaleCatalog.ts', exportName: 'FEMALE_CATALOG', description: 'Serviettes hygiéniques, protège-slips et produits d’hygiène féminine. Consultez les formats, les conditionnements et les prix TTC.' },
  { key: 'adult', path: '/produit/incontinence-adultes', title: 'Incontinence et protections adultes', catalogModule: '/src/data/adultCatalog.ts', exportName: 'ADULT_CATALOG', description: 'Protections absorbantes pour adultes, slips absorbants et protections anatomiques. Comparez les références, tailles et prix TTC.' },
  { key: 'pet', path: '/produit/petcare', title: 'Hygiène et soins pour animaux', catalogModule: '/src/data/petCatalog.ts', exportName: 'PET_CATALOG', description: 'Tapis absorbants, lingettes et produits d’hygiène pour animaux. Découvrez les formats et les prix TTC.' },
];

let pageCount = 0;
let productCount = 0;
const sitemapEntries = new Map();

function addSitemapEntry(route, images = []) {
  const url = `${site}${route === '/' ? '/' : route}`;
  const normalizedImages = unique(images.map(absoluteImage));
  sitemapEntries.set(url, normalizedImages);
}

try {
  const catalogs = {};
  for (const definition of universeDefinitions) {
    const module = await vite.ssrLoadModule(definition.catalogModule);
    catalogs[definition.key] = module[definition.exportName];
  }
  const utils = await vite.ssrLoadModule('/src/data/catalogUtils.ts');
  const seo = await vite.ssrLoadModule('/src/data/seoUtils.ts');
  const { getBrandSlug, getCatalogBrands, getVariantBrand } = utils;
  const { buildBrandSeo, buildGroupSeo, buildUniverseSeo, buildProductSeo, getPackUnitCount, getPricePerBabyDiaper, isBabyDiaperProduct } = seo;

  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'Speed Services', url: `${site}/`, logo: `${site}/favicon.svg`,
    email: 'contact@brandscollectionsbv.com', telephone: '+33773594630',
    contactPoint: { '@type': 'ContactPoint', telephone: '+33773594630', contactType: 'customer service', availableLanguage: ['French'] },
  };
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Speed Services', url: `${site}/`, inLanguage: 'fr-FR' };
  const homeTitle = 'Couches bébé à prix compétitifs, hygiène et protections | Speed Services';
  const homeDescription = 'Couches bébé multi-marques, protections adultes, hygiène féminine et soins pour animaux. Comparez les formats et les prix TTC sur Speed Services.';
  const homeLinks = universeDefinitions.map((u) => `<li><a href="${u.path}">${escapeHtml(u.title)}</a></li>`).join('');
  const homeBody = `<main><h1>Couches bébé, hygiène et protections à prix compétitifs</h1><p>${escapeHtml(homeDescription)}</p><p>Speed Services réunit plusieurs marques et références. Les prix affichés sur le site sont TTC ; comparez les tailles, formats et conditionnements sur chaque fiche produit.</p><nav aria-label="Univers produits"><h2>Explorer les univers</h2><ul>${homeLinks}</ul></nav></main>`;
  const homeHtml = prepareHtml({ title: homeTitle, description: homeDescription, canonical: `${site}/`, image: `${site}/fond.png`, jsonLd: [organization, website], body: homeBody });
  await writeRoute('/', homeHtml);
  pageCount += 1;
  addSitemapEntry('/');

  const aboutTitle = 'À propos de Speed Services | Boutique d’hygiène multi-marques';
  const aboutDescription = 'Découvrez Speed Services, une boutique en ligne multi-marques de couches bébé, hygiène féminine, protections adultes et produits pour animaux. Prix affichés TTC.';
  const aboutBody = `<main><h1>À propos de Speed Services</h1><p>${escapeHtml(aboutDescription)}</p><p>La boutique rassemble des produits pour bébé et enfant, l’hygiène féminine, les protections adultes et les animaux. Chaque fiche présente les informations et le prix TTC de la référence.</p><p><a href="/">Retour à l’accueil</a></p></main>`;
  await writeRoute('/about', prepareHtml({ title: aboutTitle, description: aboutDescription, canonical: `${site}/about`, body: aboutBody }));
  pageCount += 1;
  addSitemapEntry('/about');

  const legalPages = [
    {
      route: '/mentions-legales',
      title: 'Mentions légales | Speed Services',
      description: 'Consultez les informations légales relatives à Speed Services Distribution, à l’éditeur du site et aux moyens de contact.',
      heading: 'Mentions légales',
    },
    {
      route: '/politique-de-confidentialite',
      title: 'Politique de confidentialité | Speed Services',
      description: 'Informations sur les données personnelles, leur utilisation, leur protection et les droits des utilisateurs de Speed Services.',
      heading: 'Politique de confidentialité',
    },
    {
      route: '/conditions-generales-de-vente',
      title: 'Conditions générales de vente | Speed Services',
      description: 'Consultez les conditions générales applicables aux commandes, aux paiements, à la livraison et aux ventes Speed Services.',
      heading: 'Conditions générales de vente',
    },
    {
      route: '/politique-de-remboursement',
      title: 'Retours et remboursements | Speed Services',
      description: 'Consultez la politique de retours, de réclamations, de remboursements et d’avoirs de Speed Services.',
      heading: 'Politique de retours et remboursements',
    },
  ];
  for (const page of legalPages) {
    const body = `<main><nav aria-label="Fil d’Ariane"><a href="/">Accueil</a></nav><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.description)}</p><p>Consultez les informations détaillées dans cette rubrique ou contactez Speed Services pour toute question relative au site et à ses services.</p></main>`;
    await writeRoute(page.route, prepareHtml({ title: page.title, description: page.description, canonical: `${site}${page.route}`, body }));
    pageCount += 1;
    addSitemapEntry(page.route);
  }

  const breadcrumb = (items) => ({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${site}${item.path}` })),
  });

  for (const definition of universeDefinitions) {
    const catalog = catalogs[definition.key];
    const brands = getCatalogBrands(catalog);
    const pricedProducts = definition.key === 'baby' ? catalog.filter(isBabyDiaperProduct) : catalog;
    const pricedVariants = pricedProducts.flatMap((product) => product.variants || []);
    const minimumPrice = Math.min(...pricedVariants.map((variant) => Number(variant.price))); 
    const universeSeo = buildUniverseSeo(definition.title, definition.description, minimumPrice);
    const canonical = `${site}${definition.path}`;
    const universeList = catalog.map((product, index) => ({ '@type': 'ListItem', position: index + 1, name: product.name, url: `${site}${definition.path}/${product.id}` }));
    const brandLinks = brands.map((brand) => `<li><a href="${definition.path}/marque/${getBrandSlug(brand)}">${escapeHtml(brand)}</a></li>`).join('');
    const priceIntro = definition.key === 'baby' ? 'Prix des couches bébé à partir de' : 'Prix à partir de';
    const universeBody = `<main><nav aria-label="Fil d’Ariane"><a href="/">Accueil</a></nav><h1>${escapeHtml(universeSeo.title.replace(' | Speed Services', ''))}</h1><p>${escapeHtml(definition.description)}</p><p>${priceIntro} ${priceText(minimumPrice)} € TTC. Les prix sont compétitifs et affichés toutes taxes comprises.</p><section><h2>Marques disponibles</h2><ul>${brandLinks}</ul></section></main>`;
    await writeRoute(definition.path, prepareHtml({ title: universeSeo.title, description: universeSeo.description, canonical, jsonLd: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: definition.title, description: definition.description, url: canonical, inLanguage: 'fr-FR', mainEntity: { '@type': 'ItemList', numberOfItems: universeList.length, itemListElement: universeList } }, breadcrumb([{ name: 'Accueil', path: '/' }, { name: definition.title, path: definition.path }])], body: universeBody }));
    pageCount += 1;
    addSitemapEntry(definition.path);

    for (const brand of brands) {
      const brandSlug = getBrandSlug(brand);
      const brandProducts = catalog.map((product) => ({ ...product, variants: (product.variants || []).filter((variant) => getVariantBrand(product, variant) === brand) })).filter((product) => product.variants.length > 0);
      const brandVariants = brandProducts.flatMap((product) => product.variants);
      const diaperProducts = brandProducts.filter(isBabyDiaperProduct);
      const pricedBrandProducts = diaperProducts.length > 0 ? diaperProducts : brandProducts;
      const minBrandPrice = Math.min(...pricedBrandProducts.flatMap((product) => product.variants.map((variant) => Number(variant.price))));
      const brandSeo = buildBrandSeo(brand, brandProducts.map((product) => product.name), minBrandPrice);
      const brandRoute = `${definition.path}/marque/${brandSlug}`;
      const brandCanonical = `${site}${brandRoute}`;
      const listItems = [];
      let position = 1;
      for (const product of brandProducts) {
        for (const variant of product.variants) {
          listItems.push({ '@type': 'ListItem', position: position++, name: `${brand} ${variant.label}`, url: `${site}/produit/detail/${variant.slug}` });
        }
      }
      const groups = brandProducts.map((product) => `<li><h2><a href="${definition.path}/${product.id}?marque=${brandSlug}">${escapeHtml(product.name)}</a></h2><p>${escapeHtml(product.description || '')}</p><ul>${product.variants.map((variant) => `<li><a href="/produit/detail/${variant.slug}">${escapeHtml(variant.label)}</a> – ${priceText(variant.price)} € TTC</li>`).join('')}</ul></li>`).join('');
      const brandBody = `<main><nav aria-label="Fil d’Ariane"><a href="/">Accueil</a> / <a href="${definition.path}">${escapeHtml(definition.title)}</a></nav><h1>${escapeHtml(brandSeo.keyword)}</h1><p>${escapeHtml(brandSeo.description)}</p><p>Prix à partir de ${priceText(minBrandPrice)} € TTC. Parcourez les tailles, conditionnements et références disponibles.</p><section><h2>Gammes ${escapeHtml(brand)}</h2><ul>${groups}</ul></section></main>`;
      const brandImages = brandVariants.map((variant) => variant.image);
      await writeRoute(brandRoute, prepareHtml({ title: brandSeo.title, description: brandSeo.description, canonical: brandCanonical, image: absoluteImage(brandImages.find(Boolean)), jsonLd: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: brandSeo.keyword, description: brandSeo.description, url: brandCanonical, inLanguage: 'fr-FR', mainEntity: { '@type': 'ItemList', numberOfItems: listItems.length, itemListElement: listItems } }, breadcrumb([{ name: 'Accueil', path: '/' }, { name: definition.title, path: definition.path }, { name: brand, path: brandRoute }])], body: brandBody }));
      pageCount += 1;
      addSitemapEntry(brandRoute, brandImages);

    }

    // Generate each range page once, with all brands and variants for that range.
    for (const product of catalog) {
      const groupBrands = unique((product.variants || []).map((variant) => getVariantBrand(product, variant)));
      const minPrice = Math.min(...product.variants.map((variant) => Number(variant.price)));
      const groupSeo = buildGroupSeo(product, groupBrands, minPrice);
      const groupRoute = `${definition.path}/${product.id}`;
      const groupCanonical = `${site}${groupRoute}`;
      const groupList = product.variants.map((variant, index) => ({ '@type': 'ListItem', position: index + 1, name: variant.label, url: `${site}/produit/detail/${variant.slug}` }));
      const variantsMarkup = product.variants.map((variant) => {
        const brand = getVariantBrand(product, variant);
        const unitPrice = perDiaperPrice(product, variant);
        return `<li><a href="/produit/detail/${variant.slug}">${escapeHtml(brand)} – ${escapeHtml(variant.label)}</a> – ${priceText(variant.price)} € TTC${unitPrice !== null ? ` · ${priceText(unitPrice)} € par couche` : ''}</li>`;
      }).join('');
      const groupBody = `<main><nav aria-label="Fil d’Ariane"><a href="/">Accueil</a> / <a href="${definition.path}">${escapeHtml(definition.title)}</a></nav><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(product.description || '')}</p><p>Prix à partir de ${priceText(minPrice)} € TTC. Comparez les tailles, les conditionnements et les marques disponibles.</p><section><h2>Références et conditionnements</h2><ul>${variantsMarkup}</ul></section></main>`;
      const productImageList = unique([...product.variants.map((variant) => variant.image), ...(product.galleryImages || [])]);
      await writeRoute(groupRoute, prepareHtml({ title: groupSeo.title, description: groupSeo.description, canonical: groupCanonical, image: absoluteImage(productImageList[0]), jsonLd: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: product.name, description: groupSeo.description, url: groupCanonical, inLanguage: 'fr-FR', mainEntity: { '@type': 'ItemList', numberOfItems: groupList.length, itemListElement: groupList } }, breadcrumb([{ name: 'Accueil', path: '/' }, { name: definition.title, path: definition.path }, { name: product.name, path: groupRoute }])], body: groupBody }));
      pageCount += 1;
      addSitemapEntry(groupRoute, productImageList);
    }

    for (const product of catalog) {
      for (const variant of product.variants || []) {
        const brand = getVariantBrand(product, variant);
        const brandSlug = getBrandSlug(brand);
        const groupRoute = `${definition.path}/${product.id}`;
        const brandRoute = `${definition.path}/marque/${brandSlug}`;
        const productRoute = `/produit/detail/${variant.slug}`;
        const canonical = `${site}${productRoute}`;
        const seoData = buildProductSeo(product, variant, brand);
        const count = getPackUnitCount(variant.label || '');
        const pricePer = getPricePerBabyDiaper(product, variant);
        const description = variant.detailedDescription || product.description || '';
        const images = unique([variant.image, ...(product.galleryImages || [])].map(absoluteImage));
        const productSchema = {
          '@context': 'https://schema.org', '@type': 'Product',
          name: seoData.completeName, description, sku: variant.sku, image: images, url: canonical,
          category: `${product.subCategory} – ${product.name}`,
          brand: { '@type': 'Brand', name: brand },
          additionalProperty: [
            ...(count ? [{ '@type': 'PropertyValue', name: 'Nombre d’unités par paquet', value: count }] : []),
            ...(pricePer !== null ? [{ '@type': 'PropertyValue', name: 'Prix par couche', value: `${priceText(pricePer)} EUR` }] : []),
          ],
          offers: {
            '@type': 'Offer', url: canonical, priceCurrency: 'EUR', price: Number(variant.price).toFixed(2),
            availability: variant.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@type': 'Organization', name: 'Speed Services', url: `${site}/` },
          },
        };
        const bread = breadcrumb([
          { name: 'Accueil', path: '/' },
          { name: definition.title, path: definition.path },
          { name: brand, path: brandRoute },
          { name: product.name, path: groupRoute },
          { name: seoData.completeName, path: productRoute },
        ]);
        const imageTag = variant.image ? `<img src="${escapeHtml(variant.image)}" alt="${escapeHtml(`${brand} ${product.name} ${variant.label}`)}" width="420" height="420" />` : '';
        const priceLabel = isBabyDiaper(product) ? 'Prix bas' : 'Prix';
        const productBody = `<main><nav aria-label="Fil d’Ariane"><a href="/">Accueil</a> / <a href="${definition.path}">${escapeHtml(definition.title)}</a> / <a href="${brandRoute}">${escapeHtml(brand)}</a> / <a href="${groupRoute}">${escapeHtml(product.name)}</a></nav><article><h1>${escapeHtml(seoData.completeName)}</h1>${imageTag}<p>${escapeHtml(description)}</p><p><strong>${priceLabel} : ${priceText(variant.price)} € TTC</strong></p>${count ? `<p>Conditionnement : ${count} unités.</p>` : ''}${pricePer !== null ? `<p>Soit ${priceText(pricePer)} € par couche. Comparez les tailles et conditionnements pour choisir le format adapté.</p>` : ''}<p>Référence produit : ${escapeHtml(variant.sku)}.</p><p>${variant.inStock ? 'Disponible au catalogue.' : 'Actuellement indisponible.'}</p><p><a href="${brandRoute}">Voir les produits ${escapeHtml(brand)}</a> · <a href="${groupRoute}">Voir toute la gamme ${escapeHtml(product.name)}</a></p></article></main>`;
        await writeRoute(productRoute, prepareHtml({ title: seoData.title, description: seoData.description, canonical, type: 'product', image: images[0], jsonLd: [productSchema, bread], body: productBody }));
        pageCount += 1;
        productCount += 1;
        addSitemapEntry(productRoute, images);
      }
    }
  }

  // The static legal URLs exist in the SPA. They remain present in the sitemap, but are
  // not generated as product pages because they do not belong to the shopping catalog.
  const sitemapUrlset = [...sitemapEntries.entries()].map(([url, images]) => {
    const imageNodes = images.map((image) => `      <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`).join('\n');
    return `  <url>\n    <loc>${escapeXml(url)}</loc>${imageNodes ? `\n${imageNodes}` : ''}\n  </url>`;
  }).join('\n');
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapUrlset}\n</urlset>\n`;
  await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  await writeFile(path.join(dist, 'sitemap.xml'), sitemapXml, 'utf8');

  console.log(`SEO statique généré : ${pageCount} pages HTML, ${productCount} fiches produit, ${sitemapEntries.size} URL dans le sitemap.`);
} finally {
  await vite.close();
}
