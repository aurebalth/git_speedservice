import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  Baby,
  Clock3,
  PackageCheck,
  ShieldCheck,
  Tag,
  X,
} from 'lucide-react';

type PricePromisePopupProps = {
  /** Empêche la popup de recouvrir le sélecteur de marques et de gammes. */
  isBlocked?: boolean;
};

const STORAGE_KEY = 'speedservices-destockage-popup-dismissed-v1';
const DISPLAY_DELAY_MS = 6500;
const DISPLAY_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export const PricePromisePopup: React.FC<PricePromisePopupProps> = ({ isBlocked = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // La fermeture reste fonctionnelle si le stockage du navigateur est désactivé.
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isBlocked || isOpen) return;

    try {
      const dismissedAt = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
      if (dismissedAt > 0 && Date.now() - dismissedAt < DISPLAY_COOLDOWN_MS) return;
    } catch {
      // En cas de restriction du stockage, la popup peut tout de même s'afficher.
    }

    const timeoutId = window.setTimeout(() => setIsOpen(true), DISPLAY_DELAY_MS);
    return () => window.clearTimeout(timeoutId);
  }, [isBlocked, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, dismiss]);

  const goToCatalog = () => {
    dismiss();
    window.setTimeout(() => {
      document.getElementById('categories-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 120);
  };

  if (!isOpen || isBlocked) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#06182D]/80 p-3 backdrop-blur-md sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="destockage-popup-title"
        aria-describedby="destockage-popup-description"
        className="relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] bg-white text-slate-900 shadow-[0_28px_100px_rgba(0,22,52,0.48)] ring-1 ring-white/20 sm:max-h-[calc(100dvh-2.5rem)]"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer la fenêtre de déstockage"
          className="absolute right-3 top-3 z-30 rounded-full border border-white/25 bg-[#001F42]/65 p-2.5 text-white shadow-lg backdrop-blur transition hover:bg-white hover:text-[#003366] focus:outline-none focus:ring-2 focus:ring-[#60A5FA] sm:right-4 sm:top-4"
        >
          <X size={19} />
        </button>

        <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#00264D] via-[#003366] to-[#075CA8] px-5 pb-7 pt-7 text-white sm:px-8 sm:pb-8 sm:pt-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full border-[30px] border-white/[0.06]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-[28%] -z-10 h-72 w-72 rounded-full bg-[#35B8FF]/15 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute right-[22%] top-8 -z-10 h-28 w-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />

          <div className="grid items-center gap-6 sm:grid-cols-[1.08fr_0.92fr] sm:gap-5">
            <div className="relative z-10 pr-7 sm:pr-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B5E4FF]/40 bg-[#60A5FA]/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.17em] text-white shadow-sm sm:text-[11px]">
                <Tag size={14} strokeWidth={2.7} />
                Offre spéciale Speed Services
              </div>

              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#9DD8FF] sm:text-xs">
                SÉLECTION MULTI-MARQUES · PRIX TTC
              </p>
              <h2
                id="destockage-popup-title"
                className="mt-2 max-w-xl text-[2.65rem] font-black uppercase leading-[0.94] tracking-[-0.055em] text-white sm:text-[3.6rem]"
              >
                Opération<br />
                <span className="text-[#72CCFF]">déstockage</span>
              </h2>
              <p
                id="destockage-popup-description"
                className="mt-4 max-w-lg text-sm font-medium leading-6 text-blue-50 sm:text-base sm:leading-7"
              >
                Profitez d'une sélection de couches bébé, de protections adultes et de produits
                d'hygiène proposés en déstockage. Découvrez les références disponibles dans notre
                catalogue.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-bold text-white/95 sm:text-xs">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">Plusieurs marques</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">Dans la limite des stocks</span>
              </div>

              <button
                type="button"
                onClick={goToCatalog}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black uppercase tracking-wide text-[#003366] shadow-[0_12px_30px_rgba(0,15,40,0.3)] transition hover:-translate-y-0.5 hover:bg-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#8CD6FF] focus:ring-offset-2 focus:ring-offset-[#003366] sm:w-auto sm:min-w-[270px]"
              >
                Découvrir le déstockage
                <ArrowRight size={18} strokeWidth={2.7} />
              </button>
            </div>

            <div className="relative mx-auto h-[190px] w-full max-w-[340px] sm:h-[285px] sm:max-w-none">
              <div aria-hidden="true" className="absolute inset-x-4 bottom-2 top-3 rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/20 to-white/[0.05] shadow-inner backdrop-blur-sm" />
              <div aria-hidden="true" className="absolute bottom-4 left-1/2 h-8 w-[78%] -translate-x-1/2 rounded-full bg-[#001A35]/60 blur-xl" />

              <div className="absolute left-[5%] top-[19%] z-10 flex h-[68%] w-[35%] -rotate-[8deg] items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white p-2 shadow-[0_16px_35px_rgba(0,20,50,0.35)] sm:left-[4%] sm:top-[18%] sm:h-[68%] sm:w-[34%] sm:p-3">
                <img src="/image/82500.png" alt="Paquet de couches Babylino Sensitive" className="h-full w-full object-contain" loading="eager" />
              </div>
              <div className="absolute left-[34%] top-[7%] z-20 flex h-[76%] w-[37%] rotate-[2deg] items-center justify-center overflow-hidden rounded-2xl border border-white bg-white p-2 shadow-[0_20px_42px_rgba(0,20,50,0.38)] sm:left-[34%] sm:top-[6%] sm:h-[78%] sm:w-[36%] sm:p-3">
                <img src="/image/pingo1.png" alt="Paquet de couches Pingo" className="h-full w-full object-contain" loading="eager" />
              </div>
              <div className="absolute right-[3%] top-[25%] z-10 flex h-[62%] w-[31%] rotate-[8deg] items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white p-2 shadow-[0_16px_35px_rgba(0,20,50,0.35)] sm:right-[3%] sm:top-[23%] sm:h-[64%] sm:w-[30%] sm:p-3">
                <img src="/image/86522.png" alt="Protection IASI pour adultes" className="h-full w-full object-contain" loading="eager" />
              </div>

              <div className="absolute bottom-0 right-1 z-30 inline-flex items-center gap-1.5 rounded-full border border-[#B7E6FF]/60 bg-[#E9F7FF] px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#00447D] shadow-lg sm:bottom-1 sm:right-1 sm:px-3.5 sm:text-[11px]">
                <PackageCheck size={14} />
                Sélection déstockage
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-5 py-5 sm:px-8 sm:py-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-[#DCEBFA] bg-[#F7FBFF] px-3.5 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F2FF] text-[#075CA8]"><Baby size={20} /></span>
              <div>
                <p className="text-xs font-extrabold text-[#12385F]">Bébé & enfant</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Couches et essentiels</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#DCEBFA] bg-[#F7FBFF] px-3.5 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F2FF] text-[#075CA8]"><ShieldCheck size={20} /></span>
              <div>
                <p className="text-xs font-extrabold text-[#12385F]">Protections adultes</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Plusieurs formats</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#DCEBFA] bg-[#F7FBFF] px-3.5 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F2FF] text-[#075CA8]"><Clock3 size={20} /></span>
              <div>
                <p className="text-xs font-extrabold text-[#12385F]">Disponibilités limitées</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Selon les stocks disponibles</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
            <p className="text-center text-[11px] leading-5 text-slate-400 sm:text-left">
              Références et prix concernés à retrouver dans le catalogue · Prix TTC
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-[#003366] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
            >
              Continuer ma visite
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
