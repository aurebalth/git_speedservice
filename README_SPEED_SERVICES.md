# Speed Services — commandes locales et paiement SumUp

## Ce qui a été modifié

- Les commandes sont enregistrées dans le stockage persistant **Netlify Blobs**, sous le store `speed-services-commerce`.
- L'administration lit uniquement les commandes créées par ce site. Elle ne télécharge plus l'historique global du compte marchand SumUp.
- Les prix, variantes, SKU, quantités et frais de livraison sont recalculés côté serveur à partir des quatre catalogues TypeScript présents dans `src/data/`.
- Les frais de livraison reprennent les paliers existants de `CartContext.tsx` : gratuit à partir de 50 €, sinon 1,90 € (1–2 articles), 3,90 € (3–5), 5,90 € (6–8), 7,90 € (plus de 8).
- Le checkout est associé à une référence Speed Services et à l'identifiant du checkout SumUp. Une clé d'idempotence empêche de créer un second paiement à la suite d'un double clic ou d'une répétition réseau.
- Le webhook `sumup-webhook` relit toujours le checkout auprès de SumUp avant de modifier le statut. Le tableau de bord effectue aussi une synchronisation de rattrapage.
- Le suivi des paniers est séparé des commandes et n'enregistre ni nom ni coordonnées client. Un panier sans activité depuis 24 h est compté comme abandon estimé.
- La page `/admin` conserve son thème sombre, avec recherche, statuts, dates, tri, export CSV et détail de commande.

## Dépendance

`@netlify/blobs` a été ajouté à `package.json` (`^11.1.9`). Après extraction du ZIP, exécuter `npm install` pour installer les dépendances et synchroniser `package-lock.json`.

## Variables d'environnement Netlify

À définir dans **Project configuration → Environment variables** :

- `SUMUP_API_KEY` : clé API SumUp privée.
- `SUMUP_MERCHANT_CODE` : code marchand SumUp.
- `ADMIN_USER` : identifiant de connexion à `/admin`.
- `ADMIN_PASSWORD` : mot de passe de connexion à `/admin`.
- `ADMIN_SESSION_SECRET` : secret aléatoire d'au moins 32 caractères, réservé à la signature du cookie de session.

Netlify fournit normalement `URL` automatiquement. Si elle n'est pas disponible dans ton contexte, définis `SITE_URL` avec l'URL HTTPS publique du site.

Ne place aucune de ces valeurs dans le code frontend et ne les envoie jamais dans le ZIP.

## Déploiement

1. Extraire le projet et exécuter `npm install`.
2. Vérifier `npm run build` en local.
3. Définir les cinq variables d'environnement ci-dessus dans Netlify.
4. Déployer le projet complet sur Netlify. Les quatre fonctions `.mjs` utilisent maintenant l’export `default` avec les API `Request` / `Response` de **Netlify Functions v2**. C’est nécessaire pour que Netlify injecte automatiquement le contexte et les identifiants Netlify Blobs. Le store est initialisé à la première requête, et non au chargement du module.
5. Ouvrir `/admin` et vérifier que la liste est vide au départ ou ne contient que les commandes Speed Services déjà créées par ce nouveau système.
6. Faire un paiement test SumUp et vérifier que la commande apparaît avec sa référence, ses lignes, ses frais de livraison et son statut.

## Contrôles à faire avant mise en production

- Après déploiement, vérifier dans les logs que les fonctions démarrent sans `MissingBlobsEnvironmentError` et que le store `speed-services-commerce` accepte lecture et écriture. Avec Functions v2, Netlify fournit automatiquement les identifiants Blobs ; ne crée pas de variables `NETLIFY_SITE_ID` ou `NETLIFY_BLOBS_TOKEN` manuellement pour cette version.
- Faire un paiement SumUp de test, un paiement refusé et un paiement abandonné/expiré.
- Vérifier le webhook `/.netlify/functions/sumup-webhook` dans les journaux de fonctions Netlify.
- Vérifier le comportement d'un remboursement depuis le tableau de bord SumUp : les détails de remboursement dépendent des champs que SumUp renvoie dans le checkout et ses transactions.
- Tester l'export CSV avec des accents et des adresses contenant des virgules ou des guillemets.

## À propos de la vitesse SumUp

Le site mesure le temps de réponse de sa fonction de création et expose `Server-Timing`. Une fois la redirection effectuée, le chargement de la page de paiement est hébergé par SumUp : le site ne peut pas garantir ni accélérer directement cette partie. Le Payment Widget est techniquement compatible avec cette architecture : le backend peut créer le même checkout local et transmettre son `checkoutId` au widget SumUp. Il faudrait remplacer la redirection par le chargement du SDK et gérer ses événements `success`, `fail` et `auth-screen`, tout en vérifiant le statut final côté serveur. Il n'est pas activé dans cette version. Il peut éviter le changement de page, mais SumUp ne garantit pas que le traitement ou le chargement sera plus rapide.

## Limites importantes

- L'abandon de panier est une estimation basée sur 24 h sans activité ; un panier peut être abandonné plus tôt, mais le navigateur ne permet pas de le confirmer avec certitude.
- Les statuts `PAID`, `PENDING`, `FAILED`, `EXPIRED` sont ceux du cycle checkout SumUp. Les remboursements partiels ou les annulations dépendent des détails de transaction fournis par SumUp.
- L'installation de dépendances et le build n'ont pas pu être exécutés dans l'environnement de préparation, car l'accès au registre npm a échoué par erreur DNS. Le build doit donc être validé après `npm install` avant publication.
