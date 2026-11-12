import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
        <div>
          <span className="text-white font-bold text-xl">{SITE_CONFIG.name}</span>
          <p className="text-sm mt-2 text-slate-400">
            Votre spécialiste en distribution de couches bébés, adultes, animaux et produits d'hygiène.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Nous Contacter</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-sky-400" />
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="hover:text-white">{SITE_CONFIG.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-sky-400" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white">{SITE_CONFIG.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Nos Univers</h4>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>Couches Bébés & Enfants</li>
            <li>Incontinence Adultes</li>
            <li>Couches pour Animaux</li>
            <li>Lingettes & Soins</li>
          </ul>
        </div>
      </div>
      
      {/* Bas de page avec les liens légaux et la politique de remboursement */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2024 {SITE_CONFIG.name}. Tous droits réservés.</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link to="/mentions-legales" className="hover:text-white transition-colors">Legal Notice</Link>
          <Link to="/politique-de-confidentialite" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/conditions-generales-de-vente" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <Link to="/politique-de-remboursement" className="hover:text-white transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
};