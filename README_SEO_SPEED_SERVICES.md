# Speed Services — mise à niveau SEO multi-marques

Ce patch SEO est basé sur le projet et le catalogue transmis le 25 novembre 2026.

## Fichiers à remplacer / ajouter

À la racine du projet (au même niveau que `package.json`), remplace ou ajoute les fichiers en conservant exactement cette arborescence :

- `index.html`
- `package.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/generate-seo-artifacts.mjs` (nouveau)
- `src/data/seoUtils.ts` (nouveau)
- `src/data/siteConfig.ts`
- `src/main.tsx`
- `src/pages/about/AboutPage.tsx`
- `src/pages/checkout/CheckoutPage.tsx`
- `src/pages/home/HomePage.tsx`
- `src/pages/legal/LegalPage.tsx`
- `src/pages/product/CategoryPage.tsx`
- `src/pages/product/ProductDetailPage.tsx`

Ne remplace pas les autres fichiers du projet avec ce patch.

## Ce que cette mise à niveau fait

- Métadonnées uniques pour les 145 fiches produits (titre, description, URL canonique et métadonnées de partage).
- Prix TTC repris tels quels depuis le catalogue ; aucune marge ni conversion ajoutée.
- Calcul du prix par couche sur les 79 variantes de couches bébé dont le nombre de couches est disponible dans le libellé du conditionnement.
- Données structurées Schema.org `Product` + `Offer` et `BreadcrumbList` sur les fiches individuelles ; `CollectionPage` / `ItemList` sur les pages de marques, gammes et univers.
- Génération de fichiers HTML pré-rendus au moment du build pour la page d'accueil, les pages légales, les univers, les marques, les gammes et les fiches produits.
- Génération automatique du sitemap à partir des catalogues : 196 URL et 703 références d'images pour la version du catalogue fournie.
- `robots.txt` avec l'URL du sitemap et exclusion de l'administration.
- Pages checkout marquées `noindex` afin d'éviter leur indexation dans Google.
- Navigation SEO par univers, marque, gamme et fiche conservée ; le patch ne modifie ni les références catalogue, ni le panier, ni le paiement SumUp, ni l'administration.

## Installation

1. Fais une copie de sauvegarde du projet.
2. Extrais le ZIP dans le dossier racine du projet, au même niveau que `package.json`.
3. Autorise le remplacement des fichiers listés ci-dessus.
4. Dans PowerShell, place-toi dans le dossier du projet et lance :

```powershell
npm run build
```

Le script de build exécute Vite puis génère les pages SEO statiques dans `dist/` et actualise le sitemap dans `public/` et `dist/`.

Si les dépendances ne sont pas installées, lance d'abord `npm ci`, puis `npm run build`.

Ne déploie pas si le build affiche une erreur. Le build complet n'a pas pu être exécuté dans l'environnement de préparation, car les dépendances npm n'ont pas pu être installées (erreur réseau `EAI_AGAIN`). Les contrôles syntaxiques, catalogue, liens d'images et sitemap ont été réalisés séparément.

## À propos de la promesse de prix

Le site met en avant les prix bas et le coût par couche calculé à partir du prix de vente TTC et du nombre de couches indiqué. Le patch n'affirme pas que Speed Services est « le moins cher du marché » : cette comparaison doit être démontrée par une veille tarifaire datée et comparable (même référence, même format, frais de livraison inclus). Aucun avis ou note client n'est inventé.

## Après publication

- Ouvre `https://speedservices.store/sitemap.xml` et vérifie que les URL Pingo et les autres nouvelles pages s'y trouvent.
- Dans Google Search Console, soumets une seule fois `sitemap.xml` ou relance la lecture du sitemap existant.
- Inspecte quelques URL prioritaires (accueil, page couches bébé, pages marques et fiches produits) et demande l'indexation des pages les plus importantes.
- L'indexation et les changements de titres dans Google prennent du temps ; aucune position précise ne peut être garantie.
