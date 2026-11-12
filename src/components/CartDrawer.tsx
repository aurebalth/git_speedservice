import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    totalPriceTTC, 
    totalItems, 
    clearCart,
    shippingFee,
    freeShippingThreshold,
    amountForFreeShipping
  } = useCart();
  
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const finalTotal = totalPriceTTC + shippingFee;
  const progressPercent = Math.min(100, (totalPriceTTC / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-sky-400" size={20} />
              <h2 className="font-black text-base tracking-wide">Panier B2B ({totalItems})</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Jauge d'offre livraison offerte (Seuil 50€) */}
          {cart.length > 0 && (
            <div className="bg-sky-50 p-4 border-b border-sky-100">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-900 mb-2">
                <Truck size={16} className="text-sky-600 shrink-0" />
                {amountForFreeShipping > 0 ? (
                  <span>Plus que <strong className="text-sky-600 font-black">{amountForFreeShipping.toFixed(2)} €</strong> pour la livraison GRATUITE !</span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-700 font-black">
                    <Sparkles size={14} /> Félicitations ! Vous bénéficiez de la livraison GRATUITE.
                  </span>
                )}
              </div>
              <div className="w-full bg-sky-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-sky-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Liste des articles */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-bold text-sm text-slate-700">Votre panier est vide</p>
                <p className="text-xs text-slate-500 mt-1">Ajoutez des références professionnelles depuis notre catalogue.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.sku} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 items-center">
                  <img src={item.image} alt={item.label} className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">SKU : {item.sku}</span>
                    <h4 className="font-bold text-slate-900 text-xs truncate mt-1">{item.label}</h4>
                    <span className="text-xs font-black text-sky-600 block mt-0.5">{item.price.toFixed(2)} € TTC / u.</span>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button 
                          onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded-l-lg transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.sku)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totaux TTC */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Sous-total :</span>
                  <span className="font-bold text-slate-900">{totalPriceTTC.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison :</span>
                  {shippingFee === 0 ? (
                    <span className="font-black text-emerald-600 uppercase text-[11px]">Gratuit</span>
                  ) : (
                    <span className="font-bold text-slate-900">{shippingFee.toFixed(2)} €</span>
                  )}
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200 text-slate-950 font-black">
                  <span>Total TTC :</span>
                  <span className="text-sky-600 text-base">{finalTotal.toFixed(2)} €</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={clearCart}
                  className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Vider le panier
                </button>
                <button
                  onClick={handleCheckout}
                  className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/20 transition-all"
                >
                  Commander <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};