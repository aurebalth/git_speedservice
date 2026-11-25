import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../data/siteConfig';
import { BABY_CATALOG } from '../../data/babyCatalog';
import { FEMALE_CATALOG } from '../../data/femaleCatalog';
import { ADULT_CATALOG } from '../../data/adultCatalog';
import { PET_CATALOG } from '../../data/petCatalog';
import { getCatalogBrands } from '../../data/catalogUtils';
import { 
  ArrowRight, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Shield, 
  Truck, 
  Package,
  X,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // État pour gérer la modal/popover de choix de sous-catégorie
  const [selectedUniverse, setSelectedUniverse] = useState<{
    title: string;
    basePath: string;
    items: any[];
    selectedBrand: string | null;
  } | null>(null);

  const categories = [
    { 
      id: "baby",
      name: "Bébé & Enfant", 
      basePath: "/produit/couches/bebe",
      catalog: BABY_CATALOG,
      description: "Couches bébé, couches-culottes, formats économiques, lingettes et références de plusieurs marques.", 
      image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80" 
    },
    { 
      id: "female",
      name: "Hygiène Féminine", 
      basePath: "/produit/hygiene-feminine",
      catalog: FEMALE_CATALOG,
      description: "Serviettes hygiéniques, protège-slips et produits de soin féminin de différentes marques.", 
      image_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80" 
    },
    { 
      id: "adult",
      name: "Incontinence & Protections Adultes", 
      basePath: "/produit/incontinence-adultes",
      catalog: ADULT_CATALOG,
      description: "Protections anatomiques, culottes absorbantes, slips et changes pour les besoins du quotidien.", 
      image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80" 
    },
    { 
      id: "pet",
      name: "Animaux & Entretien", 
      basePath: "/produit/petcare",
      catalog: PET_CATALOG,
      description: "Tapis absorbants, lingettes et produits d’hygiène et d’entretien pour les animaux.", 
      image_url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80" 
    },
  ];

  const brands = getCatalogBrands([
    ...BABY_CATALOG,
    ...FEMALE_CATALOG,
    ...ADULT_CATALOG,
    ...PET_CATALOG,
  ]);

  const scrollToCategories = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById('categories-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCategorySelector = (category: typeof categories[0]) => {
    setSelectedUniverse({
      title: category.name,
      basePath: category.basePath,
      items: category.catalog || [],
      selectedBrand: null,
    });
  };

  // Les marques et leurs gammes sont calculées depuis le catalogue : les futures
  // marques ajoutées aux données apparaîtront automatiquement dans cette fenêtre.
  const getItemBrand = (item: any, variant: any) =>
    String(variant?.brand || item?.brand || 'Autres marques').trim();

  const modalBrands = selectedUniverse
    ? Array.from(new Set(selectedUniverse.items.flatMap((item: any) =>
        item.variants?.length
          ? item.variants.map((variant: any) => getItemBrand(item, variant))
          : [String(item.brand || 'Autres marques').trim()]
      ))).sort((a, b) => a.localeCompare(b, 'fr'))
    : [];

  const selectedBrandProducts = selectedUniverse?.selectedBrand
    ? selectedUniverse.items
        .map((item: any) => ({
          ...item,
          variants: (item.variants || []).filter(
            (variant: any) => getItemBrand(item, variant) === selectedUniverse.selectedBrand
          ),
        }))
        .filter((item: any) => item.variants.length > 0)
    : [];

  const productsBySubcategory = selectedBrandProducts.reduce((groups: Record<string, any[]>, item: any) => {
    const subcategory = String(item.subCategory || 'Autres produits').trim();
    (groups[subcategory] ||= []).push(item);
    return groups;
  }, {});

  const selectedBrandSlug = selectedUniverse?.selectedBrand
    ? selectedUniverse.selectedBrand
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/&/g, ' et ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    : '';

  return (
    <>
      <Helmet>
        <title>Couches bébé pas chères, hygiène et protections | Speed Services</title>
        <meta name="description" content="Achetez des couches bébé de plusieurs marques à prix compétitifs. Découvrez aussi nos protections adultes, produits d’hygiène et soins pour animaux. Prix TTC." />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="https://speedservices.store/" />
        <meta property="og:site_name" content="Speed Services" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content="Couches bébé pas chères, hygiène et protections | Speed Services" />
        <meta property="og:description" content="Plusieurs marques, plusieurs univers de produits et des prix affichés TTC. Comparez les formats sur Speed Services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://speedservices.store/" />
        <meta property="og:image" content="https://speedservices.store/fond.png" />
        <meta property="og:image:alt" content="Speed Services, boutique multi-marques de produits d’hygiène et de protection" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Couches bébé pas chères | Speed Services" />
        <meta name="twitter:description" content="Couches bébé multi-marques, hygiène et protections à prix compétitifs. Prix affichés TTC." />
        <meta name="twitter:image" content="https://speedservices.store/fond.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Organization', name: 'Speed Services', url: 'https://speedservices.store/', logo: 'https://speedservices.store/favicon.svg', email: SITE_CONFIG.email, telephone: SITE_CONFIG.phoneRaw,
          contactPoint: { '@type': 'ContactPoint', telephone: SITE_CONFIG.phoneRaw, contactType: 'customer service', availableLanguage: ['French'] }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'WebSite', name: 'Speed Services', url: 'https://speedservices.store/', inLanguage: 'fr-FR'
        })}</script>
      </Helmet>

      <main className="bg-white text-[#0A0A0A] font-sans overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-center bg-[#003366]">
          <div className="absolute inset-0 opacity-70">
            <img
              src="/fond.png"
              alt="Bébés en couches et soins"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/80 via-[#003366]/70 to-[#0F4C81]/60"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              
              <span className="text-[#60A5FA] text-xs font-bold uppercase tracking-widest mb-4 bg-black/30 backdrop-blur-sm border border-white/20 px-3.5 py-1 rounded-sm">
                Boutique multi-marques • Prix affichés TTC
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md">
                Couches bébé pas chères, hygiène et protections à prix compétitifs
              </h1>

              <p className="text-base sm:text-lg text-white/95 mb-8 leading-relaxed max-w-2xl drop-shadow">
                Comparez les marques, les tailles et les formats pour bébé, l’hygiène féminine, les protections adultes et les animaux. Les prix sont affichés TTC pour vous aider à choisir en toute clarté.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md">
                <a
                  href="#categories-section"
                  onClick={scrollToCategories}
                  className="bg-white text-[#003366] px-6 py-3.5 text-sm font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors shadow-lg rounded-sm cursor-pointer"
                >
                  <span>Consulter le Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <a
                  href="https://wa.me/33773594630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3.5 text-sm font-semibold flex items-center justify-center space-x-2 hover:bg-[#20bd5a] transition-colors shadow-lg rounded-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Écrire sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Barre de réassurance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/25 max-w-4xl mx-auto text-white">
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Shield className="w-5 h-5 text-[#60A5FA] shrink-0" />
                <span className="text-xs font-medium drop-shadow">Informations produit détaillées</span>
              </div>
              <div className="flex items-center space-x-3 justify-center">
                <Truck className="w-5 h-5 text-[#60A5FA] shrink-0" />
                <span className="text-xs font-medium drop-shadow">Livraison en France</span>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-end">
                <Package className="w-5 h-5 text-[#60A5FA] shrink-0" />
                <span className="text-xs font-medium drop-shadow">Plusieurs marques au catalogue</span>
              </div>
            </div>

          </div>
        </section>

        {/* Marquee Marques */}
        <section className="py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-4">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Les marques disponibles au catalogue</p>
          </div>
          
          <div className="relative w-full overflow-hidden flex whitespace-nowrap">
            <div className="flex animate-marquee space-x-6 py-2">
              {brands.concat(brands).map((brand, index) => (
                <div
                  key={index}
                  className="px-6 py-2.5 border border-gray-200 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 font-bold text-sm uppercase tracking-wide shrink-0"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* Categories Section */}
        <section id="categories-section" className="py-16 md:py-20 bg-white scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">
                Un Partenaire Unique pour Tous Vos Besoins en Hygiène
              </h2>
              <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                Choisissez un univers, puis une marque pour découvrir ses gammes et références.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => openCategorySelector(category)}
                  className="group relative aspect-[16/9] overflow-hidden rounded-sm block shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left w-full cursor-pointer"
                >
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-[#60A5FA] text-xs font-semibold group-hover:underline">
                      <span>Explorer les marques</span>
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* MODAL DE SÉLECTION : UNIVERS → MARQUE → SOUS-CATÉGORIE / GAMME */}
        {selectedUniverse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-5">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="catalog-selector-title"
              className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
            >
              <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700 sm:text-xs">
                      <Sparkles size={14} /> Sélection du catalogue
                    </span>
                    <h3 id="catalog-selector-title" className="text-xl font-black leading-tight text-slate-900 sm:text-2xl">
                      {selectedUniverse.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {selectedUniverse.selectedBrand
                        ? `Choisissez une gamme ${selectedUniverse.selectedBrand}. Les formats et les tailles seront présentés sur la page suivante.`
                        : 'Commencez par choisir une marque pour afficher uniquement ses gammes.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedUniverse(null)}
                    className="shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Fermer la sélection"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold sm:text-xs">
                  <span className="rounded-full bg-sky-700 px-3 py-1.5 text-white">1. Marque</span>
                  <span className="h-px w-6 bg-slate-200" />
                  <span className={`rounded-full px-3 py-1.5 ${selectedUniverse.selectedBrand ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    2. Gamme
                  </span>
                </div>

                {selectedUniverse.selectedBrand && (
                  <button
                    onClick={() => setSelectedUniverse({ ...selectedUniverse, selectedBrand: null })}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 transition hover:text-sky-900"
                  >
                    <ChevronRight size={15} className="rotate-180" /> Retour aux marques
                  </button>
                )}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">
                {!selectedUniverse.selectedBrand ? (
                  <>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 sm:text-base">Choisir une marque</h4>
                        <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">{modalBrands.length} marque{modalBrands.length > 1 ? 's' : ''} disponible{modalBrands.length > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {modalBrands.map((brand) => {
                        const brandItems = selectedUniverse.items.filter((item: any) =>
                          (item.variants || []).some((variant: any) => getItemBrand(item, variant) === brand)
                        );
                        const referenceCount = brandItems.reduce((total: number, item: any) =>
                          total + (item.variants || []).filter((variant: any) => getItemBrand(item, variant) === brand).length, 0
                        );
                        const brandImage = brandItems
                          .flatMap((item: any) => (item.variants || [])
                            .filter((variant: any) => getItemBrand(item, variant) === brand)
                            .map((variant: any) => variant.image))
                          .find(Boolean);

                        return (
                          <button
                            key={brand}
                            type="button"
                            onClick={() => setSelectedUniverse({ ...selectedUniverse, selectedBrand: brand })}
                            className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-sky-300 hover:shadow-md sm:gap-4 sm:p-4"
                          >
                            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-2 sm:h-20 sm:w-20">
                              {brandImage ? (
                                <img src={brandImage} alt={`Produits ${brand}`} className="max-h-full max-w-full object-contain" loading="lazy" />
                              ) : (
                                <Package size={25} className="text-slate-300" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-extrabold text-slate-900 transition group-hover:text-sky-700 sm:text-base">{brand}</span>
                              <span className="mt-1 block text-[11px] text-slate-500 sm:text-xs">
                                {brandItems.length} gamme{brandItems.length > 1 ? 's' : ''} · {referenceCount} référence{referenceCount > 1 ? 's' : ''}
                              </span>
                              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-sky-700">
                                Voir les gammes <ChevronRight size={14} />
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700">Marque sélectionnée</span>
                        <h4 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">{selectedUniverse.selectedBrand}</h4>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                        {selectedBrandProducts.length} gamme{selectedBrandProducts.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {Object.entries(productsBySubcategory).map(([subcategory, items]) => (
                        <section key={subcategory}>
                          <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                            <h5 className="text-xs font-extrabold uppercase tracking-wide text-slate-700 sm:text-sm">{subcategory}</h5>
                            <span className="shrink-0 text-[10px] font-medium text-slate-400">{items.length} gamme{items.length > 1 ? 's' : ''}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            {items.map((item: any) => {
                              const firstImage = item.variants?.[0]?.image;
                              const minimumPrice = Math.min(...item.variants.map((variant: any) => Number(variant.price) || 0));
                              const destination = `${selectedUniverse.basePath}/${item.id}?marque=${selectedBrandSlug}`;

                              return (
                                <Link
                                  key={item.id}
                                  to={destination}
                                  onClick={() => setSelectedUniverse(null)}
                                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-sky-300 hover:shadow-sm sm:gap-4 sm:p-4"
                                >
                                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-2 sm:h-20 sm:w-20">
                                    {firstImage && <img src={firstImage} alt={item.name} className="max-h-full max-w-full object-contain" loading="lazy" />}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-bold leading-snug text-slate-900 transition group-hover:text-sky-700 sm:text-base">{item.name}</span>
                                    <span className="mt-1 line-clamp-2 block text-[11px] leading-relaxed text-slate-500 sm:text-xs">{item.description}</span>
                                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold text-slate-600 sm:text-[11px]">
                                      <span>{item.variants.length} format{item.variants.length > 1 ? 's' : ''}</span>
                                      <span>À partir de {minimumPrice.toFixed(2)} € TTC</span>
                                    </span>
                                  </span>
                                  <ChevronRight size={18} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-sky-700" />
                                </Link>
                              );
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA Final */}
        <section className="relative py-16 bg-[#003366] text-center text-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Besoin d'informations ou d'un accompagnement personnalisé ?
            </h2>
            <p className="text-white/80 text-sm max-w-2xl mx-auto mb-8">
              Contactez notre équipe directement par téléphone au 07 73 59 46 30 ou via WhatsApp pour toute question relative à nos gammes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/33773594630"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-3 text-sm font-semibold hover:bg-[#20bd5a] transition-colors inline-flex items-center space-x-2 shadow-lg rounded-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Écrire sur WhatsApp</span>
              </a>
              <a
                href="tel:0773594630"
                className="bg-white text-[#003366] px-8 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg rounded-sm"
              >
                <Phone className="w-4 h-4" />
                <span>07 73 59 46 30</span>
              </a>
            </div>
          </div>
        </section>


        {/* Contenu éditorial et liens HTML explorables par les moteurs de recherche */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Couches bébé multi-marques, hygiène et protections à prix TTC</h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-600">Speed Services rassemble plusieurs marques de couches bébé et des produits d’hygiène pour toute la famille. Comparez les marques, les tailles, le nombre d’unités et les prix affichés TTC avant de choisir votre référence.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Couches bébé multi-marques</h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-4">Retrouvez plusieurs marques de couches bébé, avec des couches classiques, des culottes et différents conditionnements. Comparez la taille, la fourchette de poids, le nombre de couches par paquet et le prix TTC pour trouver le format adapté à votre besoin.</p>
                <Link className="inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900" to="/produit/couches/bebe">Comparer les couches bébé <span aria-hidden="true">→</span></Link>
              </article>
              <article className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Hygiène et protections au quotidien</h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-4">Retrouvez aussi les protections pour adultes, l’hygiène féminine et les produits pour animaux. Chaque univers rassemble les références disponibles avec leurs informations et leurs prix TTC.</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                  <Link className="text-sky-700 hover:text-sky-900" to="/produit/incontinence-adultes">Protections adultes</Link>
                  <Link className="text-sky-700 hover:text-sky-900" to="/produit/hygiene-feminine">Hygiène féminine</Link>
                  <Link className="text-sky-700 hover:text-sky-900" to="/produit/petcare">PetCare</Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};