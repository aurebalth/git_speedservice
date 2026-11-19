import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BABY_CATALOG } from '../../data/babyCatalog';
import { FEMALE_CATALOG } from '../../data/femaleCatalog';
import { ADULT_CATALOG } from '../../data/adultCatalog';
import { PET_CATALOG } from '../../data/petCatalog';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Phone, ArrowLeft, CheckCircle2, Sparkles, ShieldCheck, ShoppingBag, Truck, Award, Plus, Minus } from 'lucide-react';
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

  const categoryUrl = getCategoryRoute(parentCategory);

  const relatedProducts = ALL_CATALOGS.flatMap((cat) =>
    cat.variants.map((v: any) => ({
      ...v,
      categoryName: cat.name,
      subCategory: cat.subCategory,
      categoryId: cat.id,
      variantSlug: v.slug || v.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      crossSellTag: cat.id === parentCategory.id ? 'Variante Similaire' : 'Complément Recommandé'
    }))
  )
    .filter((v) => v.sku !== variant.sku)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const seoTitle = `${variant.label} | ${parentCategory.name} - ${SITE_CONFIG.name}`;
  const seoDescription = `${variant.detailedDescription || parentCategory.description} Consultez le prix et les caractéristiques de cette référence chez Speed Services.`.slice(0, 155);
  const canonicalUrl = `https://speedservices.store/produit/detail/${productSlug}`;
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: variant.label,
    description: variant.detailedDescription || parentCategory.description,
    sku: variant.sku,
    image: variant.image?.startsWith('http') ? variant.image : `https://speedservices.store${variant.image}`,
    category: parentCategory.subCategory,
    brand: { '@type': 'Brand', name: parentCategory.name },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'EUR',
      price: Number(variant.price).toFixed(2),
      availability: variant.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://speedservices.store/' },
      { '@type': 'ListItem', position: 2, name: parentCategory.subCategory, item: `https://speedservices.store${categoryUrl}` },
      { '@type': 'ListItem', position: 3, name: parentCategory.name, item: `https://speedservices.store${categoryUrl}` },
      { '@type': 'ListItem', position: 4, name: variant.label, item: canonicalUrl }
    ]
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
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={productStructuredData.image} />
        <script type="application/ld+json">{JSON.stringify(productStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbStructuredData)}</script>
      </Helmet>

      {/* Fil d'Ariane SEO */}
      <nav className="bg-slate-900 text-slate-300 py-3.5 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-slate-400">{parentCategory.subCategory}</span>
          <span>/</span>
          <Link to={categoryUrl} className="hover:text-white transition-colors">
            {parentCategory.name}
          </Link>
          <span>/</span>
          <span className="text-sky-400 font-bold">{variant.label}</span>
        </div>
      </nav>

      {/* Détail du produit */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Visuel du Produit */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-10 flex items-center justify-center min-h-[480px] relative shadow-sm">
              <span className="absolute top-5 left-5 bg-slate-900 text-white text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                SKU : {variant.sku}
              </span>
              <img
                src={variant.image}
                alt={variant.label}
                className="max-h-[400px] max-w-full object-contain hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck size={16} /> Qualité Certifiée & Testée
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Truck size={16} /> Expédition B2B Rapide
                </span>
              </div>
            </div>

            {/* Informations & Bloc Prix E-commerce */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {parentCategory.subCategory}
                </span>
                <span className="text-xs text-slate-400 font-medium">Gamme : {parentCategory.name}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                {variant.label}
              </h1>

              {/* PRIX ET BOUTONS D'ACTION E-COMMERCE */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-4xl font-black text-white">
                      {variant.price.toFixed(2)} €
                    </span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1.5 rounded-full font-bold">
                    En stock disponible
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
                      className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 text-sm cursor-pointer"
                    >
                      <ShoppingBag size={18} /> Ajouter au panier
                    </button>
                  </div>

                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs border border-slate-700"
                  >
                    <Phone size={14} /> Commander par téléphone ({SITE_CONFIG.phoneDisplay})
                  </a>
                </div>
              </div>

              {/* Description détaillée et professionnelle */}
              <div className="prose prose-slate text-slate-600 text-base leading-relaxed mb-6 space-y-3">
                <p>{variant.detailedDescription || parentCategory.description}</p>
                <p>
                  Ce produit professionnel répond aux exigences strictes des établissements de santé et des revendeurs spécialisés. Conçu pour garantir un confort optimal, il intègre des composants de haute technologie testés dermatologiquement.
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
                <Sparkles size={14} /> Suggestions Intelligentes & Cross-Selling
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                Produits Similaires et Associations Recommandées
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Optimisez votre approvisionnement avec des références complémentaires fréquemment associées par les professionnels.
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
                      relProduct.crossSellTag === 'Variante Similaire' 
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
                      alt={relProduct.label}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </Link>

                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                    {relProduct.subCategory}
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
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Tarif HT</span>
                    <span className="text-xl font-black text-slate-900">{relProduct.price.toFixed(2)} €</span>
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