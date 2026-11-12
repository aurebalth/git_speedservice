import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../data/siteConfig';
import { BABY_CATALOG } from '../../data/babyCatalog';
import { FEMALE_CATALOG } from '../../data/femaleCatalog';
import { ADULT_CATALOG } from '../../data/adultCatalog';
import { PET_CATALOG } from '../../data/petCatalog';
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
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // État pour gérer la modal/popover de choix de sous-catégorie
  const [selectedUniverse, setSelectedUniverse] = useState<{
    title: string;
    basePath: string;
    items: any[];
  } | null>(null);

  const categories = [
    { 
      id: "baby",
      name: "Bébé & Enfant (Babylino)", 
      basePath: "/produit/couches/bebe",
      catalog: BABY_CATALOG,
      description: "Couches ultra-absorbantes, formats éco, pants et lingettes certifiés OEKO-TEX.", 
      image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80" 
    },
    { 
      id: "female",
      name: "Hygiène Féminine (EveryDay)", 
      basePath: "/produit/hygiene-feminine",
      catalog: FEMALE_CATALOG,
      description: "Serviettes hygiéniques ultra avec voile 100% coton, protège-slips et lingettes démaquillantes PomPon.", 
      image_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80" 
    },
    { 
      id: "adult",
      name: "Incontinence Adultes (IASI)", 
      basePath: "/produit/incontinence-adultes",
      catalog: ADULT_CATALOG,
      description: "Protections anatomiques, culottes absorbantes et alèses de protection pour adultes.", 
      image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80" 
    },
    { 
      id: "pet",
      name: "PetCare & Entretien (RisPET)", 
      basePath: "/produit/petcare",
      catalog: PET_CATALOG,
      description: "Tapis hygiéniques pour animaux, lingettes, shampooings et accessoires de nettoyage pour sols.", 
      image_url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80" 
    },
  ];

  const brands = [
    "Babylino", "EveryDay", "IASI", "RisPET", "PomPon", "BabyCare", 
    "OEKO-TEX", "Dry-Matrix", "Cotton Soft", "Safe Nights", "HyperDry"
  ];

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
      items: category.catalog || []
    });
  };

  return (
    <>
      <Helmet>
        <title>{SITE_CONFIG.name} | Distribution de Produits d'Hygiène & Soins</title>
        <meta name="description" content="Retrouvez une sélection complète de marques leaders en couches pour bébés, soins féminins, hygiène adulte et protection pour animaux." />
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
                Distributeur Officiel • Produits d'Hygiène & Protection
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md">
                L'hygiène et le soin au service de votre quotidien
              </h1>

              <p className="text-base sm:text-lg text-white/95 mb-8 leading-relaxed max-w-2xl drop-shadow">
                Retrouvez une sélection complète de marques leaders en couches pour bébés, soins féminins, hygiène adulte et protection pour animaux.
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
                <span className="text-xs font-medium drop-shadow">Qualité & Tolérance Certifiées</span>
              </div>
              <div className="flex items-center space-x-3 justify-center">
                <Truck className="w-5 h-5 text-[#60A5FA] shrink-0" />
                <span className="text-xs font-medium drop-shadow">Livraison Rapide & Logistique Soignée</span>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-end">
                <Package className="w-5 h-5 text-[#60A5FA] shrink-0" />
                <span className="text-xs font-medium drop-shadow">Marques Européennes Officielles</span>
              </div>
            </div>

          </div>
        </section>

        {/* Marquee Marques */}
        <section className="py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-4">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Nos Marques & Standards de Qualité</p>
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
                Cliquez sur un univers pour afficher directement les sous-catégories et gammes disponibles.
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
                      <span>Choisir une sous-catégorie</span>
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* MODAL INTERACTIVE DE CHOIX DE SOUS-CATÉGORIE */}
        {selectedUniverse && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
              
              <button 
                onClick={() => setSelectedUniverse(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Sparkles size={14} /> Sélection Rapide
                </span>
                <h3 className="text-2xl font-black text-slate-900">{selectedUniverse.title}</h3>
                <p className="text-slate-500 text-xs mt-1">Choisissez la sous-catégorie exacte que vous souhaitez consulter :</p>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {selectedUniverse.items.map((item: any) => (
                  <Link
                    key={item.id}
                    to={`${selectedUniverse.basePath}/${item.id}`}
                    onClick={() => setSelectedUniverse(null)}
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl p-1 shrink-0 flex items-center justify-center">
                        <img 
                          src={item.variants?.[0]?.image} 
                          alt={item.name} 
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded uppercase block w-fit mb-0.5">
                          {item.subCategory}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
                  </Link>
                ))}
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

      </main>
    </>
  );
};