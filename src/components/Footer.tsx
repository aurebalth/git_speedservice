import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

const UNIVERSES = [
  { label: 'Bébé & Enfant', to: '/produit/couches/bebe' },
  { label: 'Hygiène féminine', to: '/produit/hygiene-feminine' },
  { label: 'Incontinence & protections adultes', to: '/produit/incontinence-adultes' },
  { label: 'Animaux & entretien', to: '/produit/petcare' },
];

export const Footer: React.FC = () => (
  <footer className="bg-slate-950 text-slate-300">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <Link to="/" className="inline-flex items-center gap-2 text-white" aria-label="Speed Services, accueil">
          <span className="rounded-md bg-sky-500 px-2.5 py-1.5 text-lg font-black">SPEED</span>
          <span className="text-lg font-black tracking-wide">SERVICES</span>
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
          Une boutique multi-marques pour retrouver vos essentiels : produits pour bébé, hygiène féminine, protections adultes et soins pour animaux.
        </p>
        <p className="mt-3 text-xs font-semibold text-emerald-300">Prix affichés TTC.</p>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Nos univers</h2>
        <ul className="space-y-2 text-sm">
          {UNIVERSES.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="inline-flex items-center gap-1.5 text-slate-400 transition hover:text-white">
                {item.label}<ArrowUpRight size={13} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2"><Phone size={16} className="text-sky-400" /><a href={`tel:${SITE_CONFIG.phoneRaw}`} className="hover:text-white">{SITE_CONFIG.phoneDisplay}</a></li>
          <li className="flex items-center gap-2"><Mail size={16} className="text-sky-400" /><a href={`mailto:${SITE_CONFIG.email}`} className="break-all hover:text-white">{SITE_CONFIG.email}</a></li>
          <li><a href="https://wa.me/33773594630" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-500">Nous contacter sur WhatsApp</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.</p>
        <nav aria-label="Informations légales" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          <Link to="/politique-de-confidentialite" className="hover:text-white">Confidentialité</Link>
          <Link to="/conditions-generales-de-vente" className="hover:text-white">Conditions générales de vente</Link>
          <Link to="/politique-de-remboursement" className="hover:text-white">Retours & remboursements</Link>
        </nav>
      </div>
    </div>
  </footer>
);
