import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BABY_CATALOG } from '../../data/babyCatalog';
import { FEMALE_CATALOG } from '../../data/femaleCatalog';
import { ADULT_CATALOG } from '../../data/adultCatalog';
import { PET_CATALOG } from '../../data/petCatalog';
import { SITE_CONFIG } from '../../data/siteConfig';
import { ArrowLeft, CheckCircle2, Eye, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const location = useLocation();
  const { addToCart } = useCart();

  // Détermination de l'univers selon l'URL active
  let catalog = BABY_CATALOG;
  let universeTitle = "Bébé & Enfant (Babylino)";
  let universeBasePath = "/produit/couches/bebe";
  let universeDescription = "Découvrez les couches bébé Babylino, les tailles et les conditionnements disponibles au catalogue Speed Services.";

  if (location.pathname.includes('/hygiene-feminine')) {
    catalog = FEMALE_CATALOG;
    universeTitle = "Hygiène Féminine (EveryDay)";
    universeBasePath = "/produit/hygiene-feminine";
    universeDescription = "Protections hygiéniques douces, voiles 100% coton et lingettes dermatologiques.";
  } else if (location.pathname.includes('/incontinence-adultes')) {
    catalog = ADULT_CATALOG;
    universeTitle = "Incontinence Adultes (IASI)";
    universeBasePath = "/produit/incontinence-adultes";
    universeDescription = "Solutions absorbantes discrètes, culottes et alèses de protection pour adultes.";
  } else if (location.pathname.includes('/petcare')) {
    catalog = PET_CATALOG;
    universeTitle = "PetCare & Entretien (RisPET)";
    universeBasePath = "/produit/petcare";
    universeDescription = "Tapis hygiéniques, lingettes et produits d'entretien adaptés aux animaux.";
  }

  // SI PAS DE CATEGORYID -> AFFICHAGE DU HUB (CHOIX DE LA SOUS-CATÉGORIE)
  if (!categoryId) {
    return (
      <>
        <Helmet>
          <title>{universeBasePath === "/produit/couches/bebe" ? "Couches bébé Babylino : tailles et modèles" : universeTitle} | {SITE_CONFIG.name}</title>
          <meta name="description" content={universeDescription} />
          <link rel="canonical" href={`https://speedservices.store${universeBasePath}`} />
          <meta property="og:title" content={`${universeTitle} | ${SITE_CONFIG.name}`} />
          <meta property="og:description" content={universeDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://speedservices.store${universeBasePath}`} />
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org', '@type': 'CollectionPage', name: universeTitle,
            description: universeDescription, url: `https://speedservices.store${universeBasePath}`,
            inLanguage: 'fr-FR', isPartOf: { '@type': 'WebSite', name: 'Speed Services', url: 'https://speedservices.store/' },
            mainEntity: { '@type': 'ItemList', itemListElement: catalog.map((item: any, index: number) => ({
              '@type': 'ListItem', position: index + 1, name: item.name,
              url: `https://speedservices.store${universeBasePath}/${item.id}`
            })) }
          })}</script>
        </Helmet>

        <nav className="bg-slate-900 text-slate-300 py-3.5 border-b border-slate-800 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-sky-400 font-bold">{universeTitle}</span>
          </div>
        </nav>

        <section className="bg-slate-900 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">Sélectionnez une Gamme</span>
            <h1 className="text-3xl md:text-5xl font-black mb-4">{universeTitle}</h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">{universeDescription}</p>
          </div>
        </section>

        <section className="py-16 bg-slate-50 min-h-[500px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900">Sous-catégories et Gammes Spécialisées</h2>
              <p className="text-xs md:text-sm text-slate-500">Choisissez la catégorie de produits que vous souhaitez consulter.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalog.map((item: any) => (
                <Link
                  key={item.id}
                  to={`${universeBasePath}/${item.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-sky-300 transition-all group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                        {item.subCategory}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 h-40 flex items-center justify-center mb-4 group-hover:bg-slate-100 transition-colors">
                      <img
                        src={item.variants?.[0]?.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-sky-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {item.variants?.length || 0} conditionnements disponibles
                    </span>
                    <span className="bg-slate-900 group-hover:bg-sky-600 text-white p-2 rounded-xl transition-colors">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {universeBasePath === "/produit/couches/bebe" && (
              <section className="mt-14 bg-white border border-slate-200 rounded-2xl p-6 md:p-9">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Bien choisir ses couches bébé</h2>
                <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-600">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Quelle taille de couche choisir ?</h3>
                    <p>Le poids de bébé est le premier repère pour choisir une taille. Consultez la fourchette de poids indiquée sur chaque paquet et comparez-la au poids actuel de votre enfant. Si la couche marque la peau, ferme difficilement ou laisse régulièrement passer des fuites, vérifiez son ajustement et envisagez la taille adaptée suivante.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Couches classiques, culottes et changes</h3>
                    <p>Les couches à attaches permettent d’ajuster la fermeture, tandis que les culottes d’apprentissage s’enfilent comme un sous-vêtement. Le choix dépend notamment de l’âge, de la mobilité et des habitudes de change. Consultez les descriptions et les conditionnements de chaque référence Babylino avant votre achat.</p>
                  </div>
                </div>
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <h3 className="font-bold text-slate-900 mb-3">Questions fréquentes sur les couches bébé</h3>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div><h4 className="font-semibold text-slate-900">Comment savoir si une couche est à la bonne taille ?</h4><p>Elle doit épouser le corps sans comprimer, rester bien en place et limiter les espaces au niveau des cuisses. Vérifiez aussi la plage de poids du fabricant.</p></div>
                    <div><h4 className="font-semibold text-slate-900">Faut-il choisir une couche plus grande pour la nuit ?</h4><p>Pas systématiquement. Choisissez d’abord une taille adaptée au poids et à la morphologie de bébé, puis consultez les caractéristiques d’absorption indiquées pour la référence.</p></div>
                    <div><h4 className="font-semibold text-slate-900">Où consulter les tailles et les conditionnements Babylino ?</h4><p>Chaque fiche produit présente les tailles, les unités par paquet, le prix et les informations propres à la référence disponible au catalogue.</p></div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>
      </>
    );
  }

  // SI CATEGORYID PRÉSENT -> AFFICHAGE DES VARIANTES DE LA SOUS-CATÉGORIE
  const allProducts = [
    ...(BABY_CATALOG || []),
    ...(FEMALE_CATALOG || []),
    ...(ADULT_CATALOG || []),
    ...(PET_CATALOG || [])
  ];

  const product = allProducts.find(
    (item) => item.id === categoryId || item.id.toLowerCase() === categoryId?.toLowerCase()
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-28 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Catégorie introuvable</h1>
        <p className="text-slate-500 mb-6 text-sm">
          L'identifiant recherché (<code className="bg-slate-100 px-2 py-1 rounded text-red-500 font-mono">{categoryId}</code>) ne correspond à aucune catégorie active.
        </p>
        <Link to={universeBasePath} className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors">
          <ArrowLeft size={16} /> Retour à la catégorie
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Catalogue Professionnel - {SITE_CONFIG.name}</title>
        <meta name="description" content={`${product.description} Consultez les tailles, conditionnements et références disponibles chez Speed Services.`.slice(0, 155)} />
        <link rel="canonical" href={`https://speedservices.store${universeBasePath}/${product.id}`} />
        <meta property="og:title" content={`${product.name} | ${SITE_CONFIG.name}`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://speedservices.store${universeBasePath}/${product.id}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'CollectionPage', name: product.name,
          description: product.description, url: `https://speedservices.store${universeBasePath}/${product.id}`,
          inLanguage: 'fr-FR',
          mainEntity: { '@type': 'ItemList', itemListElement: (product.variants || []).map((variant: any, index: number) => ({
            '@type': 'ListItem', position: index + 1, name: variant.label,
            url: `https://speedservices.store/produit/detail/${variant.slug || variant.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
          })) }
        })}</script>
      </Helmet>

      {/* Fil d'Ariane */}
      <nav className="bg-slate-900 text-slate-400 py-3.5 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <Link to={universeBasePath} className="hover:text-white transition-colors">{universeTitle}</Link>
          <span>/</span>
          <span className="text-sky-400 font-medium">{product.subCategory}</span>
          <span>/</span>
          <span className="text-slate-100 font-bold">{product.name}</span>
        </div>
      </nav>

      {/* En-tête */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">
            {product.subCategory}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white">{product.name}</h1>
          <p className="text-slate-400 mt-3 max-w-3xl text-sm md:text-base leading-relaxed">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300">
            {product.features?.map((feat: string, idx: number) => (
              <span key={idx} className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-lg border border-slate-700">
                <CheckCircle2 size={14} className="text-sky-400" /> {feat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="max-w-4xl text-sm leading-relaxed text-slate-600">{product.description} Retrouvez ci-dessous les formats et références associés à cette gamme. Les informations de poids, de taille, de quantité et de prix sont indiquées sur chaque fiche produit afin de vous aider à comparer les conditionnements avant de commander.</p>
        </div>
      </section>

      {/* Grille des variantes du produit */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">Variantes et Conditionnements Disponibles</h2>
            <p className="text-sm text-slate-500">Sélectionnez une référence pour consulter les spécifications techniques et les tarifs professionnels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.variants?.map((variant: any) => {
              const variantSlug = variant.slug || variant.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

              return (
                <div
                  key={variant.sku}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                        SKU : {variant.sku}
                      </span>
                    </div>

                    <Link
                      to={`/produit/detail/${variantSlug}`}
                      className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-center justify-center h-52 mb-5 group-hover:bg-slate-100/70 transition-colors relative block"
                    >
                      <img
                        src={variant.image}
                        alt={variant.label}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-3 right-3 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium shadow-md">
                        <Eye size={14} /> Voir la fiche détaillée
                      </span>
                    </Link>

                    <h3 className="font-bold text-slate-900 text-lg mb-2 hover:text-sky-600 transition-colors">
                      <Link to={`/produit/detail/${variantSlug}`}>
                        {variant.label}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {variant.detailedDescription || product.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Tarif HT (Listino)</span>
                      <span className="text-2xl font-black text-slate-900">{variant.price.toFixed(2)} €</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart({
                          sku: variant.sku,
                          label: variant.label,
                          price: variant.price,
                          image: variant.image,
                          variantSlug: variantSlug,
                          subCategory: product.subCategory
                        }, 1)}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-sky-600/20 cursor-pointer"
                        title="Ajouter au panier"
                      >
                        <ShoppingBag size={14} /> Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};