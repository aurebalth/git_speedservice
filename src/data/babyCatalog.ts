export interface ProductVariant {
  sku: string;
  slug: string;
  label: string;
  price: number;
  inStock: boolean;
  image: string;
  detailedDescription: string;
}

export interface BabyProduct {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  seoUrl: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

export const BABY_CATALOG: BabyProduct[] = [
  {
    id: "babylino-sensitive-normal-pack",
    name: "Couches Babylino Sensitive (Paquet Normal)",
    category: "bebe",
    subCategory: "Couches Classiques",
    seoUrl: "/produit/couches/bebe/babylino-sensitive-normal-pack",
    description: "Couches ultra-délicates et absorbantes dotées de la technologie Dry-Matrix et certifiées OEKO-TEX Classe 1, parfaites pour la peau sensible des bébés.",
    features: [
      "Technologie Dry-Matrix anti-fuites",
      "Certifié OEKO-TEX Standard 100 Classe 1",
      "Indicateur d'humidité intégré",
      "Testé dermatologiquement"
    ],
    variants: [
      {
        sku: "82500",
        slug: "babylino-sensitive-t1-nouveau-ne",
        label: "Taille 1, Nouveau-né (2-5 kg) - 26 unités",
        price: 5.34,
        inStock: true,
        image: "/image/82500.png",
        detailedDescription: "Couches Babylino Sensitive Taille 1 conçues pour les premiers jours de bébé. Équipées d'une découpe ombilicale protectrice et certifiées OEKO-TEX Classe 1 sans substances nocives."
      },
      {
        sku: "82510",
        slug: "babylino-sensitive-t2-mini",
        label: "Taille 2, Mini (3-6 kg) - 23 unités",
        price: 5.34,
        inStock: true,
        image: "/image/82510.png",
        detailedDescription: "Couches Babylino Sensitive Taille 2 avec voile supérieur alvéolé ultra-doux. La technologie Dry-Matrix retient les fuites liquides au cœur de la couche."
      },
      {
        sku: "8252",
        slug: "babylino-sensitive-t3-midi",
        label: "Taille 3, Midi (4-9 kg) - 22 unités",
        price: 5.60,
        inStock: true,
        image: "/image/8252.png",
        detailedDescription: "Couches Babylino Sensitive Taille 3 pour bébés de 4 à 9 kg. Offrent une grande liberté de mouvement grâce à des bandes latérales élastiques très ajustables."
      },
      {
        sku: "8253",
        slug: "babylino-sensitive-t4-maxi",
        label: "Taille 4, Maxi (8-13 kg) - 20 unités",
        price: 5.60,
        inStock: true,
        image: "/image/8253.png",
        detailedDescription: "Babylino Sensitive Taille 4 garantit jusqu'à 12h de protection au sec. Équipée d'un témoin d'humidité qui change de couleur pour indiquer le moment du change."
      },
      {
        sku: "8254",
        slug: "babylino-sensitive-t4plus-maxi-plus",
        label: "Taille 4+, Maxi Plus (10-15 kg) - 19 unités",
        price: 5.60,
        inStock: true,
        image: "/image/8254.png",
        detailedDescription: "Couches Babylino Sensitive Taille 4+ disposant d'une capacité d'absorption accrue pour les bébés plus actifs nécessitant un renfort de nuit."
      },
      {
        sku: "8255",
        slug: "babylino-sensitive-t5-junior",
        label: "Taille 5, Junior (11-16 kg) - 18 unités",
        price: 5.60,
        inStock: true,
        image: "/image/8255.png",
        detailedDescription: "Babylino Sensitive Taille 5 récompensée par le Product Safety Award de la Commission Européenne pour son niveau de sécurité cutanée exemplaire."
      },
      {
        sku: "8282",
        slug: "babylino-sensitive-t5plus-junior-plus",
        label: "Taille 5+, Junior Plus (12-17 kg) - 16 unités",
        price: 5.60,
        inStock: true,
        image: "/image/8282.png",
        detailedDescription: "Couches Babylino Sensitive Taille 5+ surdimensionnées au niveau du matelas absorbant pour éviter toute fuite lors des nuits agitées."
      },
      {
        sku: "82560",
        slug: "babylino-sensitive-t6-extra-large",
        label: "Taille 6, Très Grand (13-18 kg) - 14 unités",
        price: 5.60,
        inStock: true,
        image: "/image/82560.png",
        detailedDescription: "Babylino Sensitive Taille 6 pour les enfants de 13 à 18 kg. Matériaux respirants et extra-doux certifiés sans lotion ni parfum superflu."
      },
      {
        sku: "8283",
        slug: "babylino-sensitive-t7-extra-large-plus",
        label: "Taille 7, Très Grand Plus (15+ kg) - 14 unités",
        price: 5.60,
        inStock: true,
        image: "/image/8283.png",
        detailedDescription: "Babylino Sensitive Taille 7 adaptée aux plus grands bébés (15kg et plus). Offre une couverture maximale avec des attaches ultra-résistantes."
      }
    ]
  },
  {
    id: "babylino-sensitive-value-pack",
    name: "Couches Babylino Sensitive (Format Éco)",
    category: "bebe",
    subCategory: "Couches Formats Économiques",
    seoUrl: "/produit/couches/bebe/babylino-sensitive-value-pack",
    description: "Le format économique idéal pour faire le stock de couches Babylino Sensitive tout en garantissant douceur et protection maximale.",
    features: [
      "Grande quantité par paquet pour un usage quotidien",
      "Voile alvéolé ultra-doux semblable au coton",
      "Protection optimale jour et nuit"
    ],
    variants: [
      {
        sku: "82501",
        slug: "babylino-eco-t1-nouveau-ne-68",
        label: "Taille 1, Nouveau-né (2-5 kg) - 68 unités",
        price: 12.57,
        inStock: true,
        image: "/image/82501.png",
        detailedDescription: "Pack économique Babylino Sensitive Taille 1 (68 couches). Idéal pour préparer la naissance avec le meilleur rapport qualité/prix certifié OEKO-TEX."
      },
      {
        sku: "82620",
        slug: "babylino-eco-t2-mini-64",
        label: "Taille 2, Mini (3-6 kg) - 64 unités",
        price: 12.57,
        inStock: true,
        image: "/image/82620.png",
        detailedDescription: "Pack économique Babylino Sensitive Taille 2 (64 couches) assurant douceur et protection anti-fuites continue."
      },
      {
        sku: "8257",
        slug: "babylino-eco-t3-midi-56",
        label: "Taille 3, Midi (4-9 kg) - 56 unités",
        price: 12.94,
        inStock: true,
        image: "/image/8257.png",
        detailedDescription: "Pack Value Pack Babylino Sensitive Taille 3 (56 unités). Économisez sur le réassort quotidien sans faire de concession sur la tolérance dermatologique."
      },
      {
        sku: "8258",
        slug: "babylino-eco-t4-maxi-50",
        label: "Taille 4, Maxi (8-13 kg) - 50 unités",
        price: 12.94,
        inStock: true,
        image: "/image/8258.png",
        detailedDescription: "Pack éco Babylino Sensitive Taille 4 (50 unités) doté du système Dry-Matrix pour garder les fesses de bébé parfaitement au sec."
      },
      {
        sku: "8259",
        slug: "babylino-eco-t4plus-maxi-plus-46",
        label: "Taille 4+, Maxi Plus (10-15 kg) - 46 unités",
        price: 12.94,
        inStock: true,
        image: "/image/8259.png",
        detailedDescription: "Pack éco Babylino Sensitive Taille 4+ (46 unités) offrant une grande capacité d'absorption."
      },
      {
        sku: "8260",
        slug: "babylino-eco-t5-junior-44",
        label: "Taille 5, Junior (11-16 kg) - 44 unités",
        price: 12.94,
        inStock: true,
        image: "/image/8260.png",
        detailedDescription: "Pack éco Babylino Sensitive Taille 5 (44 unités) avec indicateur d'humidité et découpe ergonomique."
      },
      {
        sku: "8263",
        slug: "babylino-eco-t5plus-junior-plus-42",
        label: "Taille 5+, Junior Plus (12-17 kg) - 42 unités",
        price: 12.94,
        inStock: true,
        image: "/image/8263.png",
        detailedDescription: "Pack éco Babylino Sensitive Taille 5+ (42 unités) spécialement dimensionné pour les besoins renforcés."
      },
      {
        sku: "82610",
        slug: "babylino-eco-t6-xl-38",
        label: "Taille 6, Très Grand (13-18 kg) - 38 unités",
        price: 12.94,
        inStock: true,
        image: "/image/82610.png",
        detailedDescription: "Pack éco Babylino Sensitive Taille 6 (38 unités) offrant confort et sécurité anti-fuites optimale."
      },
      {
        sku: "82640",
        slug: "babylino-eco-t7-xl-plus-36",
        label: "Taille 7, Très Grand Plus (15+ kg) - 36 unités",
        price: 12.94,
        inStock: true,
        image: "/image/82640.png",
        detailedDescription: "Pack éco Babylino Sensitive Taille 7 (36 unités) pour enfants de 15 kg et plus."
      }
    ]
  },
  {
    id: "babylino-cotton-soft-mutandina",
    name: "Couches-Culottes Babylino Sensitive (Pants)",
    category: "bebe",
    subCategory: "Couches-Culottes (Pants)",
    seoUrl: "/produit/couches/bebe/babylino-cotton-soft-mutandina",
    description: "Couches-culottes faciles à enfiler et à enlever, idéales pour l'apprentissage de la propreté grâce à leur élasticité à 360°.",
    features: [
      "Élasticité à 360° pour un ajustement parfait",
      "S'enfile comme un vrai sous-vêtement",
      "Barrières anti-fuites renforcées"
    ],
    variants: [
      {
        sku: "89021",
        slug: "babylino-pants-t4-maxi-22",
        label: "Paquet Normal - Taille 4, Culotte Maxi (7-13 kg) - 22 unités",
        price: 6.54,
        inStock: true,
        image: "/image/89021.png",
        detailedDescription: "Culottes d'apprentissage Babylino Pants Taille 4. S'enfilent d'un seul geste et se déchirent facilement sur les côtés pour un retrait rapide."
      },
      {
        sku: "89022",
        slug: "babylino-pants-t5-junior-20",
        label: "Paquet Normal - Taille 5, Culotte Junior (10-16 kg) - 20 unités",
        price: 6.54,
        inStock: true,
        image: "/image/89022.png",
        detailedDescription: "Babylino Pants Taille 5 en paquet normal (20 unités). Leur ceinture 360° suit tous les mouvements des bambins très actifs."
      },
      {
        sku: "89023",
        slug: "babylino-pants-t6-xl-18",
        label: "Paquet Normal - Taille 6, Culotte XL (13-18 kg) - 18 unités",
        price: 6.54,
        inStock: true,
        image: "/image/89023.png",
        detailedDescription: "Babylino Pants Taille 6 (18 unités) offrant un confort exceptionnel et zéro fuite lors des activités de bébé."
      },
      {
        sku: "89024",
        slug: "babylino-pants-t7-xl-plus-16",
        label: "Paquet Normal - Taille 7, Culotte XL Plus (15-25 kg) - 16 unités",
        price: 6.54,
        inStock: true,
        image: "/image/89024.png",
        detailedDescription: "Culottes Babylino Pants Taille 7 (16 unités) idéales pour l'étape de transition vers la propreté."
      },
      {
        sku: "89072",
        slug: "babylino-pants-t8-xxl-14",
        label: "Paquet Normal - Taille 8, Culotte (20+ kg) - 14 unités",
        price: 6.54,
        inStock: true,
        image: "/image/89072.png",
        detailedDescription: "Babylino Pants Taille 8 (14 unités) pour les plus grands enfants pesant plus de 20 kg."
      },
      {
        sku: "89025",
        slug: "babylino-pants-eco-t4-maxi-38",
        label: "Format Éco - Taille 4, Culotte Maxi (7-13 kg) - 38 unités",
        price: 10.66,
        inStock: true,
        image: "/image/89025.png",
        detailedDescription: "Format Éco Babylino Pants Taille 4 (38 culottes) pour faire des économies au quotidien."
      },
      {
        sku: "89026",
        slug: "babylino-pants-eco-t5-junior-34",
        label: "Format Éco - Taille 5, Junior (10-16 kg) - 34 unités",
        price: 10.66,
        inStock: true,
        image: "/image/89026.png",
        detailedDescription: "Format Éco Babylino Pants Taille 5 (34 unités) combinant praticité et rapport qualité-prix."
      },
      {
        sku: "89027",
        slug: "babylino-pants-eco-t6-xl-31",
        label: "Format Éco - Taille 6, Culotte (13-18 kg) - 31 unités",
        price: 10.66,
        inStock: true,
        image: "/image/89027.png",
        detailedDescription: "Format Éco Babylino Pants Taille 6 (31 unités) avec ceinture douce et élastique."
      },
      {
        sku: "89028",
        slug: "babylino-pants-eco-t7-xl-plus-28",
        label: "Format Éco - Taille 7, Culotte Plus (15-25 kg) - 28 unités",
        price: 10.66,
        inStock: true,
        image: "/image/89028.png",
        detailedDescription: "Format Éco Babylino Pants Taille 7 (28 unités) pour l'apprentissage autonome de la propreté."
      },
      {
        sku: "89069",
        slug: "babylino-pants-eco-t8-xxl-26",
        label: "Format Éco - Taille 8, Culotte (20+ kg) - 26 unités",
        price: 10.66,
        inStock: true,
        image: "/image/89069.png",
        detailedDescription: "Format Éco Babylino Pants Taille 8 (26 unités) adapté aux besoins des enfants de grande taille."
      }
    ]
  },
  {
    id: "babylino-premium",
    name: "Couches & Culottes Babylino Premium",
    category: "bebe",
    subCategory: "Gamme Premium Ultra Soft",
    seoUrl: "/produit/couches/bebe/babylino-premium",
    description: "La nouvelle ligne de très haute gamme Babylino Premium, positionnée sur un niveau supérieur de performance avec la technologie Ultra Soft.",
    features: [
      "Technologie Ultra Soft pour une douceur veloutée",
      "Contrôle des odeurs renforcé et haute performance de nuit",
      "Matériaux 100% recyclables"
    ],
    variants: [
      {
        sku: "82650",
        slug: "babylino-premium-n1-nouveau-ne-68",
        label: "Couches N1 Nouveau-né (2-5 kg) - 68 unités",
        price: 14.41,
        inStock: true,
        image: "/image/82650.png",
        detailedDescription: "Babylino Premium N1 offre une douceur veloutée inédite grâce à la technologie Ultra Soft. Spécialement pensée pour préserver la peau délicate du nouveau-né."
      },
      {
        sku: "82651",
        slug: "babylino-premium-n2-mini-64",
        label: "Couches N2 Mini (3-6 kg) - 64 unités",
        price: 14.41,
        inStock: true,
        image: "/image/82651.png",
        detailedDescription: "Babylino Premium N2 associe un matelas absorbant haut de gamme et un voile ultra-respirant pour un confort absolu au quotidien."
      },
      {
        sku: "82652",
        slug: "babylino-premium-n3-midi-56",
        label: "Couches N3 Midi (4-9 kg) - 56 unités",
        price: 14.92,
        inStock: true,
        image: "/image/82652.png",
        detailedDescription: "Babylino Premium N3 garantit une étanchéité nocturne sans faille et une douceur inégalée."
      },
      {
        sku: "89061",
        slug: "babylino-premium-pants-n4-maxi-38",
        label: "Culotte Pants Maxi N4 (7-13 kg) - 38 unités",
        price: 11.73,
        inStock: true,
        image: "/image/89061.png",
        detailedDescription: "Babylino Premium Pants N4 rassemble la praticité d'une culotte et la qualité supérieure de la gamme Premium Ultra Soft."
      },
      {
        sku: "89062",
        slug: "babylino-premium-pants-n5-junior-34",
        label: "Culotte Pants Junior N5 (10-16 kg) - 34 unités",
        price: 11.73,
        inStock: true,
        image: "/image/89062.png",
        detailedDescription: "Babylino Premium Pants N5 avec ceinture ultra-souple et neutralisation optimale des odeurs."
      },
      {
        sku: "89063",
        slug: "babylino-premium-pants-n6-xl-31",
        label: "Culotte Pants XL N6 (13-18 kg) - 31 unités",
        price: 11.73,
        inStock: true,
        image: "/image/89063.png",
        detailedDescription: "Babylino Premium Pants N6 assurant maintien et liberté de mouvement complète pour l'enfant."
      },
      {
        sku: "89064",
        slug: "babylino-premium-pants-n7-xl-plus-28",
        label: "Culotte Pants XL Plus N7 (15-25 kg) - 28 unités",
        price: 11.73,
        inStock: true,
        image: "/image/89064.png",
        detailedDescription: "Babylino Premium Pants N7 pour une étanchéité renforcée jour et nuit."
      },
      {
        sku: "89065",
        slug: "babylino-premium-pants-n8-xxl-26",
        label: "Culotte Pants XXL N8 (20+ kg) - 26 unités",
        price: 11.73,
        inStock: true,
        image: "/image/89065.png",
        detailedDescription: "Babylino Premium Pants N8 à très haute capacité d'absorption pour les grands enfants."
      }
    ]
  },
  {
    id: "babylino-swim-pants",
    name: "Culottes de Bain Babylino Sensitive (Mer & Piscine)",
    category: "bebe",
    subCategory: "Couches Piscine & Plage",
    seoUrl: "/produit/couches/bebe/babylino-swim-pants",
    description: "Culottes de bain spéciales pour la mer et la piscine qui ne se gonflent pas dans l'eau tout en assurant une sécurité anti-fuites.",
    features: [
      "Ne se gonflent pas dans l'eau",
      "Barrières latérales renforcées",
      "Liberté de mouvement maximale"
    ],
    variants: [
      {
        sku: "89036",
        slug: "babylino-swim-pants-t4-5",
        label: "Taille 4-5 (9-15 kg) - 14 unités",
        price: 5.34,
        inStock: true,
        image: "/image/89036.png",
        detailedDescription: "Culottes de bain jetables Babylino Swim Pants Taille 4-5. Conçues pour ne pas gonfler dans l'eau de mer ou de piscine tout en retenant parfaitement les petits accidents."
      },
      {
        sku: "89038",
        slug: "babylino-swim-pants-t5-6",
        label: "Taille 5-6 (14+ kg) - 14 unités",
        price: 5.34,
        inStock: true,
        image: "/image/89038.png",
        detailedDescription: "Babylino Swim Pants Taille 5-6 avec élastiques doux aux cuisses pour laisser votre enfant nager et s'amuser en toute sérénité."
      }
    ]
  },
  {
    id: "babylino-safe-nights",
    name: "Culottes de Nuit Babylino Safe Nights (Énurésie)",
    category: "bebe",
    subCategory: "Nuit & Énurésie",
    seoUrl: "/produit/couches/bebe/babylino-safe-nights",
    description: "Culottes absorbantes conçues pour les enfants souffrant d'énurésie nocturne, garantissant discrétion, silence et protection jusqu'à 8 heures.",
    features: [
      "Contrôle des odeurs jusqu'à 8 heures",
      "Design ultra-fin, doux et silencieux",
      "Modèles spécifiques Garçon et Fille"
    ],
    variants: [
      {
        sku: "89056",
        slug: "babylino-safe-nights-boy-3-4ans",
        label: "Garçon 3-4 ans (12-22 kg) - 16 unités",
        price: 6.85,
        inStock: true,
        image: "/image/89056.png",
        detailedDescription: "Culottes de nuit Babylino Safe Nights Garçon 3-4 ans. Absorption nocturne renforcée sur la zone avant et motif masculin discret ressemblant à un pyjama."
      },
      {
        sku: "89057",
        slug: "babylino-safe-nights-girl-3-4ans",
        label: "Fille 3-4 ans (12-22 kg) - 16 unités",
        price: 6.85,
        inStock: true,
        image: "/image/89057.png",
        detailedDescription: "Culottes de nuit Babylino Safe Nights Fille 3-4 ans. Matières douces et silencieuses pour garantir un sommeil paisible sans réveil humide."
      },
      {
        sku: "89046",
        slug: "babylino-safe-nights-boy-4-7ans",
        label: "Garçon 4-7 ans (17-30 kg) - 14 unités",
        price: 6.85,
        inStock: true,
        image: "/image/89046.png",
        detailedDescription: "Babylino Safe Nights Garçon 4-7 ans. Équipées d'une barrière anti-fuites 8 heures pour accompagner l'enfant pendant les phases d'énurésie nocturne."
      },
      {
        sku: "89047",
        slug: "babylino-safe-nights-girl-4-7ans",
        label: "Fille 4-7 ans (17-30 kg) - 14 unités",
        price: 6.85,
        inStock: true,
        image: "/image/89047.png",
        detailedDescription: "Babylino Safe Nights Fille 4-7 ans. Coupe ultra-discrète sous le pyjama et système de contrôle efficace des odeurs."
      },
      {
        sku: "89048",
        slug: "babylino-safe-nights-boy-8-13ans",
        label: "Garçon 8-13 ans (30-48 kg) - 14 unités",
        price: 7.34,
        inStock: true,
        image: "/image/89048.png",
        detailedDescription: "Babylino Safe Nights Garçon 8-13 ans. Conçues pour répondre aux besoins d'absorption des grands enfants en toute sécurité."
      },
      {
        sku: "89049",
        slug: "babylino-safe-nights-girl-8-13ans",
        label: "Fille 8-13 ans (30-48 kg) - 14 unités",
        price: 7.34,
        inStock: true,
        image: "/image/89049.png",
        detailedDescription: "Babylino Safe Nights Fille 8-13 ans. Offre une protection maximale et invisible pour redonner confiance à l'enfant à la maison ou lors de sorties."
      },
      {
        sku: "89058",
        slug: "babylino-safe-nights-boy-13plus-ans",
        label: "Garçon 13+ ans (48-60 kg) - 12 unités",
        price: 7.34,
        inStock: true,
        image: "/image/89058.png",
        detailedDescription: "Babylino Safe Nights Garçon 13+ ans. Coupe ado ajustable et haute capacité d'absorption nocturne."
      },
      {
        sku: "89059",
        slug: "babylino-safe-nights-girl-13plus-ans",
        label: "Fille 13+ ans (48-60 kg) - 12 unités",
        price: 7.34,
        inStock: true,
        image: "/image/89059.png",
        detailedDescription: "Babylino Safe Nights Fille 13+ ans. Matériaux fins et hypoallergéniques préservant la peau sensible."
      }
    ]
  },
  {
    id: "salviettine-traverse",
    name: "Lingettes & Alèses de Change Bébé",
    category: "bebe",
    subCategory: "Lingettes & Alèses de Change",
    seoUrl: "/produit/couches/bebe/salviettine-traverse",
    description: "Gamme de lingettes nettoyantes douces (camomille, eau pure, sans parfum ou bio) et alèses jetables pour le change de bébé.",
    features: [
      "Formules haute tolérance cutanée",
      "Options 0% parfum, 100% sans plastique (Natura)",
      "Alèses grand format imperméables 90x60 cm"
    ],
    variants: [
      {
        sku: "07816",
        slug: "lingettes-sensitive-camomille-54",
        label: "Lingettes Sensitive Camomille - 54 unités",
        price: 1.68,
        inStock: true,
        image: "/image/07816.png",
        detailedDescription: "Lingettes nettoyantes Babylino Sensitive enrichies en extraits de Camomille pour apaiser et nettoyer en douceur la peau du siège lors du change."
      },
      {
        sku: "0285",
        slug: "lingettes-sensitive-0-parfum-54",
        label: "Lingettes Sensitive 0% Parfum - 54 unités",
        price: 1.68,
        inStock: true,
        image: "/image/0285.png",
        detailedDescription: "Lingettes Babylino Sensitive 0% parfum spécialement recommandées pour les peaux réactives ou sujettes aux rougeurs."
      },
      {
        sku: "07833",
        slug: "lingettes-babycare-acqua-pure-pocket-2x20",
        label: "Lingettes BabyCare Acqua Pure Pocket - 2x20 unités",
        price: 1.45,
        inStock: true,
        image: "/image/07833.png",
        detailedDescription: "Format de poche pratique BabyCare Acqua Pure (2 paquets de 20 lingettes) composé à 96% d'eau pure pour les nettoyages impromptus en déplacement."
      },
      {
        sku: "15720",
        slug: "lingettes-babycare-aqua-pure-beurre-de-karite-54",
        label: "Lingettes BabyCare Aqua Pure Beurre de Karité - 54 unités",
        price: 1.52,
        inStock: true,
        image: "/image/15720.png",
        detailedDescription: "Lingettes BabyCare Aqua Pure enrichies au Beurre de Karité bio pour hydrater et nourrir la peau délicate des tout-petits."
      },
      {
        sku: "07848",
        slug: "lingettes-babycare-aqua-pure-lavande-72",
        label: "Lingettes BabyCare Aqua Pure Lavande - 72 unités",
        price: 1.68,
        inStock: true,
        image: "/image/07848.png",
        detailedDescription: "Grand paquet de 72 lingettes BabyCare Aqua Pure parfum Lavande apaisante pour un moment de toilette agréable."
      },
      {
        sku: "07820",
        slug: "lingettes-babycare-natura-argan-54",
        label: "Lingettes BabyCare NATURA 100% Sans Plastique (Argan) - 54 unités",
        price: 2.18,
        inStock: true,
        image: "/image/07820.png",
        detailedDescription: "Lingettes écologiques BabyCare NATURA 100% en fibres végétales sans plastique, imprégnées d'huile d'argan bio et biodégradables."
      },
      {
        sku: "83760",
        slug: "aleses-de-change-babylino-90x60-14",
        label: "Alèses de Change Babylino 90x60 cm - 14 unités",
        price: 5.60,
        inStock: true,
        image: "/image/83760.png",
        detailedDescription: "Alèses jetables de change Babylino 90x60 cm. Protègent idéalement la table à langer, le matelas ou les sièges auto lors du change de bébé."
      }
    ]
  }
];