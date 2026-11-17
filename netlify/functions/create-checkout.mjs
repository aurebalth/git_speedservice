import { randomUUID } from 'node:crypto';
import { priceOrderItems } from '../lib/catalog.mjs';
import { saveJson, readJson } from '../lib/storage.mjs';
import { sumupRequest } from '../lib/sumup.mjs';

const json = (statusCode, data, extraHeaders = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders },
  body: JSON.stringify(data),
});
const clean = (value, max = 200) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function legacyHandler(event) {
  const requestStartedAt = Date.now();
  if (event.httpMethod !== 'POST') return json(405, { error: 'Méthode non autorisée.' }, { Allow: 'POST' });
  try {
    const body = JSON.parse(event.body || '{}');
    const requestId = clean(body.requestId, 80);
    if (!/^[a-z0-9-]{20,80}$/i.test(requestId)) return json(400, { error: 'Identifiant de tentative invalide.' });

    const customer = {
      companyName: clean(body.customer?.companyName, 150),
      siret: clean(body.customer?.siret, 20),
      fullName: clean(body.customer?.fullName, 150),
      email: clean(body.customer?.email, 150).toLowerCase(),
      phone: clean(body.customer?.phone, 30),
      address: clean(body.customer?.address, 200),
      city: clean(body.customer?.city, 100),
      postalCode: clean(body.customer?.postalCode, 15),
      country: clean(body.customer?.country, 60) || 'France',
      notes: clean(body.customer?.notes, 1000),
    };
    if (!customer.fullName || !validEmail(customer.email) || !customer.phone || !customer.address || !customer.city || !customer.postalCode) {
      return json(400, { error: 'Les informations client ou de livraison sont incomplètes.' });
    }
    if (body.currency && body.currency !== 'EUR') return json(400, { error: 'Seul le paiement en EUR est accepté.' });

    const priced = priceOrderItems(body.items);
    const siteUrl = (process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.SITE_URL || '').replace(/\/$/, '');
    if (!siteUrl) return json(503, { error: 'URL publique du site non configurée dans Netlify.' });
    const parsedSiteUrl = new URL(siteUrl);
    if (parsedSiteUrl.protocol !== 'https:' || !parsedSiteUrl.hostname || ['localhost', '127.0.0.1'].includes(parsedSiteUrl.hostname)) {
      return json(503, { error: 'SITE_URL doit être une URL HTTPS publique valide.' });
    }
    const apiKey = process.env.SUMUP_API_KEY;
    const merchantCode = process.env.SUMUP_MERCHANT_CODE;
    if (!apiKey || !merchantCode) return json(503, { error: 'Configuration SumUp incomplète dans Netlify.' });

    const idempotencyKey = `idempotency/${requestId}`;
    const existingRef = await readJson(idempotencyKey).catch(() => null);
    if (existingRef?.reference) {
      const existing = await readJson(`orders/${existingRef.reference}`);
      if (existing?.hostedCheckoutUrl && existing?.sumup?.checkoutId) {
        return json(200, { success: true, reference: existing.reference, hosted_checkout_url: existing.hostedCheckoutUrl, checkoutId: existing.sumup.checkoutId, reused: true });
      }
      if (existing) {
        // Si le POST précédent a expiré côté réseau, retrouver le checkout avec sa référence avant toute nouvelle création.
        const matches = await sumupRequest(`/v0.1/checkouts?checkout_reference=${encodeURIComponent(existing.reference)}`).catch(() => []);
        const found = Array.isArray(matches) ? matches.find((item) => item.checkout_reference === existing.reference) : Array.isArray(matches?.items) ? matches.items.find((item) => item.checkout_reference === existing.reference) : null;
        if (found?.id) {
          const recovered = found.hosted_checkout_url ? found : await sumupRequest(`/v0.1/checkouts/${encodeURIComponent(found.id)}`).catch(() => found);
          const recoveredUrl = recovered.hosted_checkout_url;
          if (recoveredUrl) {
            const parsed = new URL(recoveredUrl);
            if (parsed.protocol === 'https:' && parsed.hostname === 'checkout.sumup.com' && parsed.pathname.startsWith('/pay/')) {
              existing.sumup.checkoutId = String(found.id); existing.hostedCheckoutUrl = parsed.toString(); existing.sumupStatus = recovered.status || 'PENDING'; existing.updatedAt = new Date().toISOString();
              await saveJson(`orders/${existing.reference}`, existing);
              return json(200, { success: true, reference: existing.reference, checkoutId: existing.sumup.checkoutId, hosted_checkout_url: existing.hostedCheckoutUrl, reused: true });
            }
          }
        }
      }
      return json(409, { error: 'Cette tentative existe déjà. Le serveur vérifie le paiement pour éviter un double débit. Ne relancez pas une deuxième commande.', reference: existingRef.reference });
    }

    const reference = `SS-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const now = new Date().toISOString();
    const order = {
      reference, requestId, createdAt: now, updatedAt: now, status: 'PENDING', currency: 'EUR',
      customer, delivery: { method: 'home', label: 'Livraison à domicile' },
      items: priced.items, subtotal: priced.subtotal, shippingFee: priced.shippingFee,
      total: priced.total, itemCount: priced.itemCount, cartId: clean(body.cartId, 100) || null,
      sumup: { checkoutId: null, transactionId: null, transactionCode: null, paymentType: null, refundedAmount: 0, refundAmountKnown: false },
      hostedCheckoutUrl: null,
    };

    // Réserver l'identifiant de requête avant l'appel réseau pour éviter les doubles paiements en cas de timeout.
    try {
      await saveJson(idempotencyKey, { reference, createdAt: now }, { onlyIfNew: true });
    } catch {
      const raced = await readJson(idempotencyKey).catch(() => null);
      if (raced?.reference) return json(409, { error: 'Cette tentative est déjà en cours de traitement.', reference: raced.reference });
      throw new Error('Impossible de réserver cette tentative de paiement.');
    }
    await saveJson(`orders/${reference}`, order, { onlyIfNew: true });

    const description = `Speed Services ${reference} - ${customer.fullName}`.slice(0, 200);
    let checkout;
    const sumupStartedAt = Date.now();
    try {
      checkout = await sumupRequest('/v0.1/checkouts', {
        method: 'POST',
        body: JSON.stringify({
          checkout_reference: reference,
          amount: priced.total,
          currency: 'EUR',
          merchant_code: merchantCode,
          description,
          hosted_checkout: { enabled: true },
          redirect_url: `${siteUrl}/checkout?payment=return&reference=${encodeURIComponent(reference)}`,
          return_url: `${siteUrl}/.netlify/functions/sumup-webhook`,
        }),
      });
    } catch (error) {
      // En cas de timeout, on garde la commande réservée : ne pas créer un second checkout aveuglément.
      order.lastError = clean(error.message, 250);
      if (error.status && error.status < 500) order.status = 'FAILED';
      order.updatedAt = new Date().toISOString();
      await saveJson(`orders/${reference}`, order);
      console.error('Création SumUp en échec ou résultat incertain:', error.message);
      return json(error.status && error.status < 500 ? 502 : 503, {
        error: 'SumUp n’a pas confirmé la création du paiement. La tentative est conservée pour éviter un double débit. Contactez le support si le problème persiste.',
        retryable: !error.status || ![400, 401, 403, 422].includes(error.status),
        reference,
      });
    }

    const sumupDurationMs = Date.now() - sumupStartedAt;
    const hostedUrl = checkout.hosted_checkout_url;
    let safeUrl;
    try { safeUrl = new URL(hostedUrl); } catch { safeUrl = null; }
    if (!safeUrl || safeUrl.protocol !== 'https:' || safeUrl.hostname !== 'checkout.sumup.com' || !safeUrl.pathname.startsWith('/pay/')) {
      order.sumup.checkoutId = checkout.id || null;
      order.updatedAt = new Date().toISOString();
      order.lastError = 'URL Hosted Checkout SumUp invalide ou absente.';
      await saveJson(`orders/${reference}`, order);
      return json(502, { error: 'SumUp a créé le paiement mais a retourné un lien de paiement invalide. Ne recréez pas la commande.', reference });
    }

    order.sumup.checkoutId = String(checkout.id);
    order.hostedCheckoutUrl = safeUrl.toString();
    order.sumupStatus = checkout.status || 'PENDING';
    order.updatedAt = new Date().toISOString();
    await saveJson(`orders/${reference}`, order);

    if (order.cartId) {
      const cart = await readJson(`carts/${order.cartId}`).catch(() => null);
      if (cart) { cart.status = 'validated'; cart.orderReference = reference; cart.updatedAt = order.updatedAt; await saveJson(`carts/${order.cartId}`, cart); }
    }

    const totalDurationMs = Date.now() - requestStartedAt;
    console.info('Speed Services checkout timings:', { sumupDurationMs, totalDurationMs });
    return json(200, { success: true, reference, checkoutId: order.sumup.checkoutId, hosted_checkout_url: order.hostedCheckoutUrl, timings: { sumupMs: sumupDurationMs, totalMs: totalDurationMs } }, { 'Server-Timing': `sumup;dur=${sumupDurationMs}, total;dur=${totalDurationMs}` });
  } catch (error) {
    console.error('Erreur create-checkout:', error);
    return json(400, { error: error.message || 'Impossible de créer la commande.' });
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
