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

export interface AdultProduct {
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

const BASE_ADULT_CATALOG: AdultProduct[] = [
  {
    id: "iasi-donna-assorbenti",
    brand: "IASI",
    name: "Protections Anatomiques Femme IASI Discreet LADY",
    category: "adulte",
    subCategory: "Protections Incontinence Femme",
    seoUrl: "/produit/incontinence-adultes/iasi-donna-assorbenti",
    description: "Protections anatomiques légères à modérées spécialement conçues pour l'anatomie féminine, offrant absorption rapide et discrétion absolue.",
    features: [
      "Système de neutralisation des odeurs",
      "Forme anatomique discrète et confortable",
      "Voile hypoallergénique testé dermatologiquement"
    ],
    variants: [
      {
        sku: "86522",
        slug: "iasi-discreet-lady-extra",
        label: "Extra - 10 unités",
        price: 3.96,
        inStock: true,
        image: "/image/86522.png",
        detailedDescription: "Protections anatomiques IASI Discreet LADY Extra conçues pour offrir une sécurité renforcée contre les fuites légères à modérées. Leur cœur absorbant capture immédiatement le liquide tout en neutralisant les odeurs jusqu'à 8 heures."
      },
      {
        sku: "86523",
        slug: "iasi-discreet-lady-super",
        label: "Super - 10 unités",
        price: 3.48,
        inStock: true,
        image: "/image/86523.png",
        detailedDescription: "Les protections IASI Discreet LADY Super offrent une excellente capacité d'absorption pour les fuites plus prononcées. Leur forme anatomique s'adapte parfaitement aux sous-vêtements pour une discrétion totale sous les vêtements."
      },
      {
        sku: "86524",
        slug: "iasi-discreet-lady-extra-large-xl",
        label: "Extra Large (XL) - 10 unités",
        price: 3.96,
        inStock: true,
        image: "/image/86524.png",
        detailedDescription: "Protection maximale IASI Discreet LADY XL avec une surface couvrante élargie. Idéale pour les besoins d'absorption élevée pendant la journée ou la nuit, sans faire de compromis sur le confort."
      }
    ]
  },
  {
    id: "iasi-pants-lady",
    brand: "IASI",
    name: "Culottes Absorbantes Femme IASI Pants LADY",
    category: "adulte",
    subCategory: "Culottes Absorbantes Femme (Pants)",
    seoUrl: "/produit/incontinence-adultes/iasi-pants-lady",
    description: "Culottes absorbantes jetables pour femmes pour pertes urinaires modérées à fortes. S'enfilent comme un sous-vêtement classique.",
    features: [
      "Élasticité et maintien spécial morphologie féminine",
      "Protection contre les fuites jour et nuit",
      "Discrétion et toucher coton"
    ],
    variants: [
      {
        sku: "86894",
        slug: "iasi-pants-lady-small",
        label: "Taille S (Small) - 12 unités",
        price: 6.99,
        inStock: true,
        image: "/image/86894.png",
        detailedDescription: "Culottes absorbantes IASI Pants LADY Taille S ajustées à la morphologie féminine. Conçues avec un voile toucher coton ultra-doux et la technologie Comfi-Fit pour un confort invisible tout au long de la journée."
      },
      {
        sku: "86895",
        slug: "iasi-pants-lady-medium",
        label: "Taille M (Medium) - 12 unités",
        price: 8.09,
        inStock: true,
        image: "/image/86895.png",
        detailedDescription: "Les culottes absorbantes IASI Pants LADY Taille M s'enfilent facilement comme un sous-vêtement ordinaire. Leur barrière anti-fuites et leur contrôle actif des odeurs garantissent une liberté de mouvement et une sérénité quotidiennes."
      },
      {
        sku: "86896",
        slug: "iasi-pants-lady-large",
        label: "Taille L (Large) - 12 unités",
        price: 8.89,
        inStock: true,
        image: "/image/86896.png",
        detailedDescription: "IASI Pants LADY Taille L offre une protection intégrale et hautement absorbante pour les femmes ayant des fuites urinaires modérées à fortes. Élastiques souples et maintien parfait sans compression."
      }
    ]
  },
  {
    id: "iasi-pants-men",
    brand: "IASI",
    name: "Culottes Absorbantes Homme IASI Pants MEN",
    category: "adulte",
    subCategory: "Culottes Absorbantes Homme (Pants)",
    seoUrl: "/produit/incontinence-adultes/iasi-pants-men",
    description: "Sous-vêtements absorbants masculins adaptés aux fuites urinaires modérées à sévères, couleur sombre et coupe ergonomique.",
    features: [
      "Design masculin et discret",
      "Zone d'absorption ciblée sur l'avant",
      "Barrières anti-fuites souples"
    ],
    variants: [
      {
        sku: "86897",
        slug: "iasi-pants-men-medium",
        label: "Taille M (Medium) - 12 unités",
        price: 8.09,
        inStock: true,
        image: "/image/86897.png",
        detailedDescription: "Conçues spécifiquement pour l'anatomie masculine, les culottes absorbantes Iasi Pants Men Taille M offrent une discrétion absolue avec leur teinte masculine et leur coussin d'absorption frontal ciblé."
      },
      {
        sku: "86898",
        slug: "iasi-pants-men-large",
        label: "Taille L (Large) - 12 unités",
        price: 8.89,
        inStock: true,
        image: "/image/86898.png",
        detailedDescription: "Culottes absorbantes Iasi Pants Men Taille L offrant un maintien ergonomique et une protection optimale contre les fuites modérées à sévères. Équipées de la technologie Odour Control pour une fraîcheur 8h."
      }
    ]
  },
  {
    id: "iasi-men-conchiglie",
    brand: "IASI",
    name: "Coquilles Absorbantes Homme IASI MEN",
    category: "adulte",
    subCategory: "Protections Anatomiques Homme",
    seoUrl: "/produit/incontinence-adultes/iasi-men-conchiglie",
    description: "Protections anatomiques en forme de coquille pour hommes, légères et pratiques à fixer dans le sous-vêtement.",
    features: [
      "Bande adhésive de maintien sûre",
      "Forme coquille ergonomique adaptée à l'homme",
      "Neutralisation rapide des odeurs"
    ],
    variants: [
      {
        sku: "86497",
        slug: "iasi-men-conchiglie-level-1-small",
        label: "Niveau 1 (Small) - 10 unités",
        price: 1.92,
        inStock: true,
        image: "/image/86497.png",
        detailedDescription: "Protections coquilles IASI MEN Niveau 1 ultralégères pour les fuites urinaires très légères et les gouttes. Se fixent fermement dans le sous-vêtement grâce à une large bande adhésive."
      },
      {
        sku: "86498",
        slug: "iasi-men-conchiglie-level-2-medium",
        label: "Niveau 2 (Medium) - 10 unités",
        price: 2.20,
        inStock: true,
        image: "/image/86498.png",
        detailedDescription: "IASI MEN Coquilles Niveau 2 assurant une sécurité supérieure tout en restant complètement invisibles sous les vêtements. Absorption ciblée sur l'avant et barrières latérales anti-fuites."
      },
      {
        sku: "86499",
        slug: "iasi-men-conchiglie-level-3-super",
        label: "Niveau 3 (Super) - 10 unités",
        price: 2.65,
        inStock: true,
        image: "/image/86499.png",
        detailedDescription: "Protections coquilles IASI MEN Niveau 3 offrant le niveau d'absorption le plus élevé de la gamme homme. Idéales pour une protection active prolongée."
      }
    ]
  },
  {
    id: "iasi-pants-unisex",
    brand: "IASI",
    name: "Culottes Absorbantes Unisex IASI Alta Protezione",
    category: "adulte",
    subCategory: "Culottes Absorbantes Mixte (Pants)",
    seoUrl: "/produit/incontinence-adultes/iasi-pants-unisex",
    description: "Culottes d'incontinence mixtes à très haute capacité d'absorption pour fuites urinaires fortes et soins de nuit.",
    features: [
      "Absorption EXTRA ultra-rapide",
      "Ceinture élastique 360° ultra-douce",
      "Témoin d'humidité et barrières latérales"
    ],
    variants: [
      {
        sku: "86892",
        slug: "iasi-pants-unisex-small",
        label: "Taille S (Small) - 14 unités",
        price: 8.59,
        inStock: true,
        image: "/image/86892.png",
        detailedDescription: "Culottes d'incontinence mixtes IASI Alta Protezione Taille S. Leur technologie de coussin absorbant multicouche convient aussi bien aux hommes qu'aux femmes souffrant d'incontinence forte."
      },
      {
        sku: "8718",
        slug: "iasi-pants-unisex-medium",
        label: "Taille M (Medium) - 14 unités",
        price: 10.39,
        inStock: true,
        image: "/image/8718.png",
        detailedDescription: "Culottes absorbantes mixtes IASI Alta Protezione Taille M avec ceinture élastique 360°. Elles offrent une sécurité optimale de jour comme de nuit grâce à des barrières anti-fuites surélevées."
      },
      {
        sku: "8719",
        slug: "iasi-pants-unisex-large",
        label: "Taille L (Large) - 14 unités",
        price: 11.39,
        inStock: true,
        image: "/image/8719.png",
        detailedDescription: "IASI Pants Unisex Taille L combine un pouvoir d'absorption très élevé avec des composants testés dermatologiquement. Témoin d'humidité pratique pour planifier le change."
      },
      {
        sku: "86893",
        slug: "iasi-pants-unisex-xl",
        label: "Taille XL (Très Grand) - 10 unités",
        price: 8.99,
        inStock: true,
        image: "/image/86893.png",
        detailedDescription: "Format XL pour les culottes d'incontinence mixtes IASI Alta Protezione. Conçues pour s'ajuster confortablement aux tours de taille importants sans marquer la peau."
      },
      {
        sku: "86902",
        slug: "iasi-pants-unisex-xxl",
        label: "Taille XXL (Double Très Grand) - 10 unités",
        price: 10.39,
        inStock: true,
        image: "/image/86902.png",
        detailedDescription: "Culottes absorbantes IASI Pants Unisex XXL conçues pour les fortes corpulences. Offrent une capacité d'absorption maximale et une ceinture ultra-extensible."
      }
    ]
  },
  {
    id: "iasi-pannoloni-mutandina-maxi",
    brand: "IASI",
    name: "Changes Complets IASI Assorbenza MAXI",
    category: "adulte",
    subCategory: "Changes Complets avec Attaches",
    seoUrl: "/produit/incontinence-adultes/iasi-pannoloni-mutandina-maxi",
    description: "Changes complets avec adhésifs repositionnables pour incontinence très lourde ou personnes alitées.",
    features: [
      "Capacité d'absorption maximale (MAXI)",
      "Adhésifs d'attache réajustables à volonté",
      "Voile extérieur respirant et doux"
    ],
    variants: [
      {
        sku: "28789",
        slug: "iasi-pannoloni-mutandina-maxi-medium",
        label: "Taille M (Medium) - 15 unités",
        price: 9.49,
        inStock: true,
        image: "/image/28789.png",
        detailedDescription: "Changes complets avec attaches IASI Assorbenza MAXI Taille M. Spécialement conçus pour l'incontinence sévère et les personnes dépendantes ou alitées."
      },
      {
        sku: "28790",
        slug: "iasi-pannoloni-mutandina-maxi-large",
        label: "Taille L (Large) - 12 unités",
        price: 8.99,
        inStock: true,
        image: "/image/28790.png",
        detailedDescription: "IASI Assorbenza MAXI Taille L dispose de 4 bandes adhésives repositionnables et d'un double voile absorbant avec barrières anti-fuites étanches."
      },
      {
        sku: "28791",
        slug: "iasi-pannoloni-mutandina-maxi-xl",
        label: "Taille XL (Très Grand) - 15 unités",
        price: 8.99,
        inStock: true,
        image: "/image/28791.png",
        detailedDescription: "Changes complets IASI MAXI Taille XL. Ils intègrent un indicateur de saturation pour vous avertir exactement du moment où le change doit être effectué."
      }
    ]
  },
  {
    id: "iasi-traverse-adulti",
    brand: "IASI",
    name: "Alèses de Protection IASI Traverse",
    category: "adulte",
    subCategory: "Alèses de Protection Lit & Fauteuil",
    seoUrl: "/produit/incontinence-adultes/iasi-traverse-adulti",
    description: "Alèses jetables étanches pour la protection des lits, matelas et fauteuils en établissement ou à domicile.",
    features: [
      "Voile d'absorption gaufré anti-glisse",
      "Face extérieure imperméable",
      "Disponible en grands formats (60x90 cm)"
    ],
    variants: [
      {
        sku: "83880",
        slug: "iasi-traverse-60x90",
        label: "Alèses 60x90 cm - 15 unités",
        price: 5.60,
        inStock: true,
        image: "/image/83880.png",
        detailedDescription: "Alèses de protection jetables IASI 60x90 cm dotées d'un matelas d'absorption en fluff de cellulose et d'un film inférieur polyéthylène complètement imperméable."
      },
      {
        sku: "83881",
        slug: "iasi-traverse-60x90-parfum",
        label: "Alèses 60x90 cm (Confort Parfum) - 15 unités",
        price: 5.60,
        inStock: true,
        image: "/image/83881.png",
        detailedDescription: "Alèses IASI 60x90 cm version Confort Parfum avec une agréable senteur fraîche pour neutraliser les mauvaises odeurs dans la chambre ou le salon."
      },
      {
        sku: "83887",
        slug: "iasi-traverse-maxi-60x90",
        label: "Alèses MAXI 60x90 cm - 15 unités",
        price: 7.99,
        inStock: true,
        image: "/image/83887.png",
        detailedDescription: "Alèses IASI MAXI 60x90 cm renforcées avec des polymères SAP super-absorbants à haute densité pour absorber d'importants volumes de liquides."
      }
    ]
  },
  {
    id: "iasi-wipes-adulti",
    brand: "IASI",
    name: "Lingettes de Toilette Adulte IASI Extra Large",
    category: "adulte",
    subCategory: "Lingettes de Toilette Adulte",
    seoUrl: "/produit/incontinence-adultes/iasi-wipes-adulti",
    description: "Lingettes de toilette extra-larges et douces enrichies aux ingrédients naturels pour l'hygiène quotidienne des adultes.",
    features: [
      "Format Extra Large pratique",
      "Formule respectueuse du pH de la peau",
      "Capot fraîcheur refermable"
    ],
    variants: [
      {
        sku: "0759",
        slug: "iasi-wipes-extra-large-54",
        label: "Lingettes Extra Large - 54 unités",
        price: 2.09,
        inStock: true,
        image: "/image/0759.png",
        detailedDescription: "Lingettes de toilette extra-larges IASI (20x22 cm) formulées à l'Aloe Vera et au Panthénol pour la toilette rapide sans eau des personnes à mobilité réduite."
      }
    ]
  }

];

const ADDITIONAL_ADULT_CATALOG: AdultProduct[] = [
  {
    "id": "tena-proskin-pants-plus",
    "name": "Slips Absorbants TENA ProSkin Pants Plus",
    "brand": "TENA",
    "category": "adulte",
    "subCategory": "Slips Absorbants & Incontinence",
    "seoUrl": "/produit/incontinence-adultes/tena-proskin-pants-plus",
    "description": "Les slips absorbants TENA ProSkin Pants Plus sont des protections jetables douces et confortables qui s'enfilent comme un sous-vêtement classique pour gérer l'incontinence modérée à forte de jour comme de nuit. Dotés de la technologie FeelDry Advanced, de matières respirantes, de barrières anti-fuites intégrées et d'un neutraliseur d'odeurs, ils sont testés dermatologiquement et accrédités par la Skin Health Alliance.",
    "features": [
      "Triple protection contre les fuites, les odeurs et l'humidité de jour comme de nuit",
      "Technologie FeelDry Advanced : capture rapide des liquides loin de la peau",
      "Matières douces et respirantes préservant la santé naturelle de l'épiderme",
      "Maintien ajusté comme un sous-vêtement avec coutures latérales déchirables",
      "Testés dermatologiquement et accrédités par la Skin Health Alliance"
    ],
    "galleryImages": [
      "/image/reviewproskin1.png",
      "/image/reviewproskin2.png",
      "/image/reviewproskin3.png",
      "/image/reviewprokin4.png",
      "/image/reviewprokin5.png"
    ],
    "variants": [
      {
        "sku": "TEN-PSP-XS-14",
        "slug": "tena-proskin-pants-plus-xs-14",
        "label": "Taille XS (Extra Small) - 14 unités",
        "price": 6.89,
        "inStock": true,
        "image": "/image/proskinxs.png",
        "detailedDescription": "Slips absorbants TENA ProSkin Pants Plus Taille XS en paquet de 14 unités. Conçus pour l'incontinence modérée à forte, ils s'enfilent comme un sous-vêtement classique et offrent une triple protection contre les fuites, les odeurs et l'humidité de jour comme de nuit. Dotés de la technologie FeelDry Advanced qui éloigne rapidement les liquides de la peau, de matières douces respirantes et de coutures latérales déchirables pour un retrait facile. Testés dermatologiquement et accrédités par la Skin Health Alliance."
      },
      {
        "sku": "TEN-PSP-S-14",
        "slug": "tena-proskin-pants-plus-s-14",
        "label": "Taille S (Small) - 14 unités",
        "price": 6.89,
        "inStock": true,
        "image": "/image/proskins.png",
        "detailedDescription": "Slips absorbants TENA ProSkin Pants Plus Taille S en paquet de 14 unités. Offrent un maintien ajusté et discret grâce à leurs élastiques souples qui suivent les mouvements du corps au quotidien, de jour comme de nuit. Leur zone d'absorption haute performance verrouille instantanément l'humidité tout en neutralisant les odeurs, préservant ainsi la santé naturelle de la peau. Testés dermatologiquement et accrédités par la Skin Health Alliance."
      },
      {
        "sku": "TEN-PSP-M-14",
        "slug": "tena-proskin-pants-plus-m-14",
        "label": "Taille M (Medium) - 14 unités",
        "price": 6.89,
        "inStock": true,
        "image": "/image/proskinm.png",
        "detailedDescription": "Slips absorbants TENA ProSkin Pants Plus Taille M en paquet de 14 unités. Idéals pour les personnes actives recherchant une sécurité maximale contre les fuites urinaires modérées à fortes de jour comme de nuit. Équipés de barrières anti-fuites intégrées, d'un voile micro-aéré respirant et d'un système de neutralisation des odeurs pour une sensation de fraîcheur et de confort durable. Accrédités par la Skin Health Alliance."
      },
      {
        "sku": "TEN-PSP-L-14",
        "slug": "tena-proskin-pants-plus-l-14",
        "label": "Taille L (Large) - 14 unités",
        "price": 6.89,
        "inStock": true,
        "image": "/image/proskinl.png",
        "detailedDescription": "Slips absorbants TENA ProSkin Pants Plus Taille L en paquet de 14 unités. Combinent le confort d'un sous-vêtement extensible à une absorption renforcée (niveau Plus — 6 gouttes sur 8) de jour comme de nuit. La technologie FeelDry Advanced capture rapidement les liquides pour garder la peau sèche, tandis que les matériaux doux et respirants limitent les risques d'irritation. Testés dermatologiquement et accrédités Skin Health Alliance."
      },
      {
        "sku": "TEN-PSP-XL-12",
        "slug": "tena-proskin-pants-plus-xl-12",
        "label": "Taille XL (Extra Large) - 12 unités",
        "price": 6.89,
        "inStock": true,
        "image": "/image/proskinxl.png",
        "detailedDescription": "Slips absorbants TENA ProSkin Pants Plus Taille XL en paquet de 12 unités. Adaptés aux morphologies plus larges pour une protection sûre et confortable contre les fuites modérées à fortes de jour comme de nuit. Dotés d'une ceinture élastique souple, de doubles barrières anti-fuites, d'un neutraliseur d'odeurs et de coutures latérales faciles à déchirer. Testés dermatologiquement et accrédités par la Skin Health Alliance."
      }
    ]
  }
];

export const ADULT_CATALOG: AdultProduct[] = [
  ...BASE_ADULT_CATALOG,
  ...ADDITIONAL_ADULT_CATALOG,
];
