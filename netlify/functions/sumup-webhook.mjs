import { listJson, readJson, saveJson } from '../lib/storage.mjs';
import { sumupRequest, mapCheckoutStatus, checkoutPaymentDetails } from '../lib/sumup.mjs';

async function legacyHandler(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: '' };
  try {
    const payload = JSON.parse(event.body || '{}');
    if (payload.event_type && payload.event_type !== 'CHECKOUT_STATUS_CHANGED') return { statusCode: 204, body: '' };
    const checkoutId = String(payload.id || '').trim();
    if (!checkoutId) return { statusCode: 400, body: '' };
    const orders = await listJson('orders/');
    const order = orders.find((item) => String(item.sumup?.checkoutId || '') === checkoutId);
    if (!order) return { statusCode: 204, body: '' };

    // Le webhook est un signal, jamais une preuve de paiement : relire le checkout chez SumUp.
    const checkout = await sumupRequest(`/v0.1/checkouts/${encodeURIComponent(checkoutId)}`);
    if (checkout.checkout_reference !== order.reference || Number(checkout.amount) !== Number(order.total) || checkout.currency !== order.currency) {
      console.error('Webhook SumUp ignoré : données de checkout incohérentes.', checkoutId);
      return { statusCode: 204, body: '' };
    }
    const previousStatus = order.status;
    order.status = mapCheckoutStatus(checkout);
    if (order.status === 'PAID' && previousStatus !== 'PAID' && !order.paidAt) order.paidAt = new Date().toISOString();
    order.sumupStatus = checkout.status || null;
    order.sumup = { ...order.sumup, ...checkoutPaymentDetails(checkout) };
    order.updatedAt = new Date().toISOString();
    order.lastSyncedAt = order.updatedAt;
    await saveJson(`orders/${order.reference}`, order);
    if (order.status === 'PAID' && order.cartId) {
      const cart = await readJson(`carts/${order.cartId}`).catch(() => null);
      if (cart) { cart.status = 'converted'; cart.updatedAt = order.updatedAt; await saveJson(`carts/${order.cartId}`, cart); }
    }
    return { statusCode: 204, body: '' };
  } catch (error) {
    console.error('Webhook SumUp:', error.message);
    return { statusCode: 500, body: '' };
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
