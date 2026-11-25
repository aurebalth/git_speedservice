import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  Globe, 
  Phone, 
  MessageCircle, 
  CheckCircle2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Exigence & Qualité",
      desc: "Nous construisons un catalogue multi-marques qui évolue au fil des références disponibles, avec des produits pour bébé, l’hygiène féminine, les protections adultes et les animaux."
    },
    {
      icon: Truck,
      title: "Logistique & Réactivité",
      desc: "Nous veillons à présenter clairement les références, les conditionnements, les disponibilités et les informations utiles au suivi de chaque commande."
    },
    {
      icon: Award,
      title: "Partenariats de Confiance",
      desc: "Nous bâtissons des relations durables basées sur la transparence, l'écoute et l'accompagnement personnalisé de chacun de nos clients."
    },
    {
      icon: Globe,
      title: "Informations produit",
      desc: "Les caractéristiques et engagements propres à chaque produit sont présentés sur sa fiche afin de vous aider à comparer les références en toute clarté."
    }
  ];

  return (
    <>
      <Helmet>
        <title>À propos de Speed Services | Boutique d’hygiène multi-marques</title>
        <meta name="description" content="Découvrez Speed Services, une boutique en ligne multi-marques de couches bébé, hygiène féminine, protections adultes et produits pour animaux. Prix affichés TTC." />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="https://speedservices.store/about" />
        <meta property="og:site_name" content="Speed Services" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content="À propos de Speed Services | Boutique d’hygiène multi-marques" />
        <meta property="og:description" content="Découvrez Speed Services et sa sélection multi-marques de produits d’hygiène et de protection à prix TTC." />
        <meta property="og:url" content="https://speedservices.store/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <main className="bg-white text-[#0A0A0A] font-sans">
        
        {/* HERO SECTION ABOUT AVEC /fond.png */}
        <section className="relative bg-[#003366] text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img
              src="/fond.png"
              alt="Bébés en couches et soins"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/85 via-[#003366]/75 to-[#0F4C81]/65"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="text-[#60A5FA] text-xs font-bold uppercase tracking-widest bg-black/30 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 rounded-sm inline-block mb-4 shadow-sm">
              Notre Histoire & Nos Valeurs
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto drop-shadow-md">
              L'excellence au cœur de la distribution d'hygiène et de soins
            </h1>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
              Speed Services Distribution développe une boutique en ligne multi-marques dédiée aux produits d'hygiène et de protection.
            </p>
          </div>
        </section>

        {/* NOTRE HISTOIRE (CRÉATIF & PRO) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Qui sommes-nous ?</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] leading-snug">
                  Une vision moderne de la distribution, centrée sur le bien-être et la qualité.
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Speed Services Distribution développe une boutique en ligne multi-marques dédiée aux produits d’hygiène et de protection. Notre objectif est de rendre le catalogue facile à parcourir, avec des univers distincts et des informations claires sur chaque référence.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Le catalogue couvre plusieurs besoins du quotidien : produits pour bébé et enfant, hygiène féminine, protections pour adultes et articles pour animaux. De nouvelles marques et références peuvent être ajoutées sans changer l’organisation de la boutique.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-sky-600" />
                    <span>Catalogue multi-marques</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-sky-600" />
                    <span>Service client accessible</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1000&q=80"
                    alt="Entrepôt et logistique Speed Services"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#003366] text-white p-6 rounded-sm shadow-lg hidden sm:block">
                  <p className="text-lg font-black text-[#60A5FA]">Multi-marques</p>
                  <p className="text-xs text-white/80 mt-1">Plusieurs univers, un seul site</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* NOS VALEURS (GRILLE ÉPURÉE) */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-3">
                Les Piliers de Notre Engagement
              </h2>
              <p className="text-gray-600 text-sm">
                Ce qui guide chacune de nos actions au quotidien pour vous offrir le meilleur service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-sm bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">{val.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION CONTACT / CTA FINAL */}
        <section className="relative py-20 bg-[#003366] text-center text-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Envie d'en savoir plus ou de collaborer avec nous ?
            </h2>
            <p className="text-white/80 text-sm max-w-xl mx-auto mb-8">
              Notre équipe se tient à votre entière disposition pour échanger sur vos besoins et vous apporter une réponse sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/33773594630"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#20bd5a] transition-colors inline-flex items-center space-x-2 shadow-lg rounded-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Écrire sur WhatsApp</span>
              </a>
              <a
                href="tel:0773594630"
                className="bg-white text-[#003366] px-8 py-3.5 text-sm font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg rounded-sm"
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