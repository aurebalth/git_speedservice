import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { CategoryPage } from './pages/product/CategoryPage';
import { ProductDetailPage } from './pages/product/ProductDetailPage';
import { LegalPage } from './pages/legal/LegalPage';

// Context Panier & Vues E-Commerce
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './pages/checkout/CheckoutPage';

// Composant pour forcer le scroll en haut à chaque changement de page
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <CartDrawer />
        <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow bg-white text-slate-900">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Pages Légales avec URLs propres */}
              <Route path="/mentions-legales" element={<LegalPage activeTab="mentions" />} />
              <Route path="/politique-de-confidentialite" element={<LegalPage activeTab="confidentialite" />} />
              <Route path="/conditions-generales-de-vente" element={<LegalPage activeTab="cgv" />} />
              <Route path="/politique-de-remboursement" element={<LegalPage activeTab="remboursement" />} />

              {/* Tunnel de Commande E-Commerce */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Routes Produits & Catégories (Gère à la fois le Hub et le détail de sous-catégorie) */}
              <Route path="/produit/detail/:productSlug" element={<ProductDetailPage />} />
              <Route path="/produit/couches/bebe" element={<CategoryPage />} />
              <Route path="/produit/couches/bebe/:categoryId" element={<CategoryPage />} />
              <Route path="/produit/hygiene-feminine" element={<CategoryPage />} />
              <Route path="/produit/hygiene-feminine/:categoryId" element={<CategoryPage />} />
              <Route path="/produit/incontinence-adultes" element={<CategoryPage />} />
              <Route path="/produit/incontinence-adultes/:categoryId" element={<CategoryPage />} />
              <Route path="/produit/petcare" element={<CategoryPage />} />
              <Route path="/produit/petcare/:categoryId" element={<CategoryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;