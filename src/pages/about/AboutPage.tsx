import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../data/siteConfig';
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
      desc: "Nous sélectionnons rigoureusement des marques de renom (Babylino, EveryDay, IASI, RisPET) reconnues pour leurs standards élevés et leurs certifications dermatologiques strictes."
    },
    {
      icon: Truck,
      title: "Logistique & Réactivité",
      desc: "Grâce à une organisation logistique rigoureuse, nous garantissons un traitement fluide de vos commandes et une disponibilité constante de nos gammes."
    },
    {
      icon: Award,
      title: "Partenariats de Confiance",
      desc: "Nous bâtissons des relations durables basées sur la transparence, l'écoute et l'accompagnement personnalisé de chacun de nos clients."
    },
    {
      icon: Globe,
      title: "Engagement Durable",
      desc: "Nos produits phares intègrent des matériaux écologiques, des voiles 100% coton et des compositions respectueuses de l'environnement et de la peau."
    }
  ];

  return (
    <>
      <Helmet>
        <title>À propos de nous | {SITE_CONFIG.name}</title>
        <meta name="description" content="Découvrez l'histoire, les valeurs et l'engagement de Speed Services Distribution dans la fourniture de produits d'hygiène et de soins de qualité." />
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
              Speed Services Distribution s'impose comme un acteur incontournable dans la mise à disposition de produits de grande consommation haut de gamme.
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
                  Fondée avec l'ambition de simplifier l'accès aux meilleures solutions d'hygiène et de protection, **Speed Services Distribution** s'attache à connecter les foyers et les professionnels aux fabricants européens les plus exigeants.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  De la petite enfance avec les gammes hypoallergéniques Babylino jusqu'aux soins spécialisés pour adultes et animaux (RisPET), chaque référence de notre catalogue est choisie pour son niveau de performance, sa sécurité dermatologique et son respect de l'environnement.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-sky-600" />
                    <span>Marques Certifiées EU</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-sky-600" />
                    <span>Écoute & Service Client</span>
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
                  <p className="text-2xl font-black text-[#60A5FA]">100%</p>
                  <p className="text-xs text-white/80 mt-1">Engagement Qualité & Transparence</p>
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