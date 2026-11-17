import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../data/siteConfig';
import {
  AlertCircle, ArrowDownToLine, CheckCircle2, ChevronDown, Clock3,
  CreditCard, Eye, Filter, LockKeyhole, LogOut, Package, RefreshCw,
  Search, ShieldCheck, TrendingUp, Users, XCircle, Truck, ShoppingCart,
} from 'lucide-react';

type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED' | 'CANCELLED';
type OrderItem = { sku: string; productName?: string; label: string; variantLabel: string; variantSlug: string; quantity: number; unitPrice: number; lineTotal: number };
type Order = {
  reference: string; createdAt: string; updatedAt: string; status: OrderStatus; currency: string;
  customer: { fullName: string; email: string; phone: string; companyName?: string; siret?: string; address: string; city: string; postalCode: string; country: string; notes?: string };
  delivery: { label: string; method: string }; items: OrderItem[]; subtotal: number; shippingFee: number; total: number; itemCount: number;
  sumup: { checkoutId?: string | null; transactionId?: string | null; transactionCode?: string | null; paymentType?: string | null; refundedAmount?: number | null; refundAmountKnown?: boolean };
};
type Cart = { id: string; createdAt: string; updatedAt: string; status: string; items: Array<{ sku: string; label: string; quantity: number; price: number }>; itemCount: number; amount: number };
type Stats = {
  totalOrders: number; paid: number; pending: number; failed: number; expired: number; refunded: number; cancelled: number;
  revenue: number; customers: number; itemsSold: number; averageBasket: number; dailySales: number; weeklySales: number; monthlySales: number;
  cartsCreated: number; cartsValidated: number; cartsConverted: number; cartsAbandoned: number; cartsAverage: number; cartConversionRate: number;
};
type ApiResponse = { success?: boolean; orders?: Order[]; carts?: Cart[]; stats?: Stats; error?: string };

const API_URL = '/.netlify/functions/admin-checkout';
const EMPTY_STATS: Stats = {
  totalOrders: 0, paid: 0, pending: 0, failed: 0, expired: 0, refunded: 0, cancelled: 0,
  revenue: 0, customers: 0, itemsSold: 0, averageBasket: 0, dailySales: 0, weeklySales: 0, monthlySales: 0,
  cartsCreated: 0, cartsValidated: 0, cartsConverted: 0, cartsAbandoned: 0, cartsAverage: 0, cartConversionRate: 0,
};
const money = (value: unknown, currency = 'EUR') => new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(Number.isFinite(Number(value)) ? Number(value) : 0);
const dateLabel = (value?: string | null) => value && !Number.isNaN(new Date(value).getTime()) ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Date inconnue';
const normalizedStatus = (status: string) => String(status || 'PENDING').toUpperCase();
const statusPresentation = (status: string) => {
  switch (normalizedStatus(status)) {
    case 'PAID': return { label: 'Payé', className: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300', Icon: CheckCircle2 };
    case 'PENDING': return { label: 'En attente', className: 'border-amber-400/20 bg-amber-400/10 text-amber-300', Icon: Clock3 };
    case 'REFUNDED': return { label: 'Remboursé', className: 'border-violet-400/20 bg-violet-400/10 text-violet-300', Icon: ArrowDownToLine };
    case 'CANCELLED': return { label: 'Annulé', className: 'border-slate-500/30 bg-slate-500/10 text-slate-300', Icon: XCircle };
    case 'EXPIRED': return { label: 'Expiré', className: 'border-slate-500/30 bg-slate-500/10 text-slate-300', Icon: Clock3 };
    default: return { label: 'Échoué / refusé', className: 'border-rose-400/20 bg-rose-400/10 text-rose-300', Icon: AlertCircle };
  }
};
const csvCell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadOrders = useCallback(async (login = false) => {
    setLoading(true); setError(''); setNotice('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST', credentials: 'include', cache: 'no-store',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(login ? { action: 'login', username, password } : { action: 'list' }),
      });
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok) throw new Error(data.error || `Erreur serveur (${response.status}).`);
      if (!Array.isArray(data.orders)) throw new Error('La réponse du serveur ne contient pas de commandes valides.');
      setOrders(data.orders);
      setStats(data.stats || EMPTY_STATS); setLastUpdated(new Date());
      if (login) { setIsAuthenticated(true); setPassword(''); }
      else setNotice('Les commandes Speed Services ont été actualisées.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur inattendue est survenue.';
      setError(message); if (login || message.toLowerCase().includes('session')) setIsAuthenticated(false);
    } finally { setLoading(false); }
  }, [username, password]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); await loadOrders(true); };
  const logout = async () => {
    try { await fetch(API_URL, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) }); } catch { /* expiration côté serveur */ }
    setIsAuthenticated(false); setUsername(''); setPassword(''); setOrders([]); setStats(EMPTY_STATS);
    setSelectedOrder(null); setSearchTerm(''); setStatusFilter('ALL'); setError(''); setNotice('');
  };
  useEffect(() => { if (isAuthenticated) { const id = window.setInterval(() => { void loadOrders(false); }, 60000); return () => window.clearInterval(id); } return undefined; }, [isAuthenticated, loadOrders]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase('fr');
    return orders.filter((order) => {
      const searchable = [order.reference, order.customer?.fullName, order.customer?.email, order.customer?.phone, order.sumup?.transactionCode].filter(Boolean).join(' ').toLocaleLowerCase('fr');
      const created = new Date(order.createdAt).getTime();
      const afterFrom = !dateFrom || created >= new Date(`${dateFrom}T00:00:00`).getTime();
      const beforeTo = !dateTo || created <= new Date(`${dateTo}T23:59:59.999`).getTime();
      return (!term || searchable.includes(term)) && (statusFilter === 'ALL' || normalizedStatus(order.status) === statusFilter) && afterFrom && beforeTo;
    }).sort((a, b) => sortOrder === 'oldest' ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : sortOrder === 'amount-desc' ? b.total - a.total : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, searchTerm, statusFilter, dateFrom, dateTo, sortOrder]);

  const exportCsv = () => {
    const rows = [
      ['Date', 'Référence', 'Client', 'Email', 'Téléphone', 'Adresse', 'Code postal', 'Ville', 'Livraison', 'Articles', 'Quantité', 'Sous-total', 'Livraison EUR', 'Total EUR', 'Statut', 'Transaction SumUp'],
      ...filteredOrders.map((o) => [dateLabel(o.createdAt), o.reference, o.customer.fullName, o.customer.email, o.customer.phone, o.customer.address, o.customer.postalCode, o.customer.city, o.delivery?.label, o.items.map((i) => `${i.label} x${i.quantity}`).join(' | '), o.itemCount, o.subtotal, o.shippingFee, o.total, o.status, o.sumup?.transactionCode || o.sumup?.transactionId || '']),
    ];
    const csv = '\uFEFF' + rows.map((row) => row.map(csvCell).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = `speed-services-commandes-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#080d18] text-white flex items-center justify-center px-4 py-10">
      <Helmet><title>Administration sécurisée | {SITE_CONFIG.name}</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="w-full max-w-md">
        <div className="mb-7 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-950/30"><ShieldCheck size={30} /></div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Speed Services</p><h1 className="text-3xl font-black tracking-tight">Espace administration</h1><p className="mt-2 text-sm text-slate-400">Connectez-vous pour consulter les commandes de cette boutique.</p></div>
        <form onSubmit={handleLogin} className="rounded-3xl border border-white/10 bg-[#111a2b] p-6 shadow-2xl shadow-black/30 sm:p-8">
          {error && <div role="alert" className="mb-5 flex gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}
          <label className="mb-4 block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Identifiant</span><input autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50" /></label>
          <label className="mb-6 block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Mot de passe</span><input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50" /></label>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-black text-[#06101d] transition hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60"><LockKeyhole size={16} />{loading ? 'Connexion…' : 'Accéder aux commandes'}</button>
        </form>
      </div>
    </div>;
  }

  const statCards = [
    { label: 'Chiffre encaissé', value: money(stats.revenue), detail: `${stats.paid} commande(s) payée(s)`, icon: TrendingUp },
    { label: 'Commandes', value: String(stats.totalOrders), detail: `${stats.pending} en attente`, icon: Package },
    { label: 'Clients', value: String(stats.customers), detail: `${stats.itemsSold} articles vendus`, icon: Users },
    { label: 'Panier moyen', value: money(stats.averageBasket), detail: 'Sur commandes payées', icon: ShoppingCart },
  ];
  const statusCounts = [
    ['Payées', stats.paid, 'text-emerald-300'], ['En attente', stats.pending, 'text-amber-300'], ['Échouées / refusées', stats.failed, 'text-rose-300'],
    ['Expirées', stats.expired, 'text-slate-300'], ['Remboursées', stats.refunded, 'text-violet-300'], ['Annulées', stats.cancelled, 'text-slate-300'],
  ] as const;

  return <div className="min-h-screen bg-[#080d18] text-white">
    <Helmet><title>Commandes | Administration {SITE_CONFIG.name}</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <header className="border-b border-white/[0.07] bg-[#0b1220]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div><p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Speed Services</p><h1 className="mt-1 text-2xl font-black tracking-tight">Gestion des commandes</h1><p className="mt-1 text-xs text-slate-500">Données locales de cette boutique · Indépendantes de l’historique SumUp global</p></div>
        <div className="flex items-center gap-2"><span className="hidden text-[11px] text-slate-500 sm:inline">{lastUpdated ? `Actualisé à ${lastUpdated.toLocaleTimeString('fr-FR')}` : ''}</span>
          <button type="button" onClick={() => void loadOrders(false)} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-white/10 disabled:opacity-50"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Actualiser</button>
          <button type="button" onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-bold text-slate-300 transition hover:border-rose-400/30 hover:text-rose-300"><LogOut size={14} /> Déconnexion</button></div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      {error && <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}
      {notice && <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-3 text-xs text-emerald-200">{notice}</div>}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => { const Icon = card.icon; return <article key={card.label} className="rounded-2xl border border-white/[0.07] bg-[#111a2b] p-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-slate-400">{card.label}</p><span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><Icon size={17} /></span></div><p className="mt-4 text-2xl font-black tracking-tight text-white">{card.value}</p><p className="mt-1 text-[11px] text-slate-500">{card.detail}</p></article>; })}
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        {[['Aujourd’hui', stats.dailySales], ['Cette semaine', stats.weeklySales], ['Ce mois-ci', stats.monthlySales]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/[0.07] bg-[#0d1626] p-4"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ventes encaissées · {label}</p><p className="mt-2 text-xl font-black text-white">{money(value)}</p></div>)}
      </section>
      <section className="rounded-2xl border border-white/[0.07] bg-[#111a2b] p-5">
        <div className="mb-4 flex items-center gap-2"><Filter size={16} className="text-cyan-300" /><h2 className="text-sm font-black">Répartition des statuts</h2></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{statusCounts.map(([label, count, color]) => <div key={label} className="rounded-xl bg-white/[0.03] p-3"><p className={`text-xl font-black ${color}`}>{count}</p><p className="mt-1 text-[10px] text-slate-500">{label}</p></div>)}</div>
      </section>
      <section className="rounded-2xl border border-white/[0.07] bg-[#111a2b] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-black">Suivi des paniers</h2><p className="mt-1 text-[11px] text-slate-500">Paniers suivis par le site · abandons estimés après 24 h sans activité</p></div><div className="text-right"><p className="text-xl font-black text-cyan-300">{stats.cartConversionRate}%</p><p className="text-[10px] text-slate-500">Conversion</p></div></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{[['Paniers suivis', stats.cartsCreated], ['Checkouts validés', stats.cartsValidated], ['Commandes payées', stats.cartsConverted], ['Abandons estimés', stats.cartsAbandoned], ['Valeur moyenne panier', money(stats.cartsAverage)]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/[0.03] p-3"><p className="text-lg font-black text-white">{value}</p><p className="mt-1 text-[10px] text-slate-500">{label}</p></div>)}</div>
      </section>
      <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111a2b]">
        <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-base font-black">Commandes Speed Services</h2><p className="mt-1 text-[11px] text-slate-500">{filteredOrders.length} résultat(s) sur {orders.length} commande(s)</p></div><button type="button" onClick={exportCsv} disabled={!filteredOrders.length} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 disabled:opacity-40"><ArrowDownToLine size={14} /> Export CSV</button></div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            <label className="relative sm:col-span-2"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Nom, référence, e-mail, téléphone…" className="w-full rounded-xl border border-white/10 bg-[#0b1220] py-2.5 pl-9 pr-3 text-xs text-white outline-none focus:border-cyan-400/40" /></label>
            <label className="relative"><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 pr-8 text-xs text-slate-200 outline-none"><option value="ALL">Tous les statuts</option><option value="PAID">Payé</option><option value="PENDING">En attente</option><option value="FAILED">Échoué / refusé</option><option value="EXPIRED">Expiré</option><option value="REFUNDED">Remboursé</option><option value="CANCELLED">Annulé</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" /></label>
            <input aria-label="Date de début" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-xs text-slate-200 outline-none" />
            <div className="flex gap-2"><input aria-label="Date de fin" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-xs text-slate-200 outline-none" /><select aria-label="Tri" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0b1220] px-2 py-2.5 text-xs text-slate-200 outline-none"><option value="newest">Récentes</option><option value="oldest">Anciennes</option><option value="amount-desc">Montant ↓</option></select></div>
          </div>
        </div>
        {loading && orders.length === 0 ? <div className="flex items-center justify-center gap-3 p-14 text-sm text-slate-400"><RefreshCw size={18} className="animate-spin text-cyan-300" /> Chargement des commandes…</div> : filteredOrders.length === 0 ? <div className="px-6 py-16 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-500"><CreditCard size={22} /></div><p className="font-semibold text-slate-300">Aucune commande trouvée</p><p className="mt-1 text-xs text-slate-500">Modifiez vos filtres ou attendez une première commande.</p></div> : <>
          <div className="hidden overflow-x-auto md:block"><table className="w-full text-left"><thead className="bg-[#0b1220] text-[10px] font-bold uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">Référence</th><th className="px-5 py-4">Client</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Statut</th><th className="px-5 py-4 text-right">Total</th><th className="px-5 py-4 text-right">Détail</th></tr></thead><tbody className="divide-y divide-white/[0.06]">{filteredOrders.map((order) => { const status = statusPresentation(order.status); const StatusIcon = status.Icon; return <tr key={order.reference} className="transition hover:bg-white/[0.025]"><td className="px-5 py-4"><p className="font-mono text-xs font-semibold text-cyan-300">{order.reference}</p><p className="mt-1 text-[10px] text-slate-500">{order.itemCount} article(s)</p></td><td className="px-5 py-4"><p className="text-xs font-semibold text-white">{order.customer.fullName}</p><p className="mt-1 text-[10px] text-slate-500">{order.customer.email}</p></td><td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">{dateLabel(order.createdAt)}</td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold ${status.className}`}><StatusIcon size={12} />{status.label}</span></td><td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-white">{money(order.total)}</td><td className="px-5 py-4 text-right"><button type="button" onClick={() => setSelectedOrder(order)} aria-label="Voir la commande" className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"><Eye size={15} /></button></td></tr>; })}</tbody></table></div>
          <div className="divide-y divide-white/[0.06] md:hidden">{filteredOrders.map((order) => { const status = statusPresentation(order.status); const StatusIcon = status.Icon; return <button key={order.reference} type="button" onClick={() => setSelectedOrder(order)} className="block w-full p-4 text-left transition hover:bg-white/[0.03]"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-mono text-xs font-semibold text-cyan-300">{order.reference}</p><p className="mt-1 truncate text-sm font-semibold text-white">{order.customer.fullName}</p><p className="mt-1 text-[11px] text-slate-500">{dateLabel(order.createdAt)}</p></div><p className="shrink-0 text-sm font-extrabold text-white">{money(order.total)}</p></div><span className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${status.className}`}><StatusIcon size={12} />{status.label}</span></button>; })}</div>
        </>}
      </section>
      <div className="flex items-start gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4 text-xs leading-relaxed text-cyan-100/80"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-cyan-300" /><p>Les commandes affichées ici sont enregistrées séparément dans le stockage de Speed Services. Les autres ventes du compte marchand SumUp ne sont pas importées. Les statuts de paiement sont confirmés côté serveur auprès de SumUp.</p></div>
    </main>
    {selectedOrder && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedOrder(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="order-detail-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#111a2b] p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">Détail de commande</p><h3 id="order-detail-title" className="mt-1 break-all text-xl font-black text-white">{selectedOrder.reference}</h3><p className="mt-1 text-xs text-slate-500">{dateLabel(selectedOrder.createdAt)}</p></div><button type="button" onClick={() => setSelectedOrder(null)} aria-label="Fermer" className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white"><XCircle size={19} /></button></div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] p-4"><div><p className="text-xs text-slate-400">Total de la commande</p><p className="mt-1 text-3xl font-black text-white">{money(selectedOrder.total)}</p></div>{(() => { const status = statusPresentation(selectedOrder.status); const Icon = status.Icon; return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}><Icon size={13} />{status.label}</span>; })()}</div>
        <div className="grid gap-5 sm:grid-cols-2"><div><h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-300"><Users size={14} /> Client</h4><dl className="space-y-2 text-xs">{[['Nom', selectedOrder.customer.fullName], ['Entreprise', selectedOrder.customer.companyName || '—'], ['SIRET', selectedOrder.customer.siret || '—'], ['E-mail', selectedOrder.customer.email], ['Téléphone', selectedOrder.customer.phone]].map(([k, v]) => <div key={k}><dt className="text-slate-500">{k}</dt><dd className="break-words font-semibold text-slate-200">{v}</dd></div>)}</dl></div>
          <div><h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-300"><Truck size={14} /> Livraison</h4><dl className="space-y-2 text-xs">{[['Mode', selectedOrder.delivery?.label || 'À domicile'], ['Adresse', selectedOrder.customer.address], ['Code postal', selectedOrder.customer.postalCode], ['Ville', selectedOrder.customer.city], ['Pays', selectedOrder.customer.country], ['Instructions', selectedOrder.customer.notes || '—']].map(([k, v]) => <div key={k}><dt className="text-slate-500">{k}</dt><dd className="break-words font-semibold text-slate-200">{v}</dd></div>)}</dl></div></div>
        <div className="mt-6"><h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-300"><Package size={14} /> Articles commandés</h4><div className="overflow-hidden rounded-xl border border-white/[0.07]">{selectedOrder.items.map((item) => <div key={item.sku} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] p-3 last:border-0"><div className="min-w-0"><p className="text-xs font-bold text-white">{item.productName || item.label}</p><p className="mt-1 text-[10px] text-slate-500">{item.variantLabel} · SKU {item.sku} · Qté {item.quantity}</p></div><p className="text-xs font-bold text-white">{money(item.lineTotal)}</p></div>)}</div></div>
        <dl className="mt-5 space-y-2 border-t border-white/[0.08] pt-4 text-xs"><div className="flex justify-between text-slate-400"><dt>Sous-total</dt><dd>{money(selectedOrder.subtotal)}</dd></div><div className="flex justify-between text-slate-400"><dt>Livraison</dt><dd>{selectedOrder.shippingFee === 0 ? 'Offerte' : money(selectedOrder.shippingFee)}</dd></div><div className="flex justify-between pt-2 text-sm font-black text-white"><dt>Total TTC</dt><dd>{money(selectedOrder.total)}</dd></div></dl>
        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"><h4 className="mb-3 text-xs font-black uppercase tracking-wider text-cyan-300">Paiement SumUp</h4><dl className="space-y-2 text-xs">{[['Checkout ID', selectedOrder.sumup?.checkoutId || '—'], ['Transaction ID', selectedOrder.sumup?.transactionId || '—'], ['Code transaction', selectedOrder.sumup?.transactionCode || '—'], ['Moyen de paiement', selectedOrder.sumup?.paymentType || '—'], ['Montant remboursé', money(selectedOrder.sumup?.refundedAmount || 0)]].map(([k, v]) => <div key={k} className="flex flex-col gap-1 sm:flex-row sm:justify-between"><dt className="text-slate-500">{k}</dt><dd className="break-all text-right font-semibold text-slate-200">{v}</dd></div>)}</dl></div>
      </section>
    </div>}
  </div>;
};
