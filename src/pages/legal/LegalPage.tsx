import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Shield, FileText, Building2, ArrowLeft, RefreshCw, Truck, CheckCircle, HelpCircle } from 'lucide-react';

interface LegalPageProps {
  activeTab?: 'mentions' | 'confidentialite' | 'cgv' | 'remboursement';
}

export const LegalPage: React.FC<LegalPageProps> = ({ activeTab = 'mentions' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || activeTab;

  const setTab = (tabName: string) => {
    setSearchParams({ tab: tabName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Informations Légales & Réglementaires | {SITE_CONFIG.name}</title>
        <meta name="description" content="Mentions légales, politique de confidentialité, conditions générales de vente et politique de remboursement de Brands Collection B.V. (Speed Services Distribution)." />
      </Helmet>

      {/* En-tête de la page */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sky-400 text-xs font-semibold mb-4 hover:underline">
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Informations Légales & Conformité B2B</h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Transparence, réglementations et cadre contractuel de nos services de distribution en gros.
          </p>

          {/* Onglets de navigation interne */}
          <div className="flex flex-wrap gap-3 mt-8 border-b border-slate-800 pb-4">
            <button
              onClick={() => setTab('mentions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'mentions'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Building2 size={15} /> Legal Notice
            </button>
            <button
              onClick={() => setTab('confidentialite')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'confidentialite'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Shield size={15} /> Privacy Policy
            </button>
            <button
              onClick={() => setTab('cgv')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'cgv'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileText size={15} /> Terms & Conditions (CGV)
            </button>
            <button
              onClick={() => setTab('remboursement')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'remboursement'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <RefreshCw size={15} /> Politique de Remboursement
            </button>
          </div>
        </div>
      </section>

      {/* Contenu dynamique des pages */}
      <section className="py-16 bg-slate-50 min-h-[500px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          
          {/* ONGLET 1 : MENTIONS LÉGALES */}
          {currentTab === 'mentions' && (
            <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">Conformité Entreprise</span>
                <h2 className="text-2xl font-black text-slate-900">Legal Notice (Mentions Légales)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Informations de la Société</h3>
                  <p><strong>Raison sociale :</strong> Brands Collection B.V.</p>
                  <p><strong>Forme juridique :</strong> Private Limited Company (B.V.)</p>
                  <p><strong>Nom commercial :</strong> Speed Services Distribution (Speed Service)</p>
                  <p><strong>Siège social :</strong> Herengracht 450, 1017 CA Amsterdam, Pays-Bas</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Immatriculation & Taxes</h3>
                  <p><strong>Numéro SIREN / KVK :</strong> 894 321 076</p>
                  <p><strong>TVA Intracommunautaire :</strong> FR 42 894321076</p>
                  <p><strong>Capital social :</strong> 50 000,00 €</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Direction et Publication</h3>
                <p><strong>Directeur de la publication et Gérant :</strong> Aurélien Balthazar</p>
                <p><strong>Contact e-mail :</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-sky-600 font-semibold hover:underline">{SITE_CONFIG.email}</a></p>
                <p><strong>Téléphone professionnel :</strong> <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-sky-600 font-semibold hover:underline">{SITE_CONFIG.phoneDisplay}</a></p>
              </div>
            </div>
          )}

          {/* ONGLET 2 : POLITIQUE DE CONFIDENTIALITÉ */}
          {currentTab === 'confidentialite' && (
            <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">Protection des Données (RGPD)</span>
                <h2 className="text-2xl font-black text-slate-900">Privacy Policy (Politique de Confidentialité)</h2>
              </div>

              <p>
                Chez <strong>Speed Services Distribution</strong> (Brands Collection B.V.), nous accordons une importance majeure à la confidentialité et à la sécurité des informations professionnelles transmises par nos partenaires B2B, revendeurs et établissements clients.
              </p>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">1. Données collectées</h3>
                <p>Nous collectons uniquement les informations strictement nécessaires à la gestion de nos relations commerciales de gros : nom de la structure, nom du responsable ou acheteur, adresses de facturation et de livraison, e-mail ({SITE_CONFIG.email}), numéro de téléphone ({SITE_CONFIG.phoneDisplay}).</p>

                <h3 className="font-bold text-slate-900 text-lg">2. Finalité des traitements</h3>
                <p>Ces données sont utilisées pour le traitement des commandes en gros, le suivi logistique, la facturation, ainsi que la communication directe via nos canaux professionnels (téléphone, WhatsApp, e-mail).</p>

                <h3 className="font-bold text-slate-900 text-lg">3. Sécurité et Vos Droits</h3>
                <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données professionnelles. Pour toute demande, contactez directement notre direction à <a href={`mailto:${SITE_CONFIG.email}`} className="text-sky-600 font-semibold hover:underline">{SITE_CONFIG.email}</a>.</p>
              </div>
            </div>
          )}

          {/* ONGLET 3 : CONDITIONS GÉNÉRALES DE VENTE */}
          {currentTab === 'cgv' && (
            <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">Cadre Contractuel B2B</span>
                <h2 className="text-2xl font-black text-slate-900">Terms & Conditions (Conditions Générales de Vente)</h2>
              </div>

              <p>
                Les présentes conditions générales régissent l'ensemble des ventes de produits d'hygiène et de grande consommation (marques Babylino, Iasi, EveryDay, Rispet) réalisées par la société <strong>Brands Collection B.V.</strong> sous le nom commercial <strong>Speed Services Distribution</strong>.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Article 1 : Champ d'application professionnel</h3>
                  <p className="text-xs md:text-sm text-slate-600">Nos offres et catalogues s'adressent exclusivement aux professionnels (revendeurs, e-commerçants, structures de santé et distributeurs).</p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Article 2 : Commandes et Validation</h3>
                  <p className="text-xs md:text-sm text-slate-600">Les commandes s'effectuent directement en ligne sur notre site internet. Toute commande validée sur nos supports implique l'adhésion entière et sans réserve aux présentes CGV. Pour toute assistance, vous pouvez joindre notre service client par téléphone au <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-sky-600 font-semibold">{SITE_CONFIG.phoneDisplay}</a> ou via WhatsApp.</p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Article 3 : Réserve de propriété</h3>
                  <p className="text-xs md:text-sm text-slate-600">Brands Collection B.V. conserve la propriété pleine et entière des marchandises vendues jusqu'au complet encaissement du prix facturé en principal et accessoires.</p>
                </div>
              </div>
            </div>
          )}

          {/* ONGLET 4 : POLITIQUE DE REMBOURSEMENT & RETOURS */}
          {currentTab === 'remboursement' && (
            <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">Garantie & Service Client B2B</span>
                <h2 className="text-2xl font-black text-slate-900">Politique de Remboursement & Avoirs Commerciales</h2>
              </div>

              <p className="text-slate-600">
                Chez <strong>Speed Services Distribution</strong> (Brands Collection B.V.), la satisfaction de nos partenaires grossistes, revendeurs et établissements professionnels est au cœur de nos engagements. En tant que distributeur B2B d'équipements et d'hygiène, voici les règles applicables en matière d'avoirs, de retours et de réclamations.
              </p>

              {/* Résumé synthétique sous forme de cartes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex flex-col items-center text-center">
                  <Truck className="text-sky-600 mb-2" size={24} />
                  <span className="font-bold text-xs text-slate-900 uppercase">Contrôle à la Réception</span>
                  <span className="text-[11px] text-slate-500 mt-1">Vérification immédiate des palettes/colis avec le transporteur.</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col items-center text-center">
                  <CheckCircle className="text-emerald-600 mb-2" size={24} />
                  <span className="font-bold text-xs text-slate-900 uppercase">Délai de Réclamation</span>
                  <span className="text-[11px] text-slate-500 mt-1"> Signalement sous 48h ouvrées maximum après livraison.</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex flex-col items-center text-center">
                  <RefreshCw className="text-purple-600 mb-2" size={24} />
                  <span className="font-bold text-xs text-slate-900 uppercase">Avoir ou Remplacement</span>
                  <span className="text-[11px] text-slate-500 mt-1">Traitement prioritaire sous 5 à 7 jours ouvrés.</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">1. Avaries de Transport & Marchandises Endommagées</h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Lors de la livraison de vos palettes ou cartons, l'acheteur est tenu de vérifier l'état des colis. En cas d’avarie constatée (carton écrasé, produit percé, carton manquant), des réserves précises et motivées doivent être mentionnées obligatoirement sur le récépissé du transporteur. Toute avarie doit nous être notifiée sous <strong>48h ouvrées</strong> avec photos justificatives.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">2. Erreur de Préparation de Commande</h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Si une référence reçue ne correspond pas à votre facture (erreur de SKU, carton non conforme), **Brands Collection B.V.** prendra à sa charge l'enlèvement du produit erroné et l'expédition immédiate de la bonne référence, ou émettra un avoir créditeur à valoir sur vos prochaines commandes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">3. Conditions d'Acceptation des Retours</h3>
                  <ul className="list-disc pl-5 text-xs md:text-sm text-slate-600 space-y-1 mt-1">
                    <li>Les paquets et cartons de produits d'hygiène (Babylino, Iasi, EveryDay, Rispet) doivent être <strong>scellés, d'origine et intacts</strong> pour des raisons dermatologiques et de conformité sanitaire.</li>
                    <li>Aucun retour de lot entamé ou ouvert ne sera accepté.</li>
                    <li>Tout retour spontané non validé préalable par notre service support sera refusé par nos entrepôts.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">4. Procédure de Demande d'Avoir ou de Remboursement</h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Pour effectuer une réclamation professionnelle, contactez simplement notre service client avec votre numéro de commande/facture :
                  </p>
                  <div className="mt-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div>
                      <p><strong>E-mail Support :</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-sky-600 font-bold">{SITE_CONFIG.email}</a></p>
                      <p><strong>Ligne Directe B2B :</strong> <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-sky-600 font-bold">{SITE_CONFIG.phoneDisplay}</a></p>
                    </div>
                    <span className="bg-sky-600 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shrink-0">
                      <HelpCircle size={14} /> Réponse sous 24h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};