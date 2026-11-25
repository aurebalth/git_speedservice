import React from 'react';
import { useParams, Link, useLocation, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BABY_CATALOG } from '../../data/babyCatalog';
import { FEMALE_CATALOG } from '../../data/femaleCatalog';
import { ADULT_CATALOG } from '../../data/adultCatalog';
import { PET_CATALOG } from '../../data/petCatalog';
import { buildBrandSeo, buildGroupSeo, buildUniverseSeo, formatSeoPrice, getPricePerBabyDiaper, isBabyDiaperProduct } from '../../data/seoUtils';
import { getBrandProducts, getBrandSlug, getCatalogBrands, getVariantBrand } from '../../data/catalogUtils';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const SITE = 'https://speedservices.store';

type ProductVariant = {
  sku: string;
  slug: string;
  label: string;
  price: number;
  inStock: boolean;
  image: string;
  detailedDescription: string;
  brand?: string;
};

type CatalogProduct = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  subCategory: string;
  seoUrl: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
};

const UNIVERSES = {
  baby: {
    title: 'Bébé & Enfant',
    path: '/produit/couches/bebe',
    description: 'Couches classiques, formats économiques, culottes, couches de bain, protections de nuit, lingettes et soins bébé proposés par plusieurs marques.',
    catalog: BABY_CATALOG as CatalogProduct[],
  },
  female: {
    title: 'Hygiène féminine',
    path: '/produit/hygiene-feminine',
    description: 'Serviettes hygiéniques, protège-slips et produits de soin féminin de plusieurs marques.',
    catalog: FEMALE_CATALOG as CatalogProduct[],
  },
  adult: {
    title: 'Incontinence & protections adultes',
    path: '/produit/incontinence-adultes',
    description: 'Culottes absorbantes, protections anatomiques, changes et solutions adaptées aux besoins des adultes.',
    catalog: ADULT_CATALOG as CatalogProduct[],
  },
  pet: {
    title: 'Animaux & entretien',
    path: '/produit/petcare',
    description: 'Tapis absorbants, lingettes, soins pour animaux et produits d’entretien du quotidien.',
    catalog: PET_CATALOG as CatalogProduct[],
  },
} as const;

function BrandPill({ name }: { name: string }) {
  return <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-bold text-sky-800">{name}</span>;
}

function BrandCard({ brand, path, catalog }: { brand: string; path: string; catalog: CatalogProduct[] }) {
  const products = getBrandProducts(catalog, brand);
  const variants = products.flatMap((product) => product.variants.filter((variant) => getVariantBrand(product, variant) === brand));
  const image = variants.find((variant) => variant.image)?.image;
  return (
    <Link to={`${path}/marque/${getBrandSlug(brand)}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg">
      <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-slate-50 p-4">
        {image && <img src={image} alt={`Produits ${brand}`} className="max-h-full max-w-full object-contain" loading="lazy" />}
      </div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-700">{brand}</h3>
        <ChevronRight size={18} className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
      </div>
      <p className="mt-1 text-xs text-slate-500">{products.length} gamme{products.length > 1 ? 's' : ''} · {variants.length} référence{variants.length > 1 ? 's' : ''}</p>
    </Link>
  );
}

export const CategoryPage: React.FC = () => {
  const { categoryId, brandSlug } = useParams<{ categoryId?: string; brandSlug?: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const universe = location.pathname.includes('/hygiene-feminine')
    ? UNIVERSES.female
    : location.pathname.includes('/incontinence-adultes')
      ? UNIVERSES.adult
      : location.pathname.includes('/petcare')
        ? UNIVERSES.pet
        : UNIVERSES.baby;
  const { catalog, path: universePath, title: universeTitle, description: universeDescription } = universe;
  const brandNames = getCatalogBrands(catalog);

  // Vue marque : les groupes et variantes sont filtrés à partir du champ de marque du catalogue.
  if (brandSlug) {
    const brandName = brandNames.find((name) => getBrandSlug(name) === brandSlug);
    const brandProducts = brandName ? catalog.map((product) => ({
      ...product,
      variants: product.variants.filter((variant) => getVariantBrand(product, variant) === brandName),
    })).filter((product) => product.variants.length > 0) : [];

    if (!brandName || brandProducts.length === 0) {
      return <NotFound backPath={universePath} backLabel={`Retour à ${universeTitle}`} />;
    }

    const canonical = `${SITE}${universePath}/marque/${brandSlug}`;
    const brandVariants = brandProducts.flatMap((product) => product.variants);
    const diaperProducts = brandProducts.filter((product) => isBabyDiaperProduct(product));
    const pricedBrandProducts = diaperProducts.length > 0 ? diaperProducts : brandProducts;
    const minimumBrandPrice = Math.min(...pricedBrandProducts.flatMap((product) => product.variants.map((variant) => Number(variant.price))));
    const brandSeo = buildBrandSeo(brandName, brandProducts.map((product) => product.name), minimumBrandPrice);
    const itemList = brandProducts.flatMap((product) => product.variants.map((variant) => ({
      '@type': 'ListItem',
      position: 0,
      name: `${brandName} ${variant.label}`,
      url: `${SITE}/produit/detail/${variant.slug}`,
    })));
    itemList.forEach((item, index) => { item.position = index + 1; });

    return (
      <>
        <Helmet>
          <title>{brandSeo.title}</title>
          <meta name="description" content={brandSeo.description} />
          <meta name="robots" content="index,follow,max-image-preview:large" />
          <link rel="canonical" href={canonical} />
          <meta property="og:site_name" content="Speed Services" />
          <meta property="og:locale" content="fr_FR" />
          <meta property="og:title" content={brandSeo.title} />
          <meta property="og:description" content={brandSeo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonical} />
          <meta name="twitter:card" content="summary" />
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org', '@type': 'CollectionPage', name: brandSeo.keyword,
            description: brandSeo.description, url: canonical, inLanguage: 'fr-FR',
            mainEntity: { '@type': 'ItemList', numberOfItems: itemList.length, itemListElement: itemList },
          })}</script>
        </Helmet>
        <Breadcrumb universeTitle={universeTitle} universePath={universePath} current={brandName} />
        <section className="bg-slate-950 py-12 text-white md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link to={universePath} className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-white"><ArrowLeft size={14} /> Tous les produits {universeTitle}</Link>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Notre sélection de marque</span>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">{brandSeo.keyword}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">Parcourez les gammes {brandName} disponibles dans le rayon {universeTitle}. Comparez les tailles, les conditionnements et les prix TTC avant de choisir votre référence.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-200">{brandProducts.length} gammes</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-200">{brandProducts.reduce((sum, product) => sum + product.variants.length, 0)} références</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">Prix affichés TTC</span>
            </div>
          </div>
        </section>
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
            {brandProducts.map((product) => {
              const firstImage = product.variants[0]?.image;
              const minimumPrice = Math.min(...product.variants.map((variant) => variant.price));
              const bestUnitPrice = product.variants
                .map((variant) => getPricePerBabyDiaper(product, variant))
                .filter((value): value is number => value !== null);
              const minimumUnitPrice = bestUnitPrice.length ? Math.min(...bestUnitPrice) : null;
              return (
                <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="grid gap-6 p-5 md:grid-cols-[200px_1fr] md:p-7">
                    <Link to={`${universePath}/${product.id}?marque=${brandSlug}`} className="flex min-h-40 items-center justify-center rounded-2xl bg-slate-50 p-5">
                      {firstImage && <img src={firstImage} alt={product.name} className="max-h-40 max-w-full object-contain" loading="lazy" />}
                    </Link>
                    <div className="flex flex-col justify-center">
                      <div className="mb-2 flex flex-wrap items-center gap-2"><BrandPill name={brandName} /><span className="text-xs font-semibold text-slate-400">{product.subCategory}</span></div>
                      <h2 className="text-xl font-black text-slate-900 md:text-2xl">{product.name}</h2>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{product.description}</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">{product.variants.length} format{product.variants.length > 1 ? 's' : ''} · à partir de <strong className="text-slate-900">{formatSeoPrice(minimumPrice)} € TTC</strong>{minimumUnitPrice !== null && <span className="block mt-1 text-emerald-700">Prix par couche dès {formatSeoPrice(minimumUnitPrice)} €</span>}</span>
                        <Link to={`${universePath}/${product.id}?marque=${brandSlug}`} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-sky-600">Voir les tailles et formats <ArrowRight size={14} /></Link>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {product.variants.slice(0, 3).map((variant) => (
                      <Link key={variant.sku} to={`/produit/detail/${variant.slug}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-sky-300">
                        <span className="min-w-0 text-xs font-semibold text-slate-700">{variant.label}</span>
                        <span className="shrink-0 text-sm font-black text-slate-900">{formatSeoPrice(variant.price)} € TTC</span>
                      </Link>
                    ))}
                    {product.variants.length > 3 && <Link to={`${universePath}/${product.id}?marque=${brandSlug}`} className="flex items-center justify-center rounded-xl border border-dashed border-sky-300 px-4 py-3 text-xs font-bold text-sky-700 hover:bg-sky-50">Voir les {product.variants.length - 3} autres formats</Link>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  // Vue univers : toutes les marques sont visibles avant le catalogue détaillé.
  if (!categoryId) {
    const canonical = `${SITE}${universePath}`;
    const priceProducts = universePath === UNIVERSES.baby.path ? catalog.filter((product) => isBabyDiaperProduct(product)) : catalog;
    const universeMinimumPrice = Math.min(...priceProducts.flatMap((product) => product.variants.map((variant) => Number(variant.price))));
    const universeSeoTitle = universePath === UNIVERSES.baby.path ? 'Couches bébé' : universeTitle;
    const universeSeo = buildUniverseSeo(universeSeoTitle, universeDescription, universeMinimumPrice);
    return (
      <>
        <Helmet>
          <title>{universeSeo.title}</title>
          <meta name="description" content={universeSeo.description} />
          <meta name="robots" content="index,follow,max-image-preview:large" />
          <link rel="canonical" href={canonical} />
          <meta property="og:site_name" content="Speed Services" />
          <meta property="og:locale" content="fr_FR" />
          <meta property="og:title" content={universeSeo.title} />
          <meta property="og:description" content={universeSeo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonical} />
          <meta name="twitter:card" content="summary" />
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org', '@type': 'CollectionPage', name: universeTitle,
            description: universeDescription, url: canonical, inLanguage: 'fr-FR',
            mainEntity: { '@type': 'ItemList', itemListElement: catalog.map((product, index) => ({
              '@type': 'ListItem', position: index + 1, name: product.name, url: `${SITE}${universePath}/${product.id}`,
            })) },
          })}</script>
        </Helmet>
        <Breadcrumb universeTitle={universeTitle} universePath={universePath} />
        <section className="bg-slate-950 py-12 text-white md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Catalogue multi-marques</span>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">{universePath === UNIVERSES.baby.path ? 'Couches bébé : toutes les marques' : universeTitle}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">{universeDescription}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">Prix affichés TTC · Plusieurs marques, un seul site</div>
          </div>
        </section>
        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div><h2 className="text-2xl font-black text-slate-900">Choisir une marque</h2><p className="mt-1 text-sm text-slate-500">Accédez directement aux produits et gammes de chaque marque.</p></div>
              <span className="text-xs font-semibold text-slate-400">{brandNames.length} marques au catalogue</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {brandNames.map((brand) => <BrandCard key={brand} brand={brand} path={universePath} catalog={catalog} />)}
            </div>
          </div>
        </section>
        {universePath === UNIVERSES.baby.path && (
          <section className="bg-slate-50 py-10 md:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <BabyGuide />
            </div>
          </section>
        )}
      </>
    );
  }

  // Vue gamme : conserve les anciennes URL et permet de filtrer une marque lorsqu'on arrive depuis son menu.
  const product = catalog.find((item) => item.id.toLowerCase() === categoryId.toLowerCase());
  if (!product) return <NotFound backPath={universePath} backLabel={`Retour à ${universeTitle}`} />;

  const brandFilter = searchParams.get('marque');
  const requestedBrand = brandFilter ? brandNames.find((name) => getBrandSlug(name) === brandFilter) : undefined;
  const variants = requestedBrand
    ? product.variants.filter((variant) => getVariantBrand(product, variant) === requestedBrand)
    : product.variants;
  const categoryCanonical = `${SITE}${universePath}/${product.id}`;
  if (variants.length === 0) return <NotFound backPath={universePath} backLabel={`Retour à ${universeTitle}`} />;

  const groupBrandNames = [...new Set(product.variants.map((variant) => getVariantBrand(product, variant)))];
  const title = requestedBrand ? `${product.name} – ${requestedBrand}` : product.name;
  const groupMinimumPrice = Math.min(...product.variants.map((variant) => Number(variant.price)));
  const groupSeo = buildGroupSeo(product, groupBrandNames, groupMinimumPrice);
  const isFilteredBrandView = Boolean(brandFilter && requestedBrand);

  return (
    <>
      <Helmet>
        <title>{groupSeo.title}</title>
        <meta name="description" content={groupSeo.description} />
        <meta name="robots" content={isFilteredBrandView ? "noindex,follow" : "index,follow,max-image-preview:large"} />
        <link rel="canonical" href={categoryCanonical} />
        <meta property="og:site_name" content="Speed Services" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content={groupSeo.title} />
        <meta property="og:description" content={groupSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={categoryCanonical} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'CollectionPage', name: title,
          description: product.description, url: categoryCanonical, inLanguage: 'fr-FR',
          mainEntity: { '@type': 'ItemList', itemListElement: variants.map((variant, index) => ({
            '@type': 'ListItem', position: index + 1, name: variant.label,
            url: `${SITE}/produit/detail/${variant.slug}`,
          })) },
        })}</script>
      </Helmet>
      <Breadcrumb universeTitle={universeTitle} universePath={universePath} current={product.name} />
      <section className="bg-slate-950 py-10 text-white md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to={requestedBrand ? `${universePath}/marque/${brandFilter}` : universePath} className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-white"><ArrowLeft size={14} /> {requestedBrand ? `Retour à ${requestedBrand}` : `Retour à ${universeTitle}`}</Link>
          <div className="mb-3 flex flex-wrap gap-2">{groupBrandNames.map((brand) => <BrandPill key={brand} name={brand} />)}<span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold text-slate-200">{product.subCategory}</span></div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{product.features.map((feature) => <span key={feature} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"><CheckCircle2 size={14} className="text-emerald-400" />{feature}</span>)}</div>
        </div>
      </section>
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-black text-slate-900">Tailles et conditionnements</h2><p className="mt-1 text-sm text-slate-500">Comparez les références et choisissez le format adapté.</p></div><span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">Prix TTC</span></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {variants.map((variant) => {
              const variantUrl = `/produit/detail/${variant.slug}`;
              const brand = getVariantBrand(product, variant);
              const pricePerDiaper = getPricePerBabyDiaper(product, variant);
              return (
                <article key={variant.sku} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="mb-3 flex items-center justify-between gap-2"><BrandPill name={brand} /><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${variant.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{variant.inStock ? 'En stock' : 'Indisponible'}</span></div>
                  <Link to={variantUrl} className="mb-4 flex h-48 items-center justify-center rounded-xl bg-slate-50 p-4"><img src={variant.image} alt={`${brand} ${product.name} – ${variant.label}`} className="max-h-full max-w-full object-contain" loading="lazy" /></Link>
                  <h3 className="min-h-12 text-base font-bold leading-snug text-slate-900"><Link to={variantUrl} className="hover:text-sky-700">{variant.label}</Link></h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">{variant.detailedDescription || product.description}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4 mt-5"><div><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Prix TTC</span><span className="text-2xl font-black text-slate-900">{formatSeoPrice(variant.price)} €</span>{pricePerDiaper !== null && <span className="mt-1 block text-xs font-semibold text-emerald-700">{formatSeoPrice(pricePerDiaper)} € / couche</span>}</div><div className="flex gap-2"><Link to={variantUrl} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 hover:border-sky-300 hover:text-sky-700">Détails</Link><button disabled={!variant.inStock} onClick={() => addToCart({ sku: variant.sku, label: variant.label, price: variant.price, image: variant.image, variantSlug: variant.slug, subCategory: product.subCategory }, 1)} className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingBag size={14} /> Ajouter</button></div></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

function Breadcrumb({ universeTitle, universePath, current }: { universeTitle: string; universePath: string; current?: string }) {
  return <nav className="border-b border-slate-800 bg-slate-900 py-3 text-xs text-slate-300"><div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto whitespace-nowrap px-4 sm:px-6 lg:px-8"><Link to="/" className="hover:text-white">Accueil</Link><span>/</span>{current ? <><Link to={universePath} className="hover:text-white">{universeTitle}</Link><span>/</span><span className="font-bold text-sky-400">{current}</span></> : <span className="font-bold text-sky-400">{universeTitle}</span>}</div></nav>;
}

function NotFound({ backPath, backLabel }: { backPath: string; backLabel: string }) {
  return <div className="mx-auto max-w-5xl px-4 py-28 text-center"><h1 className="mb-3 text-3xl font-black text-slate-900">Page introuvable</h1><p className="mb-6 text-sm text-slate-500">Cette sélection n’est pas disponible dans le catalogue actuel.</p><Link to={backPath} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-sky-600"><ArrowLeft size={16} /> {backLabel}</Link></div>;
}

function BabyGuide() {
  return <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 md:p-9"><span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700"><Sparkles size={14} /> Guide pratique</span><h2 className="mb-4 text-2xl font-black text-slate-900">Bien choisir ses couches bébé</h2><div className="grid gap-8 text-sm leading-relaxed text-slate-600 md:grid-cols-2"><div><h3 className="mb-2 font-bold text-slate-900">Quelle taille choisir ?</h3><p>Le poids de bébé est le premier repère. Consultez la fourchette indiquée sur chaque paquet et vérifiez l’ajustement au niveau de la taille et des cuisses.</p></div><div><h3 className="mb-2 font-bold text-slate-900">Couches classiques ou culottes ?</h3><p>Les couches à attaches facilitent l’ajustement, tandis que les culottes s’enfilent comme un sous-vêtement. Le choix dépend de l’âge, de la mobilité et des habitudes de change.</p></div></div><div className="mt-7 border-t border-slate-100 pt-6"><h3 className="mb-2 font-bold text-slate-900">Comparer les marques</h3><p className="text-sm leading-relaxed text-slate-600">Speed Services réunit plusieurs marques et gammes de couches bébé. Comparez les tailles, le nombre d’unités, les caractéristiques et les prix TTC sur chaque fiche avant de choisir.</p></div></section>;
}
