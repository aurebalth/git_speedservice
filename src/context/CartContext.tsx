import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  sku: string;
  label: string;
  price: number; // Prix TTC
  image: string;
  quantity: number;
  subCategory?: string;
  variantSlug: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPriceTTC: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountForFreeShipping: number;
  cartId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 50; // Livraison gratuite à partir de 50€ TTC

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('speed_services_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartId, setCartId] = useState(() => {
    const existing = localStorage.getItem('speed_services_cart_id');
    if (existing) return existing;
    const created = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem('speed_services_cart_id', created);
    return created;
  });

  useEffect(() => {
    localStorage.setItem('speed_services_cart', JSON.stringify(cart));
    if (cart.length === 0) return;
    const controller = new AbortController();
    const trackingTimer = window.setTimeout(() => {
      fetch('/.netlify/functions/cart-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          items: cart.map(({ sku, variantSlug, quantity }) => ({ sku, variantSlug, quantity })),
        }),
        signal: controller.signal,
        keepalive: true,
      }).then(async (response) => {
        if (!response.ok) return;
        const result = await response.json().catch(() => ({}));
        if (result.cartId && result.cartId !== cartId) {
          localStorage.setItem('speed_services_cart_id', result.cartId);
          setCartId(result.cartId);
        }
      }).catch(() => { /* Le suivi panier ne doit jamais bloquer le panier client. */ });
    }, 400);
    return () => { window.clearTimeout(trackingTimer); controller.abort(); };
  }, [cart, cartId]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.sku === item.sku);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (sku: string) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    const nextId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem('speed_services_cart_id', nextId);
    setCartId(nextId);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceTTC = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Nouvelle grille de frais de port selon tes nouveaux paliers :
  // >= 50€ : Offert
  // 1-2 articles : 1.90€
  // 3-5 articles : 3.90€
  // 6-8 articles : 5.90€
  // > 8 articles : 7.90€
  let shippingFee = 0;
  if (totalItems > 0) {
    if (totalPriceTTC >= FREE_SHIPPING_THRESHOLD) {
      shippingFee = 0;
    } else if (totalItems <= 2) {
      shippingFee = 1.90;
    } else if (totalItems >= 3 && totalItems <= 5) {
      shippingFee = 3.90;
    } else if (totalItems >= 6 && totalItems <= 8) {
      shippingFee = 5.90;
    } else {
      shippingFee = 7.90;
    }
  }

  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPriceTTC);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPriceTTC,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountForFreeShipping,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};