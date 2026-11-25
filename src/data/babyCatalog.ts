export interface ProductVariant {
  sku: string;
  slug: string;
  label: string;
  price: number;
  inStock: boolean;
  image: string;
  detailedDescription: string;
  brand?: string;
}

export interface BabyProduct {
  id: string;
  brand?: string;
  galleryImages?: string[];
  name: string;
  category: string;
  subCategory: string;
  seoUrl: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

const BASE_BABY_CATALOG: BabyProduct[] = [
  {
    id: "babylino-sensitive-normal-pack",
    brand: "Babylino",
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
    brand: "Babylino",
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
    brand: "Babylino",
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
    brand: "Babylino",
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
    brand: "Babylino",
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
    brand: "Babylino",
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
    brand: "Babylino",
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

const ADDITIONAL_BABY_CATALOG: BabyProduct[] = [
  {
    "id": "babycare-lingettes-humides",
    "name": "Lingettes BabyCare Aqua Pure & Natura",
    "brand": "BabyCare",
    "category": "bebe",
    "subCategory": "Lingettes & Alèses de Change",
    "seoUrl": "/produit/couches/bebe/babycare-lingettes-humides",
    "description": "Découvrez les lingettes BabyCare Aqua Pure et Natura, proposées en plusieurs formats et variantes pour la toilette quotidienne de bébé.",
    "features": [
      "Plusieurs formats pour la maison et les déplacements",
      "Variantes Aqua Pure et Natura",
      "Options au beurre de karité, à la lavande et à l’argan"
    ],
    "galleryImages": [],
    "variants": [
      {
        "sku": "07833",
        "slug": "lingettes-babycare-acqua-pure-pocket-2x20",
        "label": "Lingettes BabyCare Acqua Pure Pocket - 2x20 unités",
        "price": 1.45,
        "inStock": true,
        "image": "/image/07833.png",
        "detailedDescription": "Format de poche pratique BabyCare Acqua Pure (2 paquets de 20 lingettes) composé à 96% d'eau pure pour les nettoyages impromptus en déplacement."
      },
      {
        "sku": "15720",
        "slug": "lingettes-babycare-aqua-pure-beurre-de-karite-54",
        "label": "Lingettes BabyCare Aqua Pure Beurre de Karité - 54 unités",
        "price": 1.52,
        "inStock": true,
        "image": "/image/15720.png",
        "detailedDescription": "Lingettes BabyCare Aqua Pure enrichies au Beurre de Karité bio pour hydrater et nourrir la peau délicate des tout-petits."
      },
      {
        "sku": "07848",
        "slug": "lingettes-babycare-aqua-pure-lavande-72",
        "label": "Lingettes BabyCare Aqua Pure Lavande - 72 unités",
        "price": 1.68,
        "inStock": true,
        "image": "/image/07848.png",
        "detailedDescription": "Grand paquet de 72 lingettes BabyCare Aqua Pure parfum Lavande apaisante pour un moment de toilette agréable."
      },
      {
        "sku": "07820",
        "slug": "lingettes-babycare-natura-argan-54",
        "label": "Lingettes BabyCare NATURA 100% Sans Plastique (Argan) - 54 unités",
        "price": 2.18,
        "inStock": true,
        "image": "/image/07820.png",
        "detailedDescription": "Lingettes écologiques BabyCare NATURA 100% en fibres végétales sans plastique, imprégnées d'huile d'argan bio et biodégradables."
      }
    ]
  },
  {
    "id": "pingo-couches-ecologiques",
    "name": "Couches Écologiques Pingo (Qualité Suisse)",
    "brand": "Pingo",
    "category": "bebe",
    "subCategory": "Couches Écologiques & Naturelles",
    "seoUrl": "/produit/couches/bebe/pingo-couches-ecologiques",
    "description": "Couches écologiques fabriquées en Suisse offrant jusqu'à 12 heures de sécheresse jour et nuit. Cellulose certifiée FSC blanchie sans chlore (TCF), sans parfum, lotion, colorant ni latex.",
    "features": [
      "Fabriquées en Suisse avec cellulose certifiée FSC®",
      "Blanchiment 100% sans chlore (TCF) & 0% parfum, lotion, latex",
      "Jusqu'à 12h d'absorption avec doubles barrières anti-fuites",
      "Production neutre pour le climat (électricité verte & myclimate)"
    ],
    "galleryImages": [],
    "variants": [
      {
        "sku": "0413-00",
        "slug": "pingo-n1-new-born-27",
        "label": "Taille 1, New Born (2-5 kg) - 27 unités",
        "price": 5.46,
        "inStock": true,
        "image": "/image/pingo1.png",
        "detailedDescription": "Couches Pingo N°1 New Born (2-5 kg) en sachet de 27 unités. Dotées d'une découpe ombilicale protectrice et d'un indicateur d'humidité pratique pour les premiers jours de bébé."
      },
      {
        "sku": "0420-00",
        "slug": "pingo-n2-mini-42",
        "label": "Taille 2, Mini (3-6 kg) - 42 unités",
        "price": 7.98,
        "inStock": true,
        "image": "/image/pingo2.png",
        "detailedDescription": "Couches Pingo N°2 Mini (3-6 kg) en sachet de 42 unités. Équipées d'un indicateur d'humidité et d'un voile extérieur respirant doux pour les peaux sensibles."
      },
      {
        "sku": "0437-00",
        "slug": "pingo-n3-midi-44",
        "label": "Taille 3, Midi (4-9 kg) - 44 unités",
        "price": 10.23,
        "inStock": true,
        "image": "/image/pingo3.png",
        "detailedDescription": "Couches Pingo N°3 Midi (4-9 kg) en sachet de 44 unités. Noyau ultra-absorbant assurant jusqu'à 12 heures au sec avec ailes latérales extensibles et attaches velcro flexibles."
      },
      {
        "sku": "0444-00",
        "slug": "pingo-n4-maxi-40",
        "label": "Taille 4, Maxi (8-14 kg) - 40 unités",
        "price": 10.13,
        "inStock": true,
        "image": "/image/pingo4.png",
        "detailedDescription": "Couches Pingo N°4 Maxi (8-14 kg) en sachet de 40 unités. Doubles barrières anti-fuites et poignets élastiques aux jambes pour accompagner les mouvements de bébé."
      },
      {
        "sku": "0451-00",
        "slug": "pingo-n5-junior-36",
        "label": "Taille 5, Junior (11-16 kg) - 36 unités",
        "price": 10.53,
        "inStock": true,
        "image": "/image/pingo5.png",
        "detailedDescription": "Couches Pingo N°5 Junior (11-16 kg) en sachet de 36 unités. Conception anatomique fine et respirante certifiée sans substances nocives ni allergènes."
      },
      {
        "sku": "0468-00",
        "slug": "pingo-n6-xl-32",
        "label": "Taille 6, XL (13-18 kg) - 32 unités",
        "price": 10.05,
        "inStock": true,
        "image": "/image/pingo6.png",
        "detailedDescription": "Couches Pingo N°6 XL (13-18 kg) en sachet de 32 unités. Haute capacité de rétention de jour comme de nuit tout en préservant l'épiderme sensible."
      },
      {
        "sku": "0475-00",
        "slug": "pingo-n7-xxl-30",
        "label": "Taille 7, XXL (15+ kg) - 30 unités",
        "price": 11.5,
        "inStock": true,
        "image": "/image/pingo7.png",
        "detailedDescription": "Couches Pingo N°7 XXL (15+ kg) en sachet de 30 unités. Format grande taille offrant une protection nocturne maximale et un maintien sûr sans compression."
      }
    ]
  },
  {
    "id": "pingo-wet-wipes",
    "name": "Lingettes Humides Écologiques Pingo Wet Wipes",
    "brand": "Pingo",
    "category": "bebe",
    "subCategory": "Lingettes & Alèses de Change",
    "seoUrl": "/produit/couches/bebe/pingo-wet-wipes",
    "description": "Lingettes nettoyantes douces et écologiques Pingo Wet Wipes pour la toilette quotidienne de bébé, sans parfum, sans parabène et testées dermatologiquement.",
    "features": [
      "Formule douce sans parfum ni colorant",
      "Testé dermatologiquement pour peaux sensibles",
      "Tissu résistant et ultra-doux"
    ],
    "galleryImages": [],
    "variants": [
      {
        "sku": "0802-03",
        "slug": "pingo-wet-wipes-80",
        "label": "Pingo Wet Wipes - 80 unités",
        "price": 1.78,
        "inStock": true,
        "image": "/image/pingo8.png",
        "detailedDescription": "Sachet de 80 lingettes humides Pingo Wet Wipes. Nettoient en douceur le siège, le visage et les mains de bébé sans irriter les peaux réactives."
      }
    ]
  },
  {
    "id": "pampers-baby-dry",
    "name": "Couches Pampers Baby-Dry",
    "brand": "Pampers",
    "category": "bebe",
    "subCategory": "Couches Classiques",
    "seoUrl": "/produit/couches/bebe/pampers-baby-dry",
    "description": "Les couches Pampers Baby-Dry offrent jusqu'à 12 heures de protection intégrale contre les fuites de jour comme de nuit grâce à leur technologie Triple Protection : un cœur super-absorbant qui capture instantanément l'humidité, une poche Stop & Protect à l'arrière pour éviter les débordements dans le dos et des doubles barrières anti-fuites autour des cuisses. Testées dermatologiquement et certifiées Standard 100 par OEKO-TEX, elles gardent la peau de bébé bien au sec au quotidien.",
    "features": [
      "Triple Protection jusqu'à 12h au sec de jour comme de nuit",
      "Poche Stop & Protect anti-fuites à l'arrière contre les débordements",
      "Cœur super-absorbant à capture instantanée + voile respirant",
      "Attaches latérales extensibles et doubles barrières souples aux jambes",
      "Testées dermatologiquement, certifiées OEKO-TEX Standard 100 sans allergènes de parfum"
    ],
    "galleryImages": [
      "/image/reviewbabydry1.png",
      "/image/reviewbabydry2.png",
      "/image/reviewbabydry3.png",
      "/image/reviewbabydry4.png",
      "/image/reviewbabydry5.png",
      "/image/reviewbabydry6.png",
      "/image/reviewbabydry7.png",
      "/image/reviewbabydry8.png"
    ],
    "variants": [
      {
        "sku": "8006540715659",
        "slug": "pampers-baby-dry-t2-58",
        "label": "Taille 2, Mini (4-8 kg) - 58 unités",
        "price": 35.78,
        "inStock": true,
        "image": "/image/babydry2.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 2 Mini (4-8 kg) en paquet de 58 unités. Conçues pour accompagner bébé au quotidien dès les premiers mois avec un voile supérieur ComfortTouch ultra-doux et respirant qui laisse circuler l'air. Leur technologie Triple Protection répartit uniformément l'humidité, tandis que la poche Stop & Protect arrière et les doubles barrières aux jambes garantissent jusqu'à 12 heures au sec de jour comme de nuit (certifiées OEKO-TEX Standard 100)."
      },
      {
        "sku": "8006540785003",
        "slug": "pampers-baby-dry-t3-222",
        "label": "Taille 3, Midi (6-10 kg) - 222 unités",
        "price": 30.78,
        "inStock": true,
        "image": "/image/babydry3.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 3 Midi (6-10 kg) en Pack 1 Mois de 222 unités. Équipées de la poche arrière Stop & Protect contre les débordements et d'attaches latérales flexibles qui suivent chaque mouvement de bébé en journée comme pendant le sommeil. Le cœur super-absorbant verrouille rapidement les liquides loin de la peau sensible pour prévenir les rougeurs tout en assurant jusqu'à 12 heures de sécheresse continue."
      },
      {
        "sku": "8006540785034",
        "slug": "pampers-baby-dry-t4-204",
        "label": "Taille 4, Maxi (9-14 kg) - 204 unités",
        "price": 38.78,
        "inStock": true,
        "image": "/image/babydry4_1.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 4 Maxi (9-14 kg) en Pack 1 Mois de 204 unités. Idéales pour les bébés actifs qui commencent à ramper, jouer et marcher : leurs doubles barrières anti-fuites épousent délicatement le contour des jambes sans serrer tandis que la technologie Triple Protection et la poche arrière Stop & Protect assurent jusqu'à 12 heures de maintien au sec continu de jour comme de nuit."
      },
      {
        "sku": "8006540785065",
        "slug": "pampers-baby-dry-t4-plus-198",
        "label": "Taille 4+, Maxi Plus (10-15 kg) - 198 unités",
        "price": 42.45,
        "inStock": true,
        "image": "/image/babydry4_2.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 4+ Maxi Plus (10-15 kg) en Pack 1 Mois de 198 unités avec capacité d'absorption renforcée. Spécialement pensées pour les bébés entre deux tailles ou ayant besoin d'une rétention accrue en journée comme pour de longues nuits complètes. Dotées du cœur super-absorbant, de la poche Stop & Protect arrière et d'attaches latérales extensibles (certifiées OEKO-TEX Standard 100, 0% allergènes de parfum UE)."
      },
      {
        "sku": "8006540785089",
        "slug": "pampers-baby-dry-t5-174",
        "label": "Taille 5, Junior (11-16 kg) - 174 unités",
        "price": 35.75,
        "inStock": true,
        "image": "/image/babydry5_1.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 5 Junior (11-16 kg) en Pack 1 Mois de 174 unités. Dotées d'une absorption haute performance adaptée au rythme quotidien des grands bébés, avec ceinture souple extensible, voile micro-aéré respirant et poche arrière Stop & Protect pour bloquer efficacement toute fuite en mouvement comme en position allongée. Testées dermatologiquement et certifiées OEKO-TEX Standard 100."
      },
      {
        "sku": "8006540785119",
        "slug": "pampers-baby-dry-t5-plus-168",
        "label": "Taille 5+, Junior Plus (12-17 kg) - 168 unités",
        "price": 37.99,
        "inStock": true,
        "image": "/image/babydry5_2.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 5+ Junior Plus (12-17 kg) en Pack 1 Mois de 168 unités avec cœur extra-absorbant. Conçues pour les jeunes enfants de 12 à 17 kg nécessitant une absorption supplémentaire sans passer à la taille supérieure. Leurs doubles barrières aux jambes, leur poche arrière Stop & Protect et leur voile doux gardent la peau bien au sec jusqu'à 12 heures de jour comme de nuit."
      },
      {
        "sku": "8006540785133",
        "slug": "pampers-baby-dry-t6-148",
        "label": "Taille 6, Extra Large (13-18 kg) - 148 unités",
        "price": 38.78,
        "inStock": true,
        "image": "/image/babydry6_1.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 6 Extra Large (13-18 kg) en Pack 1 Mois de 148 unités. Offrent une couverture maximale et un maintien sûr aux enfants de 13 à 18 kg grâce à leurs attaches résistantes repositionnables, leur voile micro-aéré respirant et leur cœur ultra-absorbant à capture instantanée garantissant jusqu'à 12 heures de protection au quotidien (certifiées OEKO-TEX Standard 100, sans allergènes de parfum UE)."
      },
      {
        "sku": "B0CW6BQLJY",
        "slug": "pampers-baby-dry-t6-plus-144",
        "label": "Taille 6+, Extra Large Plus (14-19 kg) - 144 unités",
        "price": 45.98,
        "inStock": true,
        "image": "/image/babydry6_2.png",
        "detailedDescription": "Couches Pampers Baby-Dry Taille 6+ Extra Large Plus (14-19 kg) en Pack 1 Mois de 144 unités avec absorption renforcée à l'arrière et au centre. Adaptées aux grands enfants de 14 à 19 kg de jour comme de nuit, elles combinent une poche Stop & Protect anti-fuites, des doubles barrières souples aux cuisses et des attaches extensibles confortables pour rester jusqu'à 12 heures au sec en toute liberté de mouvement."
      }
    ]
  },
  {
    "id": "pampers-premium-protection",
    "name": "Couches Pampers Premium Protection",
    "brand": "Pampers",
    "category": "bebe",
    "subCategory": "Couches Premium & Peaux Sensibles",
    "seoUrl": "/produit/couches/bebe/pampers-premium-protection",
    "description": "Les couches Pampers Premium Protection offrent confort et protection aux peaux sensibles de bébé, de jour comme de nuit. Dotées du voile DermaComfort ultra-doux avec micro-aérations, d'un cœur absorbant à capture rapide et de la poche arrière Stop & Protect contre les fuites, elles sont testées dermatologiquement, certifiées OEKO-TEX Standard 100 et formulées avec 0% d'allergènes de parfum listés par l'UE.",
    "features": [
      "Voile DermaComfort ultra-doux éloignant rapidement humidité et selles molles",
      "Protection jour & nuit jusqu'à 12h avec poche arrière Stop & Protect anti-fuites",
      "Micro-aérations respirantes respectueuses des peaux sensibles",
      "Doubles barrières aux jambes et attaches latérales extensibles confortables",
      "Testées dermatologiquement, certifiées OEKO-TEX Standard 100 & 0% allergènes de parfum UE"
    ],
    "galleryImages": [
      "/image/reviewpremiumprotection1.png",
      "/image/reviewpremiumprotection2.png",
      "/image/reviewpremiumprotection3.png",
      "/image/reviewpremiumprotection4.png",
      "/image/reviewpremiumprotection5.png",
      "/image/reviewpremiumprotection6.png",
      "/image/reviewpremiumprotection7.png",
      "/image/reviewpremiumprotection8.png",
      "/image/reviewpremiumprotection9.png",
      "/image/reviewpremiumprotection10.png"
    ],
    "variants": [
      {
        "sku": "PAM-PP-T0-30",
        "slug": "pampers-premium-protection-t0-30",
        "label": "Taille 0, Préma / Nouveau-né (< 3 kg) - 30 unités",
        "price": 5.98,
        "inStock": true,
        "image": "/image/premiumprotection0.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 0 (moins de 3 kg) en paquet de 30 unités. Spécialement conçues pour les tout-petits de faible poids de naissance avec un voile supérieur DermaComfort ultra-doux et respirant qui éloigne immédiatement l'humidité et les selles molles. Dotées d'une découpe adaptée au cordon ombilical, d'un indicateur d'humidité pratique et de matières certifiées OEKO-TEX Standard 100, sans allergènes de parfum listés par l'UE, pour un usage fiable de jour comme de nuit."
      },
      {
        "sku": "PAM-PP-T1-180",
        "slug": "pampers-premium-protection-t1-180",
        "label": "Taille 1, New Born (2-5 kg) - 180 unités",
        "price": 15.2,
        "inStock": true,
        "image": "/image/premiumprotection1.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 1 New Born (2-5 kg) en Pack 1 Mois de 180 unités. Pensées pour la peau délicate des nouveau-nés de jour comme de nuit, elles combinent le voile DermaComfort avec micro-aérations, un cœur absorbant à capture rapide, une découpe cordon ombilical et un indicateur d'humidité. Testées dermatologiquement et certifiées OEKO-TEX Standard 100, 0% d'allergènes de parfum listés par l'UE."
      },
      {
        "sku": "PAM-PP-T2-240",
        "slug": "pampers-premium-protection-t2-240",
        "label": "Taille 2, Mini (4-8 kg) - 240 unités",
        "price": 32.89,
        "inStock": true,
        "image": "/image/premiumprotection2.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 2 Mini (4-8 kg) en Pack 1 Mois de 240 unités. Équipées du voile DermaComfort ultra-doux, de la poche arrière Stop & Protect contre les débordements dans le dos et de doubles barrières souples aux cuisses. Assurent jusqu'à 12 heures de protection intégrale de jour comme de nuit tout en laissant respirer la peau grâce à leurs micro-aérations (certifiées OEKO-TEX Standard 100)."
      },
      {
        "sku": "PAM-PP-T3-204",
        "slug": "pampers-premium-protection-t3-204",
        "label": "Taille 3, Midi (6-10 kg) - 204 unités",
        "price": 23.87,
        "inStock": true,
        "image": "/image/premiumprotection3.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 3 Midi (6-10 kg) en Pack 1 Mois de 204 unités. Idéales pour accompagner les bébés de 6 à 10 kg au quotidien avec un cœur absorbant haute performance, une poche Stop & Protect à l'arrière et des attaches latérales extensibles douces qui s'adaptent sans marquer le ventre. Testées dermatologiquement, certifiées OEKO-TEX Standard 100 et dotées d'un indicateur d'humidité."
      },
      {
        "sku": "PAM-PP-T4-174",
        "slug": "pampers-premium-protection-t4-174",
        "label": "Taille 4, Maxi (9-14 kg) - 174 unités",
        "price": 23.87,
        "inStock": true,
        "image": "/image/premiumprotection4.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 4 Maxi (9-14 kg) en Pack 1 Mois de 174 unités. Conçues pour les bébés actifs de 9 à 14 kg qui bougent et explorent de jour comme de nuit : elles associent des micro-aérations respirantes, le voile DermaComfort, des doubles barrières aux jambes et la poche arrière Stop & Protect pour maintenir la peau au sec jusqu'à 12 heures."
      },
      {
        "sku": "PAM-PP-T5-152",
        "slug": "pampers-premium-protection-t5-152",
        "label": "Taille 5, Junior (11-16 kg) - 152 unités",
        "price": 23.87,
        "inStock": true,
        "image": "/image/premiumprotection5.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 5 Junior (11-16 kg) en Pack 1 Mois de 152 unités. Offrent un maintien confortable et une absorption renforcée aux enfants de 11 à 16 kg en mouvement. Leurs attaches latérales extensibles, leurs doubles barrières anti-fuites et leur poche Stop & Protect arrière assurent jusqu'à 12 heures de protection fiable de jour comme de nuit (certifiées OEKO-TEX Standard 100)."
      },
      {
        "sku": "PAM-PP-T6-132",
        "slug": "pampers-premium-protection-t6-132",
        "label": "Taille 6, Extra Large (13-18 kg) - 132 unités",
        "price": 23.87,
        "inStock": true,
        "image": "/image/premiumprotection6.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 6 Extra Large (13-18 kg) en Pack 1 Mois de 132 unités. Adaptées aux grands bébés de 13 à 18 kg de jour comme de nuit avec un voile DermaComfort doux, des canaux absorbants et une poche Stop & Protect à l'arrière. Maintiennent la peau sèche et aérée sans allergènes de parfum listés par l'UE."
      },
      {
        "sku": "PAM-PP-T7-128",
        "slug": "pampers-premium-protection-t7-128",
        "label": "Taille 7, XXL (15+ kg) - 128 unités",
        "price": 30.45,
        "inStock": true,
        "image": "/image/premiumprotection7.png",
        "detailedDescription": "Couches Pampers Premium Protection Taille 7 XXL (15+ kg) en Pack 1 Mois de 128 unités. Grande taille offrant une couvrance étendue et une capacité d'absorption élevée pour les enfants de 15 kg et plus. Dotées de la poche Stop & Protect arrière, d'attaches souples extensibles et du voile DermaComfort respirant pour une protection efficace de jour comme de nuit (certifiées OEKO-TEX Standard 100)."
      }
    ]
  },
  {
    "id": "pampers-harmonie",
    "name": "Couches Pampers Harmonie",
    "brand": "Pampers",
    "category": "bebe",
    "subCategory": "Couches Écologiques & Hypoallergéniques",
    "seoUrl": "/produit/couches/bebe/pampers-harmonie",
    "description": "Les couches Pampers Harmonie sont hypoallergéniques, testées dermatologiquement et élaborées avec des ingrédients d'origine végétale doux (dont du coton de haute qualité) ainsi que de la cellulose issue de sources gérées responsablement. Formulées avec 0% parfum, 0% lotion et sans blanchiment au chlore élémentaire, elles sont certifiées Standard 100 par OEKO-TEX et offrent jusqu'à 12 heures de protection au sec de jour comme de nuit.",
    "features": [
      "Hypoallergéniques, 0% parfum, 0% lotion et sans blanchiment au chlore élémentaire",
      "Fabriquées avec des ingrédients d'origine végétale doux dont du coton de haute qualité",
      "Jusqu'à 12h au sec de jour comme de nuit avec indicateur d'humidité pratique",
      "Cellulose issue de forêts gérées responsablement (certifiée FSC / PEFC)",
      "Testées dermatologiquement et certifiées Standard 100 par OEKO-TEX"
    ],
    "galleryImages": [
      "/image/reviewharmonie1.png",
      "/image/reviewharmonie2.png",
      "/image/reviewharmonie3.png",
      "/image/reviewharmonie4.png",
      "/image/reviewharmonie5.png",
      "/image/reviewharmonie6.png",
      "/image/reviewharmonie7.png",
      "/image/reviewharmonie8.png"
    ],
    "variants": [
      {
        "sku": "PAM-HAR-T1-180",
        "slug": "pampers-harmonie-t1-180",
        "label": "Taille 1, New Baby (2-5 kg) - 180 unités",
        "price": 19.2,
        "inStock": true,
        "image": "/image/harmonie1.png",
        "detailedDescription": "Couches Pampers Harmonie New Baby Taille 1 (2-5 kg) en Pack 1 Mois de 180 unités. Fabriquées avec des ingrédients d'origine végétale doux (dont du coton de haute qualité) et de la cellulose issue de sources gérées responsablement. Hypoallergéniques, testées dermatologiquement, certifiées OEKO-TEX Standard 100 et garanties 0% parfum, 0% lotion et sans blanchiment au chlore élémentaire. Dotées d'un indicateur d'humidité et d'une absorption fiable jusqu'à 12 heures de jour comme de nuit."
      },
      {
        "sku": "PAM-HAR-T2-204",
        "slug": "pampers-harmonie-t2-204",
        "label": "Taille 2, New Baby (4-8 kg) - 204 unités",
        "price": 20.8,
        "inStock": true,
        "image": "/image/harmonie2.png",
        "detailedDescription": "Couches Pampers Harmonie New Baby Taille 2 (4-8 kg) en Pack 1 Mois de 204 unités. Conçues pour respecter la peau délicate des bébés de 4 à 8 kg grâce à un voile supérieur doux enrichi en ingrédients d'origine végétale, un cœur absorbant en cellulose certifiée et des matières respirantes. Hypoallergéniques et certifiées OEKO-TEX Standard 100, elles offrent jusqu'à 12 heures au sec de jour comme de nuit avec indicateur d'urine pratique."
      },
      {
        "sku": "PAM-HAR-T3-156",
        "slug": "pampers-harmonie-t3-156",
        "label": "Taille 3, Midi (6-10 kg) - 156 unités",
        "price": 15.25,
        "inStock": true,
        "image": "/image/harmonie3.png",
        "detailedDescription": "Couches Pampers Harmonie Taille 3 Midi (6-10 kg) en Pack 1 Mois de 156 unités. Idéales pour accompagner les bébés de 6 à 10 kg au quotidien avec une protection hypoallergénique testée dermatologiquement, 0% parfum et 0% lotion. Leur cœur absorbant capture rapidement l'humidité pour garder la peau sèche jusqu'à 12 heures de jour comme de nuit, tandis que les attaches extensibles assurent un maintien confortable en mouvement."
      },
      {
        "sku": "PAM-HAR-T4-140",
        "slug": "pampers-harmonie-t4-140",
        "label": "Taille 4, Maxi (9-14 kg) - 140 unités",
        "price": 15.25,
        "inStock": true,
        "image": "/image/harmonie4.png",
        "detailedDescription": "Couches Pampers Harmonie Taille 4 Maxi (9-14 kg) en Pack 1 Mois de 140 unités. Pensées pour les bébés actifs de 9 à 14 kg qui rampent et marchent : elles associent des matières douces d'origine végétale, des doubles barrières anti-fuites souples aux jambes et un cœur ultra-absorbant en cellulose responsable. Certifiées OEKO-TEX Standard 100 et hypoallergéniques, pour jusqu'à 12 heures de protection jour et nuit."
      },
      {
        "sku": "PAM-HAR-T5-124",
        "slug": "pampers-harmonie-t5-124",
        "label": "Taille 5, Junior (11-16 kg) - 124 unités",
        "price": 15.25,
        "inStock": true,
        "image": "/image/harmonie5.png",
        "detailedDescription": "Couches Pampers Harmonie Taille 5 Junior (11-16 kg) en Pack 1 Mois de 124 unités. Offrent une absorption renforcée et un confort naturel aux enfants de 11 à 16 kg grâce à leur voile respirant contenant du coton de haute qualité, sans parfum ni lotion ajoutés. Testées dermatologiquement et certifiées OEKO-TEX Standard 100, elles maintiennent la peau bien au sec jusqu'à 12 heures de jour comme de nuit."
      },
      {
        "sku": "PAM-HAR-T6-120",
        "slug": "pampers-harmonie-t6-120",
        "label": "Taille 6, Extra Large (13+ kg) - 120 unités",
        "price": 15.25,
        "inStock": true,
        "image": "/image/harmonie6.png",
        "detailedDescription": "Couches Pampers Harmonie Taille 6 Extra Large (13+ kg) en Pack 1 Mois de 120 unités. Adaptées aux grands bébés de 13 kg et plus nécessitant une rétention optimale au quotidien sans substances indésirables. Hypoallergéniques, certifiées OEKO-TEX Standard 100, 0% parfum et 0% lotion, avec attaches extensibles résistantes et cœur absorbant performant assurant jusqu'à 12 heures au sec de jour comme de nuit."
      }
    ]
  },
  {
    "id": "lotus-baby-douceur-confort",
    "name": "Couches Lotus Baby Douceur & Confort",
    "brand": "Lotus Baby",
    "category": "bebe",
    "subCategory": "Couches Écologiques & Peaux Sensibles",
    "seoUrl": "/produit/couches/bebe/lotus-baby-douceur-confort",
    "description": "Les couches Lotus Baby Douceur & Confort associent douceur extrême, maintien souple et haute absorption pour protéger la peau sensible de bébé jusqu'à 12 heures de jour comme de nuit. Certifiées Écolabel Européen et testées dermatologiquement, elles sont garanties 0% parfum, 0% lotion, sans allergènes ni blanchiment au chlore.",
    "features": [
      "Jusqu'à 12h au sec de jour comme de nuit grâce aux canaux absorbants",
      "Matières ultra-douces et respirantes avec attaches latérales souples et extensibles",
      "0% parfum, 0% lotion, 0% allergènes et sans blanchiment au chlore",
      "Indicateur d'humidité pratique et doubles barrières anti-fuites efficaces",
      "Certifiées Écolabel Européen et testées sous contrôle dermatologique"
    ],
    "galleryImages": [
      "/image/reviewlotusbabydouceur1.png",
      "/image/reviewlotusbabydouceur2.png",
      "/image/reviewlotusbabydouceur3.png",
      "/image/reviewlotusbabydouceur4.png"
    ],
    "variants": [
      {
        "sku": "LOT-DC-T1-80",
        "slug": "lotus-baby-douceur-confort-t1-80",
        "label": "Taille 1, Nouveau-né (2-5 kg) - 80 unités",
        "price": 5.28,
        "inStock": true,
        "image": "/image/lotusbabydouceur1.png",
        "detailedDescription": "Couches Lotus Baby Douceur & Confort Taille 1 (2-5 kg) en Pack 1 Mois de 80 unités. Conçues pour la peau délicate des nouveau-nés avec des matières ultra-douces et respirantes, 0% lotion, 0% parfum et sans blanchiment au chlore. Certifiées Écolabel Européen, testées sous contrôle dermatologique et dotées d'un indicateur d'humidité pratique ainsi que de canaux absorbants offrant jusqu'à 12 heures de protection au sec de jour comme de nuit."
      },
      {
        "sku": "LOT-DC-T2-180",
        "slug": "lotus-baby-douceur-confort-t2-180",
        "label": "Taille 2, Mini (3-6 kg) - 180 unités",
        "price": 12.28,
        "inStock": true,
        "image": "/image/lotusbabydouceur2.png",
        "detailedDescription": "Couches Lotus Baby Douceur & Confort Taille 2 (3-6 kg) en Pack 1 Mois de 180 unités. Idéales pour accompagner bébé au quotidien avec un ajustement souple et confortable, des barrières anti-fuites efficaces et un cœur absorbant à répartition rapide qui garde la peau bien au sec jusqu'à 12 heures de jour comme de nuit. Garanties 0% parfum, 0% lotion et certifiées Écolabel Européen."
      },
      {
        "sku": "LOT-DC-T3-172",
        "slug": "lotus-baby-douceur-confort-t3-172",
        "label": "Taille 3, Midi (5-9 kg) - 172 unités",
        "price": 12.28,
        "inStock": true,
        "image": "/image/lotusbabydouceur3.png",
        "detailedDescription": "Couches Lotus Baby Douceur & Confort Taille 3 (5-9 kg) en Pack 1 Mois de 172 unités. Pensées pour les bébés de 5 à 9 kg qui gagnent en mobilité : leurs attaches latérales extensibles et leur maintien souple accompagnent chaque mouvement sans serrer, tandis que les canaux absorbants assurent jusqu'à 12 heures au sec de jour comme de nuit. Testées dermatologiquement, 0% parfum et certifiées Écolabel Européen."
      },
      {
        "sku": "LOT-DC-T4-148",
        "slug": "lotus-baby-douceur-confort-t4-148",
        "label": "Taille 4, Maxi (7-12 kg) - 148 unités",
        "price": 12.28,
        "inStock": true,
        "image": "/image/lotusbabydouceur4.png",
        "detailedDescription": "Couches Lotus Baby Douceur & Confort Taille 4 (7-12 kg) en Pack 1 Mois de 148 unités. Adaptées aux bébés actifs de 7 à 12 kg avec une capacité d'absorption haute performance, des doubles barrières anti-fuites et un voile intérieur ultra-doux respectueux des peaux sensibles. Certifiées Écolabel Européen, 0% parfum, 0% lotion, pour une protection fiable jusqu'à 12 heures de jour comme de nuit."
      }
    ]
  }
];

export const BABY_CATALOG: BabyProduct[] = [
  ...BASE_BABY_CATALOG,
  ...ADDITIONAL_BABY_CATALOG,
];
