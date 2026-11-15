import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../data/siteConfig';
import { ShieldCheck, CreditCard, Building, MapPin, ArrowLeft, Loader2 } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, totalPriceTTC, shippingFee } = useCart();

  const [formData, setFormData] = useState({
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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      // Appel sécurisé via la fonction Serverless (Netlify Functions)
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalTotal,
          currency: 'EUR',
          description: `Commande Speed Services - ${formData.fullName}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du paiement');
      }

      if (data.id) {
        // Redirection vers la page de paiement officielle SumUp (avec Apple Pay / Google Pay natifs)
        window.location.href = `https://checkout.sumup.com/pay/${data.id}`;
      } else {
        throw new Error('ID de paiement SumUp introuvable');
      }
    } catch (err: any) {
      console.error('Erreur SumUp :', err);
      alert(`Erreur de paiement : ${err.message || 'Impossible de contacter la passerelle.'}`);
      setLoading(false);
    }
  };

  const finalTotal = totalPriceTTC + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-3">Votre panier est vide</h1>
        <p className="text-slate-500 mb-6 text-sm">Ajoutez des produits à votre panier avant d'accéder au tunnel de commande.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors">
          <ArrowLeft size={16} /> Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tunnel de Commande | {SITE_CONFIG.name}</title>
      </Helmet>

      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline mb-2">
              <ArrowLeft size={14} /> Continuer mes achats
            </Link>
            <h1 className="text-3xl font-black text-slate-900">Validation de Commande</h1>
            <p className="text-slate-500 text-sm">Renseignez vos informations et votre adresse de livraison.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Formulaire Coordonnées & Adresse */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Building size={18} className="text-sky-600" /> Informations Personnelles
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom du Contact</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      value={formData.fullName} 
                      onChange={handleChange}
                      placeholder="Nom" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail Professionnel</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="contact@entreprise.fr" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Téléphone / WhatsApp</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="06 12 34 56 78" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MapPin size={18} className="text-sky-600" /> Adresse de Livraison
                </h2>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Adresse postale</label>
                  <input 
                    type="text" 
                    name="address" 
                    required 
                    value={formData.address} 
                    onChange={handleChange}
                    placeholder="10 rue de la République" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Code Postal</label>
                    <input 
                      type="text" 
                      name="postalCode" 
                      required 
                      value={formData.postalCode} 
                      onChange={handleChange}
                      placeholder="75001" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ville</label>
                    <input 
                      type="text" 
                      name="city" 
                      required 
                      value={formData.city} 
                      onChange={handleChange}
                      placeholder="Paris" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pays</label>
                    <select 
                      name="country" 
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Instructions de livraison (Optionnel)</label>
                  <textarea 
                    name="notes" 
                    rows={2} 
                    value={formData.notes} 
                    onChange={handleChange}
                    placeholder="Ex: Accès porteur 19T, prévenir 24h avant..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

            </div>

            {/* Récapitulatif Commande */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Récapitulatif de Commande</h2>
                
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                  {cart.map((item) => (
                    <div key={item.sku} className="flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <img src={item.image} alt={item.label} className="w-10 h-10 object-contain bg-slate-50 rounded-lg p-1 shrink-0 border" />
                        <span className="truncate font-semibold text-slate-800">{item.quantity}x {item.label}</span>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Sous-total :</span>
                    <span className="font-bold text-slate-900">{totalPriceTTC.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison :</span>
                    {shippingFee === 0 ? (
                      <span className="font-black text-emerald-600 uppercase">Gratuit</span>
                    ) : (
                      <span className="font-bold text-slate-900">{shippingFee.toFixed(2)} €</span>
                    )}
                  </div>
                  <div className="flex justify-between text-base pt-3 border-t border-slate-200 text-slate-950 font-black">
                    <span>Total TTC :</span>
                    <span className="text-sky-600">{finalTotal.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Zone de paiement SumUp prête */}
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-sky-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sky-800">
                    <CreditCard size={15} /> Redirection Paiement Sécurisé SumUp
                  </div>
                  <p className="text-[11px] text-sky-700">Cartes bancaires, Apple Pay & Google Pay disponibles.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-black py-4 rounded-xl text-sm shadow-xl shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Redirection vers SumUp...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} /> Valider et Régler la Commande
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>

        </div>
      </section>
    </>
  );
};