import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import { listJson, readJson, saveJson } from '../lib/storage.mjs';
import { sumupRequest, mapCheckoutStatus, checkoutPaymentDetails } from '../lib/sumup.mjs';

const HEADERS = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Pragma': 'no-cache' };
const reply = (statusCode, data, extra = {}) => ({ statusCode, headers: { ...HEADERS, ...extra }, body: JSON.stringify(data) });
const COOKIE = 'ss_admin_session';
const SESSION_SECONDS = 8 * 60 * 60;
const safeEqual = (a, b) => {
  const left = Buffer.from(String(a)); const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
};
const sign = (value) => createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(value).digest('base64url');
const makeSession = () => {
  const payload = Buffer.from(JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
};
const validSession = (event) => {
  const cookie = String(event.headers?.cookie || event.headers?.Cookie || '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`));
  if (!cookie || !process.env.ADMIN_SESSION_SECRET) return false;
  const token = cookie.slice(COOKIE.length + 1);
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try { const data = JSON.parse(Buffer.from(payload, 'base64url').toString()); return data.sub === 'admin' && data.exp > Date.now() / 1000; } catch { return false; }
};
const setCookie = (token) => `${COOKIE}=${token}; Path=/.netlify/functions/admin-checkout; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
const clearCookie = `${COOKIE}=; Path=/.netlify/functions/admin-checkout; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;

async function refreshOrder(order) {
  if (order.status === 'CANCELLED') return order;
  try {
    let checkout;
    if (order.sumup?.checkoutId) {
      checkout = await sumupRequest(`/v0.1/checkouts/${encodeURIComponent(order.sumup.checkoutId)}`);
    } else {
      const matches = await sumupRequest(`/v0.1/checkouts?checkout_reference=${encodeURIComponent(order.reference)}`);
      const found = Array.isArray(matches) ? matches.find((item) => item.checkout_reference === order.reference) : Array.isArray(matches?.items) ? matches.items.find((item) => item.checkout_reference === order.reference) : null;
      if (!found?.id) return order;
      checkout = found.hosted_checkout_url ? found : await sumupRequest(`/v0.1/checkouts/${encodeURIComponent(found.id)}`);
      order.sumup.checkoutId = String(found.id);
      order.hostedCheckoutUrl = checkout.hosted_checkout_url || null;
    }
    if (checkout.checkout_reference !== order.reference || Number(checkout.amount) !== Number(order.total) || checkout.currency !== order.currency) return order;
    const previousStatus = order.status;
    order.status = mapCheckoutStatus(checkout);
    if (order.status === 'PAID' && previousStatus !== 'PAID' && !order.paidAt) order.paidAt = new Date().toISOString();
    order.sumupStatus = checkout.status || null;
    order.sumup = { ...order.sumup, ...checkoutPaymentDetails(checkout) };
    order.updatedAt = new Date().toISOString();
    order.lastSyncedAt = order.updatedAt;
    await saveJson(`orders/${order.reference}`, order);
  } catch (error) {
    // Une indisponibilité SumUp ne doit pas empêcher l'accès aux commandes locales.
    console.warn('Synchronisation SumUp différée:', order.reference, error.message);
  }
  return order;
}

function calculateStats(orders, carts) {
  const paid = orders.filter((o) => o.status === 'PAID');
  const revenueOrders = orders.filter((o) => ['PAID', 'REFUNDED'].includes(o.status));
  const sum = (list) => list.reduce((n, o) => {
    if (o.status === 'REFUNDED' && !o.sumup?.refundAmountKnown) return n;
    return n + Math.max(0, Number(o.total || 0) - Number(o.sumup?.refundedAmount || 0));
  }, 0);
  const now = new Date();
  const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startWeek = new Date(startDay); startWeek.setDate(startDay.getDate() - ((startDay.getDay() + 6) % 7));
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const within = (o, start) => new Date(o.paidAt || o.createdAt) >= start;
  const customers = new Set(orders.map((o) => String(o.customer?.email || '').toLowerCase()).filter(Boolean));
  const abandoned = carts.filter((c) => c.status !== 'converted' && Date.now() - new Date(c.updatedAt).getTime() > 24 * 60 * 60 * 1000);
  return {
    totalOrders: orders.length,
    paid: paid.length,
    pending: orders.filter((o) => o.status === 'PENDING').length,
    failed: orders.filter((o) => o.status === 'FAILED').length,
    expired: orders.filter((o) => o.status === 'EXPIRED').length,
    refunded: orders.filter((o) => o.status === 'REFUNDED').length,
    cancelled: orders.filter((o) => o.status === 'CANCELLED').length,
    revenue: Number(sum(revenueOrders).toFixed(2)),
    customers: customers.size,
    itemsSold: paid.reduce((n, o) => n + Number(o.itemCount || 0), 0),
    averageBasket: paid.length ? Number((sum(paid) / paid.length).toFixed(2)) : 0,
    dailySales: Number(sum(revenueOrders.filter((o) => within(o, startDay))).toFixed(2)),
    weeklySales: Number(sum(revenueOrders.filter((o) => within(o, startWeek))).toFixed(2)),
    monthlySales: Number(sum(revenueOrders.filter((o) => within(o, startMonth))).toFixed(2)),
    cartsCreated: carts.length,
    cartsValidated: carts.filter((c) => ['validated', 'converted'].includes(c.status)).length,
    cartsConverted: carts.filter((c) => c.status === 'converted').length,
    cartsAbandoned: abandoned.length,
    cartsAverage: carts.length ? Number((carts.reduce((n, c) => n + Number(c.amount || 0), 0) / carts.length).toFixed(2)) : 0,
    cartConversionRate: carts.length ? Number((carts.filter((c) => c.status === 'converted').length / carts.length * 100).toFixed(1)) : 0,
  };
}

async function legacyHandler(event) {
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Méthode non autorisée.' }, { Allow: 'POST' });
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return reply(400, { error: 'JSON invalide.' }); }
  const action = body.action || (body.username || body.password ? 'login' : 'list');

  if (action === 'login') {
    const ip = String(event.headers?.['x-nf-client-connection-ip'] || 'unknown');
    const rateKey = `admin-auth/${createHash('sha256').update(ip).digest('hex')}`;
    const attempts = await readJson(rateKey).catch(() => null);
    if (attempts && attempts.windowStart > Date.now() - 15 * 60 * 1000 && attempts.count >= 5) {
      return reply(429, { error: 'Trop de tentatives. Réessayez dans 15 minutes.' });
    }
    const username = process.env.ADMIN_USER;
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password || !process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET.length < 32) return reply(503, { error: 'Configuration administrateur incomplète dans Netlify. ADMIN_SESSION_SECRET doit contenir au moins 32 caractères.' });
    if (typeof body.username !== 'string' || typeof body.password !== 'string' || !safeEqual(body.username, username) || !safeEqual(body.password, password)) {
      const windowStart = attempts && attempts.windowStart > Date.now() - 15 * 60 * 1000 ? attempts.windowStart : Date.now();
      await saveJson(rateKey, { count: (attempts && attempts.windowStart === windowStart ? attempts.count : 0) + 1, windowStart });
      return reply(401, { error: 'Identifiants administrateur incorrects.' });
    }
    await saveJson(rateKey, { count: 0, windowStart: Date.now() });
    return reply(200, { success: true, authenticated: true }, { 'Set-Cookie': setCookie(makeSession()) });
  }
  if (action === 'logout') return reply(200, { success: true }, { 'Set-Cookie': clearCookie });
  if (!validSession(event)) return reply(401, { error: 'Session administrateur expirée. Reconnectez-vous.' });

  try {
    const orders = await listJson('orders/');
    // Synchronisation légère des paiements en attente, limitée aux 30 plus récents.
    const pending = orders.filter((o) => {
      const age = Date.now() - new Date(o.lastSyncedAt || 0).getTime();
      return (['PENDING', 'FAILED'].includes(o.status) && age > 50 * 1000) || (['PAID', 'REFUNDED'].includes(o.status) && age > 10 * 60 * 1000);
    }).sort((a, b) => new Date(a.lastSyncedAt || 0) - new Date(b.lastSyncedAt || 0)).slice(0, 5);
    const refreshed = await Promise.all(pending.map(refreshOrder));
    const refreshedByRef = new Map(refreshed.map((o) => [o.reference, o]));
    const currentOrders = orders.map((o) => refreshedByRef.get(o.reference) || o)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const carts = await listJson('carts/');
    return reply(200, { success: true, orders: currentOrders, carts, stats: calculateStats(currentOrders, carts), count: currentOrders.length });
  } catch (error) {
    console.error('Erreur admin-checkout:', error);
    return reply(500, { error: 'Impossible de charger les commandes locales.' });
  }
}


// Netlify Functions v2 : l'export default Request/Response active le contexte
// d'exécution nécessaire à Netlify Blobs. Le cœur métier historique est conservé.
export default async function handler(request, context) {
  const event = {
    httpMethod: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: request.method === 'GET' || request.method === 'HEAD' ? null : await request.text(),
    rawUrl: request.url,
    path: new URL(request.url).pathname,
  };

  const result = await legacyHandler(event, context);
  const status = Number(result?.statusCode || 200);
  const body = [204, 205, 304].includes(status) ? null : (result?.body ?? null);
  return new Response(body, {
    status,
    headers: result?.headers || {},
  });
}
