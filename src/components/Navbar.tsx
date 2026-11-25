import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BABY_CATALOG } from '../data/babyCatalog';
import { ADULT_CATALOG } from '../data/adultCatalog';
import { FEMALE_CATALOG } from '../data/femaleCatalog';
import { PET_CATALOG } from '../data/petCatalog';
import { getBrandSlug, getCatalogBrands, getVariantBrand } from '../data/catalogUtils';
import { SITE_CONFIG } from '../data/siteConfig';

type NavProduct = {
  id: string;
  name: string;
  subCategory: string;
  brand?: string;
  variants: { brand?: string }[];
};

type NavUniverse = {
  id: string;
  title: string;
  path: string;
  catalog: NavProduct[];
};

type SubcategoryGroup = {
  name: string;
  products: NavProduct[];
};

const NAV_UNIVERSES: NavUniverse[] = [
  { id: 'baby', title: 'Bébé & Enfant', path: '/produit/couches/bebe', catalog: BABY_CATALOG as NavProduct[] },
  { id: 'adult', title: 'Incontinence & protections adultes', path: '/produit/incontinence-adultes', catalog: ADULT_CATALOG as NavProduct[] },
  { id: 'female', title: 'Hygiène féminine', path: '/produit/hygiene-feminine', catalog: FEMALE_CATALOG as NavProduct[] },
  { id: 'pet', title: 'Animaux & entretien', path: '/produit/petcare', catalog: PET_CATALOG as NavProduct[] },
];

function getProductsForBrand(universe: NavUniverse, brand: string): NavProduct[] {
  return universe.catalog.filter((product) =>
    product.variants.some((variant) => getVariantBrand(product, variant) === brand),
  );
}

function getSubcategoryGroups(universe: NavUniverse, brand: string): SubcategoryGroup[] {
  const products = getProductsForBrand(universe, brand);
  const groups = new Map<string, NavProduct[]>();

  products.forEach((product) => {
    const name = product.subCategory?.trim() || 'Autres produits';
    const current = groups.get(name) || [];
    current.push(product);
    groups.set(name, current);
  });

  return [...groups.entries()].map(([name, groupedProducts]) => ({ name, products: groupedProducts }));
}

function brandProductsUrl(universe: NavUniverse, brand: string, productId: string) {
  return `${universe.path}/${productId}?marque=${getBrandSlug(brand)}`;
}

function getBrandPageUrl(universe: NavUniverse, brand: string) {
  return `${universe.path}/marque/${getBrandSlug(brand)}`;
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [selectedMobileBrands, setSelectedMobileBrands] = useState<Record<string, string>>({});
  const [openDesktopUniverse, setOpenDesktopUniverse] = useState<string | null>(null);
  const [selectedDesktopBrands, setSelectedDesktopBrands] = useState<Record<string, string>>({});

  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path || currentPath.startsWith(`${path}/`);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenMobileSection(null);
    setSelectedMobileBrands({});
  };

  const chooseDesktopBrand = (universeId: string, brand: string) => {
    setSelectedDesktopBrands((current) => ({ ...current, [universeId]: brand }));
  };

  const chooseMobileBrand = (universeId: string, brand: string) => {
    setSelectedMobileBrands((current) => ({ ...current, [universeId]: brand }));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="bg-[#061A33] text-white">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Speed Services, accueil">
            <span className="rounded-md bg-sky-500 px-2.5 py-1.5 text-lg font-black tracking-tight text-white">SPEED</span>
            <span className="flex flex-col">
              <span className="text-base font-black leading-none tracking-wide">SERVICES</span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-300">Boutique multi-marques</span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white">
              <Phone size={15} /> {SITE_CONFIG.phoneDisplay}
            </a>
            <a href="https://wa.me/33773594630" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-400">
              <MessageCircle size={15} /> WhatsApp
            </a>
            <button onClick={() => setIsCartOpen(true)} className="relative inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/15" aria-label={`Ouvrir le panier, ${totalItems} articles`}>
              <ShoppingBag size={16} className="text-sky-300" /> Panier
              {totalItems > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-400 px-1 text-[10px] font-black text-slate-950">{totalItems}</span>}
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setIsCartOpen(true)} className="relative rounded-lg bg-white/10 p-2 text-white" aria-label="Ouvrir le panier">
              <ShoppingBag size={21} />
              {totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-400 px-1 text-[9px] font-black text-slate-950">{totalItems}</span>}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="rounded-lg p-2 text-white hover:bg-white/10" aria-label="Ouvrir le menu">
              <Menu size={25} />
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block" aria-label="Navigation principale">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          <Link to="/" className={`rounded-lg px-3 py-2 text-xs font-bold transition ${currentPath === '/' ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50 hover:text-sky-700'}`}>
            Accueil
          </Link>

          {NAV_UNIVERSES.map((universe) => {
            const brands = getCatalogBrands(universe.catalog);
            const active = isActive(universe.path);
            const menuOpen = openDesktopUniverse === universe.id;
            const selectedBrand = selectedDesktopBrands[universe.id] || '';
            const groups = selectedBrand ? getSubcategoryGroups(universe, selectedBrand) : [];
            const selectedProductCount = groups.reduce((total, group) => total + group.products.length, 0);

            return (
              <div
                key={universe.id}
                className="relative h-full"
                onMouseLeave={() => setOpenDesktopUniverse((current) => current === universe.id ? null : current)}
              >
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls={`desktop-menu-${universe.id}`}
                  onClick={() => setOpenDesktopUniverse((current) => current === universe.id ? null : universe.id)}
                  className={`inline-flex h-full items-center gap-1.5 border-b-2 px-3 text-xs font-bold transition ${active || menuOpen ? 'border-sky-500 text-sky-700' : 'border-transparent text-slate-700 hover:border-sky-300 hover:text-sky-700'}`}
                >
                  {universe.title}
                  {menuOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {menuOpen && (
                  <div id={`desktop-menu-${universe.id}`} className="absolute left-0 top-full z-50 w-[min(790px,90vw)] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
                    <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">Explorer le rayon</p>
                        <p className="mt-1 text-lg font-black text-slate-900">{universe.title}</p>
                      </div>
                      <Link to={universe.path} onClick={() => setOpenDesktopUniverse(null)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-sky-600">
                        Tout le rayon <ArrowUpRight size={13} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-[230px_minmax(0,1fr)] gap-5">
                      <div className="min-w-0">
                        <h3 className="mb-3 text-[10px] font-black uppercase tracking-wider text-slate-400">1. Choisissez une marque</h3>
                        <div className="max-h-[52vh] space-y-1 overflow-y-auto pr-1">
                          {brands.map((brand) => {
                            const selected = selectedBrand === brand;
                            const count = getProductsForBrand(universe, brand).length;
                            return (
                              <button
                                key={brand}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => chooseDesktopBrand(universe.id, brand)}
                                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${selected ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'}`}
                              >
                                <span>{brand}</span>
                                <span className={`flex items-center gap-1 text-[10px] ${selected ? 'text-sky-100' : 'text-slate-400'}`}>
                                  {count} gammes <ChevronRight size={14} />
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="min-h-[235px] min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                        {!selectedBrand ? (
                          <div className="flex h-full min-h-[205px] flex-col items-center justify-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sky-600 shadow-sm"><ArrowRight size={21} /></div>
                            <h3 className="text-sm font-black text-slate-800">2. Puis choisissez une sous-catégorie</h3>
                            <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">Sélectionnez une marque dans la colonne de gauche pour afficher uniquement ses gammes et sous-catégories.</p>
                          </div>
                        ) : (
                          <>
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-wider text-sky-700">2. Sous-catégories</p>
                                <h3 className="mt-1 text-base font-black text-slate-900">{selectedBrand}</h3>
                                <p className="mt-0.5 text-[10px] text-slate-500">{selectedProductCount} gamme{selectedProductCount > 1 ? 's' : ''} disponible{selectedProductCount > 1 ? 's' : ''}</p>
                              </div>
                              <Link to={getBrandPageUrl(universe, selectedBrand)} onClick={() => setOpenDesktopUniverse(null)} className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-bold text-white hover:bg-sky-600">
                                Voir toute la marque <ArrowUpRight size={12} />
                              </Link>
                            </div>
                            <div className="max-h-[43vh] space-y-4 overflow-y-auto pr-1">
                              {groups.map((group) => (
                                <div key={group.name}>
                                  <h4 className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-500">{group.name}</h4>
                                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                    {group.products.map((product) => (
                                      <Link
                                        key={product.id}
                                        to={brandProductsUrl(universe, selectedBrand, product.id)}
                                        onClick={() => setOpenDesktopUniverse(null)}
                                        className="rounded-lg border border-transparent bg-white px-3 py-2.5 text-xs font-semibold leading-snug text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                                      >
                                        {product.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link to="/about" className={`ml-auto rounded-lg px-3 py-2 text-xs font-bold transition ${currentPath === '/about' ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50 hover:text-sky-700'}`}>
            À propos
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white lg:hidden">
          <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
            <div>
              <p className="text-lg font-black text-slate-900">SPEED SERVICES</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">Navigation catalogue</p>
            </div>
            <button onClick={closeMobileMenu} className="rounded-xl bg-slate-100 p-2 text-slate-700" aria-label="Fermer le menu"><X size={23} /></button>
          </div>

          <div className="mx-auto w-full max-w-xl flex-1 px-5 py-4">
            <Link to="/" onClick={closeMobileMenu} className="block border-b border-slate-100 py-4 text-base font-bold text-slate-900">Accueil</Link>

            {NAV_UNIVERSES.map((universe) => {
              const brands = getCatalogBrands(universe.catalog);
              const isOpen = openMobileSection === universe.id;
              const selectedBrand = selectedMobileBrands[universe.id] || '';
              const groups = selectedBrand ? getSubcategoryGroups(universe, selectedBrand) : [];

              return (
                <section key={universe.id} className="border-b border-slate-100 py-1">
                  <button
                    onClick={() => {
                      setOpenMobileSection(isOpen ? null : universe.id);
                      if (isOpen) {
                        setSelectedMobileBrands((current) => ({ ...current, [universe.id]: '' }));
                      }
                    }}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-bold text-slate-900"
                  >
                    <span>{universe.title}</span>
                    {isOpen ? <ChevronUp size={18} className="text-sky-600" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="space-y-4 pb-5">
                      <Link to={universe.path} onClick={closeMobileMenu} className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
                        Voir tout le rayon <ArrowUpRight size={15} />
                      </Link>

                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">1. Choisissez une marque</p>
                        <div className="grid grid-cols-2 gap-2">
                          {brands.map((brand) => {
                            const selected = selectedBrand === brand;
                            return (
                              <button
                                key={brand}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => chooseMobileBrand(universe.id, brand)}
                                className={`flex min-h-11 items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${selected ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50'}`}
                              >
                                <span>{brand}</span>
                                <ChevronRight size={15} className={selected ? 'text-white' : 'text-slate-400'} />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {selectedBrand && (
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-sky-700">2. Sous-catégories</p>
                              <h3 className="mt-1 text-base font-black text-slate-900">{selectedBrand}</h3>
                            </div>
                            <Link to={getBrandPageUrl(universe, selectedBrand)} onClick={closeMobileMenu} className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold text-white">
                              Toute la marque <ArrowUpRight size={11} />
                            </Link>
                          </div>

                          <div className="space-y-4">
                            {groups.map((group) => (
                              <div key={group.name}>
                                <h4 className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-500">{group.name}</h4>
                                <div className="space-y-1">
                                  {group.products.map((product) => (
                                    <Link
                                      key={product.id}
                                      to={brandProductsUrl(universe, selectedBrand, product.id)}
                                      onClick={closeMobileMenu}
                                      className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition hover:text-sky-700"
                                    >
                                      <span>{product.name}</span>
                                      <ChevronRight size={15} className="shrink-0 text-slate-400" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              );
            })}

            <Link to="/about" onClick={closeMobileMenu} className="block border-b border-slate-100 py-4 text-base font-bold text-slate-900">À propos</Link>
            <div className="space-y-3 py-6">
              <a href="https://wa.me/33773594630" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-white"><MessageCircle size={18} /> Écrire sur WhatsApp</a>
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white"><Phone size={18} /> {SITE_CONFIG.phoneDisplay}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
