import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, MessageCircle, Menu, X, ChevronUp, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBabyOpen, setIsBabyOpen] = useState(false);
  const [isFemaleOpen, setIsFemaleOpen] = useState(false);
  const [isAdultOpen, setIsAdultOpen] = useState(false);
  const [isPetOpen, setIsPetOpen] = useState(false);

  // États pour les menus accordéon mobiles
  const [mobileBabyOpen, setMobileBabyOpen] = useState(false);
  const [mobileFemaleOpen, setMobileFemaleOpen] = useState(false);
  const [mobileAdultOpen, setMobileAdultOpen] = useState(false);
  const [mobilePetOpen, setMobilePetOpen] = useState(false);

  // Détection des pages/catégories actives
  const isHomeActive = location.pathname === '/';
  const isAboutActive = location.pathname === '/about';
  const isBabyActive = location.pathname.includes('couches') || location.pathname.includes('bebe');
  const isAdultActive = location.pathname.includes('incontinence-adultes');
  const isFemaleActive = location.pathname.includes('hygiene-feminine');
  const isPetActive = location.pathname.includes('petcare');

  const babySubcategories = [
    { name: "Couches Classiques (Paquet Normal)", url: "/produit/couches/bebe/babylino-sensitive-normal-pack" },
    { name: "Couches Format Éco (Value Pack)", url: "/produit/couches/bebe/babylino-sensitive-value-pack" },
    { name: "Couches-Culottes (Cotton Soft Pants)", url: "/produit/couches/bebe/babylino-cotton-soft-mutandina" },
    { name: "Gamme Premium Ultra Soft", url: "/produit/couches/bebe/babylino-premium" },
    { name: "Couches de Bain (Mer & Piscine)", url: "/produit/couches/bebe/babylino-swim-pants" },
    { name: "Culottes de Nuit (Énurésie Safe Nights)", url: "/produit/couches/bebe/babylino-safe-nights" },
    { name: "Lingettes & Alèses de Change", url: "/produit/couches/bebe/salviettine-traverse" }
  ];

  const femaleSubcategories = [
    { name: "Serviettes Ultra Sensitive Cotton", url: "/produit/hygiene-feminine/everyday-sensitive-cotton" },
    { name: "Serviettes Ultra HyperDry", url: "/produit/hygiene-feminine/everyday-hyperdry" },
    { name: "Protège-slips & Natura Bio", url: "/produit/hygiene-feminine/salvaslip" },
    { name: "Lingettes Démaquillantes PomPon", url: "/produit/hygiene-feminine/salviettine-struccanti-pompon" }
  ];

  const adultSubcategories = [
    { name: "Protections Femme (Discreet Lady)", url: "/produit/incontinence-adultes/iasi-donna-assorbenti" },
    { name: "Culottes Absorbantes Femme (Pants)", url: "/produit/incontinence-adultes/iasi-pants-lady" },
    { name: "Culottes Absorbantes Homme (Pants)", url: "/produit/incontinence-adultes/iasi-pants-men" },
    { name: "Coquilles Homme", url: "/produit/incontinence-adultes/iasi-men-conchiglie" },
    { name: "Culottes Absorbantes Unisex Alta Protezione", url: "/produit/incontinence-adultes/iasi-pants-unisex" },
    { name: "Changes Complets Maxi", url: "/produit/incontinence-adultes/iasi-pannoloni-mutandina-maxi" },
    { name: "Alèses de Lit & Protections", url: "/produit/incontinence-adultes/iasi-traverse-adulti" },
    { name: "Lingettes de Toilette Adulte", url: "/produit/incontinence-adultes/iasi-wipes-adulti" }
  ];

  const petSubcategories = [
    { name: "Alèses & Tapis Animaux", url: "/produit/petcare/rispet-traverse" },
    { name: "Lingettes Animaux", url: "/produit/petcare/rispet-salviettine" },
    { name: "Shampooing & Gants Animaux", url: "/produit/petcare/rispet-shampoo" },
    { name: "Entretien Maison & Poils", url: "/produit/petcare/rispet-homecare" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      
      {/* SEULEMENT CETTE PARTIE EN NOIR */}
      <div className="bg-black text-white w-full">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#003366] text-white px-3 py-1.5 rounded-sm font-black text-xl tracking-wider">
              SPEED
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-none">SERVICES</span>
              <span className="text-[10px] text-[#60A5FA] font-bold tracking-widest uppercase">Distribution</span>
            </div>
          </Link>

          {/* Boutons droite Desktop (WhatsApp, Téléphone & Panier B2B) */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-1.5 text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-sm font-bold text-xs transition-colors border border-slate-700 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <span>Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/33773594630"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-white hover:scale-105 transition-transform font-bold text-xs bg-[#25D366] px-3.5 py-2 rounded-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp</span>
            </a>
            {/* <a 
              href="tel:0773594630"
              className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-2 px-4 rounded-sm text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <Phone size={14} />
              <span>07 73 59 46 30</span>
            </a> */}
          </div>

          {/* Boutons droite Mobile (Panier + Burger) */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white bg-slate-800 rounded-lg"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-6 h-6 text-sky-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              className="p-2 text-white focus:outline-none" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* LE RESTE DE LA NAVBAR RESTE SUR FOND BLANC */}
      <nav className="hidden lg:block bg-gray-50 border-t border-gray-200 text-gray-700 font-medium text-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 h-12">
          
          <Link 
            to="/" 
            className={`font-bold text-xs uppercase tracking-wider transition-colors ${
              isHomeActive ? 'text-[#2563EB] border-b-2 border-[#2563EB] pb-1' : 'hover:text-[#003366]'
            }`}
          >
            Accueil
          </Link>
          <Link 
            to="/about" 
            className={`font-bold text-xs uppercase tracking-wider transition-colors ${
              isAboutActive ? 'text-[#2563EB] border-b-2 border-[#2563EB] pb-1' : 'hover:text-[#003366]'
            }`}
          >
            À propos
          </Link>

          {/* Bébé & Enfant */}
          <div 
            className="relative h-full flex items-center shrink-0"
            onMouseEnter={() => setIsBabyOpen(true)}
            onMouseLeave={() => setIsBabyOpen(false)}
          >
            <span className={`cursor-pointer h-full flex items-center gap-1 font-bold text-xs uppercase tracking-wider transition-colors ${
              isBabyActive ? 'text-[#2563EB] border-b-2 border-[#2563EB]' : 'hover:text-[#003366]'
            }`}>
              Bébé & Enfant (Babylino) <ChevronDown size={14} />
            </span>
            {isBabyOpen && (
              <div className="absolute top-12 left-0 w-80 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-50">
                {babySubcategories.map((sub, idx) => (
                  <Link key={idx} to={sub.url} className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition-colors border-b border-gray-50 last:border-none">
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Incontinence Adultes */}
          <div 
            className="relative h-full flex items-center shrink-0"
            onMouseEnter={() => setIsAdultOpen(true)}
            onMouseLeave={() => setIsAdultOpen(false)}
          >
            <span className={`cursor-pointer h-full flex items-center gap-1 font-bold text-xs uppercase tracking-wider transition-colors ${
              isAdultActive ? 'text-[#2563EB] border-b-2 border-[#2563EB]' : 'hover:text-[#003366]'
            }`}>
              Incontinence Adultes (IASI) <ChevronDown size={14} />
            </span>
            {isAdultOpen && (
              <div className="absolute top-12 left-0 w-80 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-50">
                {adultSubcategories.map((sub, idx) => (
                  <Link key={idx} to={sub.url} className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition-colors border-b border-gray-50 last:border-none">
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hygiène Féminine */}
          <div 
            className="relative h-full flex items-center shrink-0"
            onMouseEnter={() => setIsFemaleOpen(true)}
            onMouseLeave={() => setIsFemaleOpen(false)}
          >
            <span className={`cursor-pointer h-full flex items-center gap-1 font-bold text-xs uppercase tracking-wider transition-colors ${
              isFemaleActive ? 'text-[#2563EB] border-b-2 border-[#2563EB]' : 'hover:text-[#003366]'
            }`}>
              Hygiène Féminine (EveryDay) <ChevronDown size={14} />
            </span>
            {isFemaleOpen && (
              <div className="absolute top-12 left-0 w-80 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-50">
                {femaleSubcategories.map((sub, idx) => (
                  <Link key={idx} to={sub.url} className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition-colors border-b border-gray-50 last:border-none">
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* PetCare & Entretien */}
          <div 
            className="relative h-full flex items-center shrink-0"
            onMouseEnter={() => setIsPetOpen(true)}
            onMouseLeave={() => setIsPetOpen(false)}
          >
            <span className={`cursor-pointer h-full flex items-center gap-1 font-bold text-xs uppercase tracking-wider transition-colors ${
              isPetActive ? 'text-[#2563EB] border-b-2 border-[#2563EB]' : 'hover:text-[#003366]'
            }`}>
              PetCare & Entretien (RisPET) <ChevronDown size={14} />
            </span>
            {isPetOpen && (
              <div className="absolute top-12 left-0 w-80 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-50">
                {petSubcategories.map((sub, idx) => (
                  <Link key={idx} to={sub.url} className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#003366] transition-colors border-b border-gray-50 last:border-none">
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* --- MENU MOBILE PLEIN ÉCRAN (Burger) --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-[100] flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <span className="text-xl font-bold text-[#003366]">Menu de navigation</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700 hover:text-[#003366]"
              aria-label="Fermer le menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-lg font-bold py-2 border-b border-gray-100 ${isHomeActive ? 'text-[#2563EB]' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            
            <Link 
              to="/about" 
              className={`text-lg font-bold py-2 border-b border-gray-100 ${isAboutActive ? 'text-[#2563EB]' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>

            {/* Accordéon Bébé */}
            <div className="border-b border-gray-100 pb-2">
              <div 
                className={`flex justify-between items-center py-2 cursor-pointer font-bold ${isBabyActive ? 'text-[#2563EB]' : 'text-gray-900'}`}
                onClick={() => setMobileBabyOpen(!mobileBabyOpen)}
              >
                <span>Bébé & Enfant (Babylino)</span>
                {mobileBabyOpen ? <ChevronUp className="w-5 h-5 text-[#003366]" /> : <ChevronDown className="w-5 h-5 text-[#003366]" />}
              </div>
              {mobileBabyOpen && (
                <div className="pl-4 py-2 bg-gray-50 rounded-sm space-y-2 mt-1">
                  {babySubcategories.map((sub, idx) => (
                    <Link 
                      key={idx} 
                      to={sub.url} 
                      className="block text-xs text-gray-700 py-1.5 hover:text-[#003366]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accordéon Adulte */}
            <div className="border-b border-gray-100 pb-2">
              <div 
                className={`flex justify-between items-center py-2 cursor-pointer font-bold ${isAdultActive ? 'text-[#2563EB]' : 'text-gray-900'}`}
                onClick={() => setMobileAdultOpen(!mobileAdultOpen)}
              >
                <span>Incontinence Adultes (IASI)</span>
                {mobileAdultOpen ? <ChevronUp className="w-5 h-5 text-[#003366]" /> : <ChevronDown className="w-5 h-5 text-[#003366]" />}
              </div>
              {mobileAdultOpen && (
                <div className="pl-4 py-2 bg-gray-50 rounded-sm space-y-2 mt-1">
                  {adultSubcategories.map((sub, idx) => (
                    <Link 
                      key={idx} 
                      to={sub.url} 
                      className="block text-xs text-gray-700 py-1.5 hover:text-[#003366]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accordéon Féminin */}
            <div className="border-b border-gray-100 pb-2">
              <div 
                className={`flex justify-between items-center py-2 cursor-pointer font-bold ${isFemaleActive ? 'text-[#2563EB]' : 'text-gray-900'}`}
                onClick={() => setMobileFemaleOpen(!mobileFemaleOpen)}
              >
                <span>Hygiène Féminine (EveryDay)</span>
                {mobileFemaleOpen ? <ChevronUp className="w-5 h-5 text-[#003366]" /> : <ChevronDown className="w-5 h-5 text-[#003366]" />}
              </div>
              {mobileFemaleOpen && (
                <div className="pl-4 py-2 bg-gray-50 rounded-sm space-y-2 mt-1">
                  {femaleSubcategories.map((sub, idx) => (
                    <Link 
                      key={idx} 
                      to={sub.url} 
                      className="block text-xs text-gray-700 py-1.5 hover:text-[#003366]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accordéon PetCare */}
            <div className="border-b border-gray-100 pb-2">
              <div 
                className={`flex justify-between items-center py-2 cursor-pointer font-bold ${isPetActive ? 'text-[#2563EB]' : 'text-gray-900'}`}
                onClick={() => setMobilePetOpen(!mobilePetOpen)}
              >
                <span>PetCare & Entretien (RisPET)</span>
                {mobilePetOpen ? <ChevronUp className="w-5 h-5 text-[#003366]" /> : <ChevronDown className="w-5 h-5 text-[#003366]" />}
              </div>
              {mobilePetOpen && (
                <div className="pl-4 py-2 bg-gray-50 rounded-sm space-y-2 mt-1">
                  {petSubcategories.map((sub, idx) => (
                    <Link 
                      key={idx} 
                      to={sub.url} 
                      className="block text-xs text-gray-700 py-1.5 hover:text-[#003366]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Boutons Contact Mobile */}
            <div className="pt-6 flex flex-col space-y-3">
              <a 
                href="https://wa.me/33773594630" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3.5 rounded-sm font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Écrire sur WhatsApp</span>
              </a>
              <a 
                href="tel:0773594630" 
                className="flex items-center justify-center space-x-2 bg-[#003366] text-white py-3.5 rounded-sm font-bold text-sm shadow-md"
              >
                <Phone className="w-5 h-5" />
                <span>07 73 59 46 30</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};