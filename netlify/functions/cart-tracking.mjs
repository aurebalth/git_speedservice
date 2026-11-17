import { randomUUID } from 'node:crypto';
import { priceOrderItems } from '../lib/catalog.mjs';
import { readJson, saveJson } from '../lib/storage.mjs';

const response = (statusCode, data) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(data) });

async function legacyHandler(event) {
  if (event.httpMethod !== 'POST') return response(405, { error: 'Méthode non autorisée.' });
  try {
    const body = JSON.parse(event.body || '{}');
    const id = String(body.cartId || '').trim();
    if (!/^[a-f0-9-]{20,80}$/i.test(id)) return response(400, { error: 'Identifiant panier invalide.' });
    const priced = priceOrderItems(body.items || []);
    let activeId = id;
    let key = `carts/${activeId}`;
    let previous = await readJson(key).catch(() => null);
    if (previous?.status === 'converted') {
      activeId = randomUUID();
      key = `carts/${activeId}`;
      previous = null;
    }
    const cart = {
      id: activeId,
      createdAt: previous?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: previous?.status || 'created',
      items: priced.items.map(({ sku, label, quantity, unitPrice }) => ({ sku, label, quantity, price: unitPrice })),
      itemCount: priced.itemCount,
      amount: priced.total,
    };
    await saveJson(key, cart);
    return response(200, { success: true, cartId: activeId });
  } catch (error) {
    return response(400, { error: error.message || 'Suivi panier impossible.' });
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
