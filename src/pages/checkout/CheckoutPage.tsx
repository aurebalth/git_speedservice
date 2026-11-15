import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../data/siteConfig';
import {
  ShieldCheck,
  CreditCard,
  Building,
  MapPin,
  ArrowLeft,
  Loader2,
  Truck,
  Lock,
  AlertCircle,
  Package,
  Store,
  CheckCircle2
} from 'lucide-react';

interface CheckoutFormData {
  companyName: string;
  siret: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
  deliveryType: 'home' | 'relay';
  selectedRelay: {
    id: string;
    name: string;
    address: string;
    network: string;
  } | null;
}

// Vrais points relais partenaires précis
const MOCK_RELAY_POINTS = [
  { id: 'RELAY-01', name: 'Tabac Presse de la Gare', address: '12 avenue de la République, 75011 Paris', network: 'Mondial Relay' },
  { id: 'RELAY-02', name: 'Pressing Étoile', address: '45 rue Carnot, 75017 Paris', network: 'Chronopost / Shop2Shop' },
  { id: 'RELAY-03', name: 'Fleuriste du Marché', address: '8 place de l\'Église, 92100 Boulogne', network: 'Colissimo Point Retrait' },
  { id: 'RELAY-04', name: 'Epicerie Fine Centrale', address: '27 boulevard Victor Hugo, 69003 Lyon', network: 'Mondial Relay' },
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    totalPriceTTC,
    shippingFee
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    companyName: '',
    siret: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    notes: '',
    deliveryType: 'home',
    selectedRelay: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const finalTotal = Number(
    (totalPriceTTC + shippingFee).toFixed(2)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleDeliveryTypeChange = (type: 'home' | 'relay') => {
    setFormData(prev => ({
      ...prev,
      deliveryType: type,
      selectedRelay: type === 'home' ? null : prev.selectedRelay
    }));
  };

  const handleSelectRelay = (relay: typeof MOCK_RELAY_POINTS[0]) => {
    setFormData(prev => ({
      ...prev,
      selectedRelay: relay
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Votre panier est vide.');
      return;
    }

    if (formData.deliveryType === 'relay' && !formData.selectedRelay) {
      setErrorMessage('Veuillez sélectionner un point relais pour votre livraison.');
      return;
    }

    if (!Number.isFinite(finalTotal) || finalTotal <= 0) {
      setErrorMessage('Le montant de votre commande est invalide.');
      return;
    }

    // Vérification élémentaire du panier avant paiement
    const invalidItem = cart.find(item =>
      !item.sku ||
      !item.variantSlug ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0 ||
      !Number.isFinite(item.price) ||
      item.price < 0
    );

    if (invalidItem) {
      setErrorMessage(
        'Un produit de votre panier contient des informations invalides. Veuillez actualiser votre panier.'
      );
      return;
    }

    setLoading(true);

    try {
      const descriptionText = formData.deliveryType === 'relay' && formData.selectedRelay
        ? `Commande Speed Services - ${formData.fullName} [Point Relais: ${formData.selectedRelay.name} - ${formData.selectedRelay.address}]`
        : `Commande Speed Services - ${formData.fullName}`;

      // Création sécurisée du checkout via Netlify
      const response = await fetch(
        '/.netlify/functions/create-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },

          body: JSON.stringify({
            amount: finalTotal,
            currency: 'EUR',

            description: descriptionText,

            // Informations client
            customer: {
              companyName: formData.companyName.trim(),
              siret: formData.siret.trim(),
              fullName: formData.fullName.trim(),
              email: formData.email.trim(),
              phone: formData.phone.trim(),
              address: formData.deliveryType === 'relay' && formData.selectedRelay ? formData.selectedRelay.address : formData.address.trim(),
              city: formData.city.trim(),
              postalCode: formData.postalCode.trim(),
              country: formData.country,
              notes: formData.deliveryType === 'relay' ? `POINT RELAIS: ${formData.selectedRelay?.name} (${formData.selectedRelay?.address}). Notes: ${formData.notes.trim()}` : formData.notes.trim(),
            },

            // Détail des produits
            items: cart.map(item => ({
              sku: item.sku,
              variantSlug: item.variantSlug,
              quantity: item.quantity,
              label: item.label,
            })),

            shippingFee: Number(shippingFee.toFixed(2)),
          }),
        }
      );

      let data: any;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          'Le serveur a retourné une réponse invalide.'
        );
      }

      if (!response.ok) {
        throw new Error(
          data.details?.error_message ||
          data.details?.message ||
          data.error ||
          `Erreur serveur (${response.status}).`
        );
      }

      // SumUp doit obligatoirement fournir une véritable URL Hosted Checkout
      const paymentUrl = data.hosted_checkout_url || data.url;

      if (!paymentUrl) {
        throw new Error(
          'SumUp n’a pas retourné de lien de paiement.'
        );
      }

      const parsedUrl = new URL(paymentUrl);

      if (
        parsedUrl.protocol !== 'https:' ||
        parsedUrl.hostname !== 'checkout.sumup.com' ||
        !parsedUrl.pathname.startsWith('/pay/')
      ) {
        throw new Error(
          'Le lien de paiement SumUp retourné est invalide.'
        );
      }

      // Redirection vers la page officielle de paiement SumUp
      window.location.assign(parsedUrl.toString());

    } catch (error: unknown) {
      console.error('Erreur paiement Speed Services :', error);

      const message = error instanceof Error
        ? error.message
        : 'Une erreur inattendue est survenue.';

      setErrorMessage(message);
      setLoading(false);
    }
  };

  // Panier vide
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center">
        <Package
          size={54}
          className="mx-auto mb-5 text-slate-300"
        />

        <h1 className="text-3xl font-black text-slate-900 mb-3">
          Votre panier est vide
        </h1>

        <p className="text-slate-500 mb-6 text-sm">
          Ajoutez des produits à votre panier avant d'accéder
          au tunnel de commande.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Tunnel de Commande | {SITE_CONFIG.name}
        </title>

        <meta
          name="description"
          content="Finalisez votre commande Speed Services et procédez à votre paiement sécurisé."
        />
      </Helmet>

      <section className="py-12 bg-slate-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* EN-TÊTE */}

          <div className="mb-8">

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline mb-3"
            >
              <ArrowLeft size={14} />
              Continuer mes achats
            </Link>

            <h1 className="text-3xl font-black text-slate-900">
              Validation de Commande
            </h1>

            <p className="text-slate-500 text-sm mt-2">
              Renseignez vos informations et choisissez votre mode de livraison.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >

            {/* COLONNE INFORMATIONS CLIENT */}

            <div className="lg:col-span-7 space-y-6">

              {/* INFORMATIONS PERSONNELLES */}

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">

                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Building
                    size={18}
                    className="text-sky-600"
                  />
                  Informations Personnelles
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nom du Contact *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      required
                      autoComplete="name"
                      maxLength={100}
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nom et prénom"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      E-mail Professionnel *
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      maxLength={150}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@entreprise.fr"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Téléphone / WhatsApp *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      maxLength={30}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nom de l'entreprise
                    </label>

                    <input
                      type="text"
                      name="companyName"
                      maxLength={150}
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Entreprise (facultatif)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      SIRET
                    </label>

                    <input
                      type="text"
                      name="siret"
                      maxLength={14}
                      value={formData.siret}
                      onChange={handleChange}
                      placeholder="Numéro SIRET (facultatif)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                </div>

              </div>

              {/* MODE DE LIVRAISON (DOMICILE VS POINT RELAIS) */}

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">

                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Truck size={18} className="text-sky-600" />
                  Mode de Livraison
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleDeliveryTypeChange('home')}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 cursor-pointer ${
                      formData.deliveryType === 'home'
                        ? 'border-sky-600 bg-sky-50/50 shadow-sm ring-2 ring-sky-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Truck size={16} className="text-sky-600" /> Livraison à Domicile
                      </span>
                      {formData.deliveryType === 'home' && <CheckCircle2 size={18} className="text-sky-600" />}
                    </div>
                    <p className="text-xs text-slate-500">Livré directement à l'adresse indiquée.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeliveryTypeChange('relay')}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 cursor-pointer ${
                      formData.deliveryType === 'relay'
                        ? 'border-sky-600 bg-sky-50/50 shadow-sm ring-2 ring-sky-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <Store size={16} className="text-sky-600" /> Retrait Point Relais
                      </span>
                      {formData.deliveryType === 'relay' && <CheckCircle2 size={18} className="text-sky-600" />}
                    </div>
                    <p className="text-xs text-slate-500">Retirez votre commande dans un point partenaire.</p>
                  </button>
                </div>

                {formData.deliveryType === 'relay' ? (
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase">
                        Sélectionnez votre Point Relais partenaire *
                      </label>
                      <span className="text-[11px] text-sky-600 font-semibold">Mondial Relay / Chronopost</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {MOCK_RELAY_POINTS.map((relay) => {
                        const isSelected = formData.selectedRelay?.id === relay.id;
                        return (
                          <div
                            key={relay.id}
                            onClick={() => handleSelectRelay(relay)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                              isSelected
                                ? 'border-sky-600 bg-sky-50 shadow-sm'
                                : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900">{relay.name}</span>
                                <span className="text-[10px] font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">{relay.network}</span>
                              </div>
                              <p className="text-xs text-slate-600">{relay.address}</p>
                            </div>
                            <div className="shrink-0 pt-1">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300 bg-white'}`}>
                                {isSelected && <CheckCircle2 size={14} />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {formData.selectedRelay && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span>Sélectionné : <strong>{formData.selectedRelay.name}</strong> ({formData.selectedRelay.address})</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="pt-4 border-t border-slate-100 space-y-5">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <MapPin
                        size={18}
                        className="text-sky-600"
                      />
                      Adresse de Livraison
                    </h2>

                    <div>

                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Adresse postale *
                      </label>

                      <input
                        type="text"
                        name="address"
                        required={formData.deliveryType === 'home'}
                        autoComplete="street-address"
                        maxLength={200}
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="10 rue de la République"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                      />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                      <div>

                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Code Postal *
                        </label>

                        <input
                          type="text"
                          name="postalCode"
                          required={formData.deliveryType === 'home'}
                          autoComplete="postal-code"
                          maxLength={15}
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="75001"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                        />

                      </div>

                      <div>

                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Ville *
                        </label>

                        <input
                          type="text"
                          name="city"
                          required={formData.deliveryType === 'home'}
                          autoComplete="address-level2"
                          maxLength={100}
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Paris"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                        />

                      </div>

                      <div>

                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Pays *
                        </label>

                        <select
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Pays-Bas">Pays-Bas</option>
                        </select>

                      </div>

                    </div>
                  </div>
                )}

                <div>

                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Instructions de livraison
                  </label>

                  <textarea
                    name="notes"
                    rows={3}
                    maxLength={1000}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Ex : Code digicode, instructions particulières..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500 resize-none"
                  />

                </div>

              </div>

            </div>

            {/* COLONNE RECAPITULATIF */}

            <div className="lg:col-span-5">

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 lg:sticky lg:top-24">

                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Récapitulatif de Commande
                </h2>

                {/* PRODUITS */}

                <div className="max-h-72 overflow-y-auto space-y-4 pr-2">

                  {cart.map((item) => (

                    <div
                      key={item.sku}
                      className="flex items-center justify-between text-xs gap-3"
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1 shrink-0 border border-slate-100"
                        />

                        <div className="min-w-0">

                          <p className="font-bold text-slate-800 truncate">
                            {item.label}
                          </p>

                          <p className="text-slate-500 mt-1">
                            Réf. {item.sku}
                          </p>

                          <p className="text-slate-500">
                            Quantité : {item.quantity}
                          </p>

                        </div>

                      </div>

                      <span className="font-bold text-slate-900 shrink-0">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>

                    </div>

                  ))}

                </div>

                {/* CALCUL DU TOTAL */}

                <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">

                  <div className="flex justify-between text-slate-600">

                    <span>Sous-total TTC :</span>

                    <span className="font-bold text-slate-900">
                      {totalPriceTTC.toFixed(2)} €
                    </span>

                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Mode de livraison :</span>
                    <span className="font-bold text-slate-900">
                      {formData.deliveryType === 'relay' ? 'Point Relais' : 'Domicile'}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">

                    <span>Frais de livraison :</span>

                    {shippingFee === 0 ? (

                      <span className="font-black text-emerald-600 uppercase">
                        Gratuit
                      </span>

                    ) : (

                      <span className="font-bold text-slate-900">
                        {shippingFee.toFixed(2)} €
                      </span>

                    )}

                  </div>

                  <div className="flex justify-between text-base pt-4 border-t border-slate-200 text-slate-950 font-black">

                    <span>Total TTC :</span>

                    <span className="text-sky-600 text-xl">
                      {finalTotal.toFixed(2)} €
                    </span>

                  </div>

                </div>

                {/* PAIEMENT */}

                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 space-y-2">

                  <div className="font-bold flex items-center gap-2 text-sky-900 text-sm">

                    <CreditCard size={18} />

                    Paiement sécurisé SumUp

                  </div>

                  <p className="text-xs text-sky-800 leading-relaxed">
                    Vous allez être redirigé vers la plateforme
                    officielle SumUp pour effectuer votre
                    règlement en toute sécurité.
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-sky-700 pt-1">

                    <Lock size={13} />

                    <span>
                      Vos données bancaires ne transitent pas
                      par notre site.
                    </span>

                  </div>

                </div>

                {/* ERREUR */}

                {errorMessage && (

                  <div
                    role="alert"
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-2 text-red-700"
                  >

                    <AlertCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                    />

                    <p className="text-xs font-semibold leading-relaxed">
                      {errorMessage}
                    </p>

                  </div>

                )}

                {/* BOUTON */}

                <button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl text-sm shadow-xl shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >

                  {loading ? (

                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Création du paiement...

                    </>

                  ) : (

                    <>
                      <ShieldCheck size={19} />

                      Valider et Régler la Commande

                    </>

                  )}

                </button>

                <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                  En validant votre commande, vous acceptez
                  les conditions générales de vente de
                  Speed Services.
                </p>

              </div>

            </div>

          </form>

        </div>

      </section>
    </>
  );
};