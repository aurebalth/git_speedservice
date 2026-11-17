const API = 'https://api.sumup.com';

export async function sumupRequest(path, options = {}) {
  const apiKey = process.env.SUMUP_API_KEY;
  if (!apiKey) throw new Error('Configuration SUMUP_API_KEY manquante.');
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    signal: options.signal || AbortSignal.timeout(8000),
  });
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('Réponse SumUp illisible.'); }
  if (!response.ok) {
    const error = new Error(data.error_message || data.message || data.detail || `SumUp HTTP ${response.status}`);
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

export function mapCheckoutStatus(checkout) {
  const status = String(checkout?.status || '').toUpperCase();
  const txs = Array.isArray(checkout?.transactions) ? checkout.transactions : [];
  const refunded = txs.some((tx) => String(tx.status || '').toUpperCase() === 'REFUNDED' || Number(tx.refunded_amount || 0) >= Number(tx.amount || checkout.amount || 0));
  if (refunded) return 'REFUNDED';
  if (status === 'PAID' || txs.some((tx) => String(tx.status || '').toUpperCase() === 'SUCCESSFUL')) return 'PAID';
  if (status === 'FAILED' || txs.some((tx) => String(tx.status || '').toUpperCase() === 'FAILED')) return 'FAILED';
  if (status === 'EXPIRED') return 'EXPIRED';
  if (status === 'CANCELLED' || status === 'CANCELED' || txs.some((tx) => String(tx.status || '').toUpperCase() === 'CANCELLED')) return 'CANCELLED';
  return 'PENDING';
}

export function checkoutPaymentDetails(checkout) {
  const transactions = Array.isArray(checkout?.transactions) ? checkout.transactions : [];
  const tx = transactions.find((item) => item.id && item.id === checkout?.transaction_id)
    || [...transactions].reverse().find((item) => String(item.status || '').toUpperCase() === 'SUCCESSFUL')
    || transactions.at(-1)
    || null;
  const refundTx = transactions.find((item) => item.refunded_amount != null);
  const refundAmountKnown = Boolean(refundTx);
  return {
    transactionId: checkout?.transaction_id || (tx?.id ? String(tx.id) : null),
    transactionCode: checkout?.transaction_code || tx?.transaction_code || null,
    paymentType: tx?.payment_type || null,
    refundedAmount: refundAmountKnown ? Number(refundTx.refunded_amount) : null,
    refundAmountKnown,
    transactionStatus: tx?.status || null,
  };
}
