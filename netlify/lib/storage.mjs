import { getStore } from '@netlify/blobs';

let store;

function getStorageStore() {
  // Netlify injecte les identifiants Blobs dans le contexte d'une Function v2.
  // Le store doit donc être initialisé pendant une requête, pas au chargement du module.
  if (!store) store = getStore('speed-services-commerce');
  return store;
}

export async function saveJson(key, value, options = {}) {
  await getStorageStore().set(key, JSON.stringify(value), options);
}

export async function readJson(key) {
  return getStorageStore().get(key, { type: 'json' });
}

export async function listJson(prefix) {
  const { blobs } = await getStorageStore().list({ prefix });
  const values = await Promise.all(blobs.map(async ({ key }) => {
    try { return await readJson(key); } catch { return null; }
  }));
  return values.filter(Boolean);
}
