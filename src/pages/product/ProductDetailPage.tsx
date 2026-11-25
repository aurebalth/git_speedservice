import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BABY_CATALOG } from '../../data/babyCatalog';
import { FEMALE_CATALOG } from '../../data/femaleCatalog';
import { ADULT_CATALOG } from '../../data/adultCatalog';
import { PET_CATALOG } from '../../data/petCatalog';
import { SITE_CONFIG } from '../../data/siteConfig';
import { getBrandSlug, getVariantBrand } from '../../data/catalogUtils';
import { buildProductSeo, formatSeoPrice, getAbsoluteSeoImage, getPackUnitCount, getPricePerBabyDiaper, SEO_SITE_URL } from '../../data/seoUtils';
import { ArrowLeft, CheckCircle2, Sparkles, ShieldCheck, ShoppingBag, Truck, Award, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ALL_CATALOGS = [
  ...BABY_CATALOG,
  ...FEMALE_CATALOG,
  ...ADULT_CATALOG,
  ...PET_CATALOG
];

export const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { addToCart } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => { setSelectedImage(null); setSelectedQty(1); }, [productSlug]);

  let parentCategory: any = null;
  let variant: any = null;

  for (const cat of ALL_CATALOGS) {
    const foundVariant = cat.variants?.find((v: any) => {
      const vSlug = v.slug || v.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return vSlug === productSlug;
    });
    if (foundVariant) {
      parentCategory = cat;
      variant = foundVariant;
      break;
    }
  }

  if (!variant || !parentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-28 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-3">Produit introuvable</h1>
        <p className="text-slate-500 mb-6">La page produit que vous recherchez n'existe pas ou a été déplacée.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors">
          <ArrowLeft size={16} /> Retour au catalogue principal
        </Link>
      </div>
    );
  }

  const getCategoryRoute = (cat: any) => {
    if (BABY_CATALOG.some(c => c.id === cat.id)) return `/produit/couches/bebe/${cat.id}`;
    if (FEMALE_CATALOG.some(c => c.id === cat.id)) return `/produit/hygiene-feminine/${cat.id}`;
    if (ADULT_CATALOG.some(c => c.id === cat.id)) return `/produit/incontinence-adultes/${cat.id}`;
    if (PET_CATALOG.some(c => c.id === cat.id)) return `/produit/petcare/${cat.id}`;
    return '/';
  };

  const brandName = getVariantBrand(parentCategory, variant);
  const categoryRoute = getCategoryRoute(parentCategory);
  const universeRoute = categoryRoute.replace(new RegExp(`/${parentCategory.id}$`), '');
  const brandUrl = `${universeRoute}/marque/${getBrandSlug(brandName)}`;
  const productGallery = Array.from(new Set([variant.image, ...(parentCategory.galleryImages || [])].filter(Boolean)));
  const mainProductImage = selectedImage && productGallery.includes(selectedImage) ? selectedImage : variant.image;
  const seoData = buildProductSeo(parentCategory, variant, brandName);
  const packageUnitCount = getPackUnitCount(variant.label || '');
  const pricePerBabyDiaper = getPricePerBabyDiaper(parentCategory, variant);

  const relatedProducts = ALL_CATALOGS.flatMap((cat) =>
    cat.variants.map((v: any) => ({
      ...v,
      categoryName: cat.name,
      subCategory: cat.subCategory,
      categoryId: cat.id,
      brand: getVariantBrand(cat, v),
      variantSlug: v.slug || v.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      crossSellTag: cat.id === parentCategory.id ? 'Variante similaire' : 'À découvrir'
    }))
  )
    .filter((v) => v.sku !== variant.sku)
    .sort((a, b) => Number(b.brand === brandName) - Number(a.brand === brandName) || Number(b.categoryId === parentCategory.id) - Number(a.categoryId === parentCategory.id))
    .slice(0, 3);

  const seoTitle = seoData.title;
  const seoDescription = seoData.description;
  const canonicalUrl = `${SEO_SITE_URL}/produit/detail/${productSlug}`;
  const productImageUrls = productGallery.map((image: string) => getAbsoluteSeoImage(image)).filter(Boolean);
  const productDescription = variant.detailedDescription || parentCategory.description;
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: seoData.completeName,
    description: productDescription,
    sku: variant.sku,
    image: productImageUrls,
    url: canonicalUrl,
    category: `${parentCategory.subCategory} – ${parentCategory.name}`,
    brand: { '@type': 'Brand', name: brandName },
    additionalProperty: [
      ...(packageUnitCount ? [{ '@type': 'PropertyValue', name: 'Nombre d’unités par paquet', value: packageUnitCount }] : []),
      ...(pricePerBabyDiaper !== null ? [{ '@type': 'PropertyValue', name: 'Prix par couche', value: `${formatSeoPrice(pricePerBabyDiaper)} EUR` }] : []),
    ],
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'EUR',
      price: Number(variant.price).toFixed(2),
      availability: variant.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE_CONFIG.name, url: SEO_SITE_URL },
    },
  };
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SEO_SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: parentCategory.subCategory, item: `${SEO_SITE_URL}${universeRoute}` },
      { '@type': 'ListItem', position: 3, name: brandName, item: `${SEO_SITE_URL}${brandUrl}` },
      { '@type': 'ListItem', position: 4, name: parentCategory.name, item: `${SEO_SITE_URL}${categoryRoute}` },
      { '@type': 'ListItem', position: 5, name: seoData.completeName, item: canonicalUrl },
    ],
  };

  const handleAddToCart = () => {
    addToCart({
      sku: variant.sku,
      label: variant.label,
      price: variant.price,
      image: variant.image,
      variantSlug: productSlug || '',
      subCategory: parentCategory.subCategory
    }, selectedQty);
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:site_name" content="Speed Services" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={productImageUrls[0] || `${SEO_SITE_URL}/fond.png`} />
        <meta property="og:image:alt" content={`${brandName} – ${seoData.completeName}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={productImageUrls[0] || `${SEO_SITE_URL}/fond.png`} />
        <script type="application/ld+json">{JSON.stringify(productStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbStructuredData)}</script>
      </Helmet>

      {/* Fil d'Ariane SEO */}
      <nav className="bg-slate-900 text-slate-300 py-3.5 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <Link to={universeRoute} className="text-slate-400 hover:text-white transition-colors">{parentCategory.subCategory}</Link>
          <span>/</span>
          <Link to={brandUrl} className="hover:text-white transition-colors">{brandName}</Link>
          <span>/</span>
          <span className="text-sky-400 font-bold">{variant.label}</span>
        </div>
      </nav>

      {/* Détail du produit */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Visuel principal et galerie des contenus produits fournis */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[480px] relative shadow-sm">
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-slate-900 text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  SKU : {variant.sku}
                </span>
                <img
                  src={mainProductImage}
                  alt={`${brandName} ${parentCategory.name} – ${variant.label}`}
                  className="max-h-[360px] sm:max-h-[400px] max-w-full object-contain transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap justify-between items-center gap-2 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 text-[10px] sm:text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-700"><ShieldCheck size={15} /> Informations produit</span>
                  <span className="flex items-center gap-1.5 text-slate-600"><Truck size={15} /> Livraison en France</span>
                </div>
              </div>
              {productGallery.length > 1 && (
                <div className="mt-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">Visuels complémentaires et informations fabricant</p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {productGallery.map((image: string, index: number) => (
                      <button key={image} type="button" onClick={() => setSelectedImage(image)} aria-label={`Afficher le visuel ${index + 1}`} className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-white p-2 transition ${mainProductImage === image ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-200 hover:border-sky-300'}`}>
                        <img src={image} alt={`${brandName} ${parentCategory.name} – visuel complémentaire ${index + 1}`} className="max-h-full max-w-full object-contain" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Informations & Bloc Prix E-commerce */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {parentCategory.subCategory}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">Marque : {brandName}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                {seoData.completeName}
              </h1>

              {/* PRIX ET BOUTONS D'ACTION E-COMMERCE */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
                  <div>
                    <div>
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Prix TTC</span>
                      <span className="text-4xl font-black text-white">{formatSeoPrice(variant.price)} €</span>
                      {pricePerBabyDiaper !== null && <span className="mt-1 block text-xs font-semibold text-emerald-300">Soit {formatSeoPrice(pricePerBabyDiaper)} € par couche{packageUnitCount ? ` · ${packageUnitCount} couches` : ''}</span>}
                      {packageUnitCount && pricePerBabyDiaper === null && <span className="mt-1 block text-xs text-slate-300">Conditionnement : {packageUnitCount} unités</span>}
                    </div>
                  </div>
                  <span className={`${variant.inStock ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-slate-300 border-slate-600'} border text-xs px-3 py-1.5 rounded-full font-bold`}>
                    {variant.inStock ? 'En stock' : 'Actuellement indisponible'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-700 rounded-xl bg-slate-800 px-2 py-1">
                      <button 
                        onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                        className="p-2 text-slate-300 hover:text-white transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 font-bold text-sm text-white">{selectedQty}</span>
                      <button 
                        onClick={() => setSelectedQty(selectedQty + 1)}
                        className="p-2 text-slate-300 hover:text-white transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!variant.inStock}
                      className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 text-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-200"
                    >
                      <ShoppingBag size={18} /> Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>

              {/* Description détaillée et professionnelle */}
              <div className="prose prose-slate text-slate-600 text-base leading-relaxed mb-6 space-y-3">
                <h2 className="text-lg font-bold text-slate-900">À propos de cette référence {brandName}</h2>
                <p>{productDescription}</p>
                <p>
                  Cette fiche réunit les informations disponibles pour la référence {variant.sku}, son conditionnement et son prix TTC. Vérifiez la taille, la plage de poids ou le format indiqués sur l’emballage avant de choisir.
                </p>
              </div>

              {/* Points Clés / Avantages */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Award size={16} className="text-sky-600" /> Avantages et spécifications techniques
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {parentCategory.features?.map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Suggestions (Défilement horizontal optimisé avec cartes ajustées pour laisser dépasser la suivante) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full mb-2">
                <Sparkles size={14} /> À découvrir aussi
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                D’autres références à découvrir
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Découvrez d’autres tailles, formats et produits de la même marque ou d’autres univers du catalogue.
            </p>
          </div>

          {/* Cartes à largeur optimisée sur mobile (min-w-[78%]) pour laisser deviner le produit suivant */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {relatedProducts.map((relProduct: any) => (
              <div
                key={relProduct.sku}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl transition-all group min-w-[78%] sm:min-w-[320px] md:min-w-0 snap-start shrink-0"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                      SKU : {relProduct.sku}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      relProduct.crossSellTag === 'Variante similaire' 
                        ? 'bg-sky-50 text-sky-700 border border-sky-200' 
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {relProduct.crossSellTag}
                    </span>
                  </div>

                  <Link
                    to={`/produit/detail/${relProduct.variantSlug}`}
                    className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center justify-center h-48 mb-5 group-hover:bg-slate-100/80 transition-colors block"
                  >
                    <img
                      src={relProduct.image}
                      alt={`${relProduct.brand} ${relProduct.categoryName} – ${relProduct.label}`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </Link>

                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                    {relProduct.subCategory} · {relProduct.brand}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 hover:text-sky-600 transition-colors">
                    <Link to={`/produit/detail/${relProduct.variantSlug}`}>
                      {relProduct.label}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {relProduct.categoryName}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Prix TTC</span>
                    <span className="text-xl font-black text-slate-900">{formatSeoPrice(relProduct.price)} €</span>
                  </div>

                  <Link
                    to={`/produit/detail/${relProduct.variantSlug}`}
                    className="bg-slate-900 hover:bg-sky-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBag size={14} /> Voir le produit
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};