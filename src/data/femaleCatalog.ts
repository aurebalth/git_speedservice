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

export interface FemaleProduct {
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

export const FEMALE_CATALOG: FemaleProduct[] = [
  {
    id: "everyday-sensitive-cotton",
    brand: "EveryDay",
    name: "Serviettes Hygiéniques Ultra EveryDay Sensitive Cotton",
    category: "feminin",
    subCategory: "Serviettes Ultra Sensitive Cotton",
    seoUrl: "/produit/hygiene-feminine/everyday-sensitive-cotton",
    description: "Serviettes hygiéniques ultra-minces avec voile filtrant 100% coton, conçues pour offrir une protection maximale tout en respectant les peaux sensibles.",
    features: [
      "Voile filtrant 100% à base de coton",
      "Testé dermatologiquement",
      "Protection ultra-mince et confortable"
    ],
    variants: [
      {
        sku: "0637",
        slug: "everyday-sensitive-cotton-normal-ailes-18",
        label: "Normal avec ailes - 18 unités",
        price: 2.10,
        inStock: true,
        image: "/image/0637.png",
        detailedDescription: "Serviettes EveryDay Sensitive Cotton Normal avec ailes. Dotées du système Center-Plus qui augmente la zone d'absorption centrale de 30% et d'un voile 100% coton très doux."
      },
      {
        sku: "0638",
        slug: "everyday-sensitive-cotton-long-ailes-18",
        label: "Long avec ailes - 18 unités",
        price: 2.30,
        inStock: true,
        image: "/image/0638.png",
        detailedDescription: "Serviettes hygiéniques EveryDay Sensitive Cotton Long avec ailes. Longueur rallongée pour les flux moyens à abondants tout en protégeant les peaux réactives."
      },
      {
        sku: "0639",
        slug: "everyday-sensitive-cotton-nuit-ailes-18",
        label: "Nuit avec ailes - 18 unités",
        price: 2.52,
        inStock: true,
        image: "/image/0639.png",
        detailedDescription: "Serviettes EveryDay Sensitive Cotton Nuit. Conçues spécifiquement avec une partie arrière élargie pour garantir zéro fuite en position allongée."
      },
      {
        sku: "0866",
        slug: "everyday-sensitive-cotton-extra-long-xl-18",
        label: "Extra Long avec ailes (XL) - 18 unités",
        price: 2.95,
        inStock: true,
        image: "/image/0866.png",
        detailedDescription: "EveryDay Sensitive Cotton Extra Long (XL). La protection maximale de la gamme Sensitive Cotton pour flux très abondants ou usage nocturne intensif."
      }
    ]
  },
  {
    id: "everyday-hyperdry",
    brand: "EveryDay",
    name: "Serviettes Hygiéniques Ultra EveryDay HyperDry",
    category: "feminin",
    subCategory: "Serviettes Ultra HyperDry",
    seoUrl: "/produit/hygiene-feminine/everyday-hyperdry",
    description: "Serviettes hygiéniques ultra avec voile hyper-sec pour une absorption rapide et une sensation de sécheresse prolongée.",
    features: [
      "Voile ultra-absorbant effet sec",
      "Technologie anti-fuites renforcée",
      "Confort optimal au quotidien"
    ],
    variants: [
      {
        sku: "0634",
        slug: "everyday-hyperdry-normal-ailes-18",
        label: "Normal avec ailes - 18 unités",
        price: 2.10,
        inStock: true,
        image: "/image/0634.png",
        detailedDescription: "Serviettes EveryDay HyperDry Normal équipées d'un voile technique micro-perforé qui draine instantanément les liquides au cœur du noyau absorbant."
      },
      {
        sku: "0635",
        slug: "everyday-hyperdry-long-ailes-18",
        label: "Long avec ailes - 18 unités",
        price: 2.30,
        inStock: true,
        image: "/image/0635.png",
        detailedDescription: "EveryDay HyperDry Long avec ailes de fixation. Maintient une surface parfaitement sèche même lors des jours de flux abondant."
      },
      {
        sku: "0636",
        slug: "everyday-hyperdry-nuit-ailes-18",
        label: "Nuit avec ailes - 18 unités",
        price: 2.52,
        inStock: true,
        image: "/image/0636.png",
        detailedDescription: "Serviettes EveryDay HyperDry Nuit offrant un pouvoir d'absorption ultra-rapide et des barrières de retenue renforcées pour la nuit."
      },
      {
        sku: "0865",
        slug: "everyday-hyperdry-extra-long-xl-18",
        label: "Extra Long avec ailes (XL) - 18 unités",
        price: 2.95,
        inStock: true,
        image: "/image/0865.png",
        detailedDescription: "EveryDay HyperDry Extra Long XL. Format étendu pour une sécurité absolue et un effet sec immédiat."
      }
    ]
  },
  {
    id: "salvaslip",
    brand: "EveryDay",
    name: "Protège-slips EveryDay All Cotton & Natura",
    category: "feminin",
    subCategory: "Protège-slips",
    seoUrl: "/produit/hygiene-feminine/salvaslip",
    description: "Protège-slips respirants avec voile en coton ou version bio biodégradable pour une fraîcheur saine au quotidien.",
    features: [
      "Voile doux respectueux de la peau",
      "Option 100% coton biologique biodégradable (Natura)",
      "Finesse et discrétion absolue"
    ],
    variants: [
      {
        sku: "1180",
        slug: "everyday-all-cotton-normal-20",
        label: "All Cotton Normal - 20 unités",
        price: 1.62,
        inStock: true,
        image: "/image/1180.png",
        detailedDescription: "Protège-slips EveryDay All Cotton Normal avec voile de surface en coton naturel 100%. Idéaux pour une sensation de fraîcheur quotidienne."
      },
      {
        sku: "1147",
        slug: "everyday-all-cotton-large-30",
        label: "All Cotton Large - 30 unités",
        price: 2.95,
        inStock: true,
        image: "/image/1147.png",
        detailedDescription: "Protège-slips EveryDay All Cotton Large en paquet de 30. Offrent une surface de protection plus large et une grande finesse."
      },
      {
        sku: "0153",
        slug: "everyday-all-cotton-extra-long-24",
        label: "All Cotton Extra Long - 24 unités",
        price: 2.95,
        inStock: true,
        image: "/image/0153.png",
        detailedDescription: "EveryDay All Cotton Extra Long (24 unités). Format allongé pour une sécurité renforcée en début ou fin de cycle."
      },
      {
        sku: "0056",
        slug: "everyday-natura-normal-bio-20",
        label: "Natura Normal (Bio & Biodégradable) - 20 unités",
        price: 1.78,
        inStock: true,
        image: "/image/0056.png",
        detailedDescription: "Protège-slips EveryDay Natura Normal 100% coton bio certifié GOTS. Biodégradables, compostables et sans pesticides pour un soin écologique."
      }
    ]
  },
  {
    id: "salviettine-struccanti-pompon",
    brand: "Pom Pon",
    name: "Lingettes Démaquillantes Pom Pon (Visage et Yeux)",
    category: "feminin",
    subCategory: "Lingettes Démaquillantes PomPon",
    seoUrl: "/produit/hygiene-feminine/salviettine-struccanti-pompon",
    description: "Lingettes démaquillantes pour le visage et les yeux enrichies en ingrédients naturels (aloe, argan bio, micellaire, peaux sensibles).",
    features: [
      "Testé ophtalmologiquement et dermatologiquement",
      "Formules aux extraits naturels (Argan bio, Micellaire, Aloé)",
      "Nettoyage en douceur sans irriter"
    ],
    variants: [
      {
        sku: "1640",
        slug: "pompon-toutes-peaux-hydratantes-20",
        label: "Toutes Peaux (Hydratantes et Rilassanti) - 20 unités",
        price: 1.69,
        inStock: true,
        image: "/image/1640.png",
        detailedDescription: "Lingettes démaquillantes Pom Pon Toutes Peaux. Éliminent facilement le maquillage même résistant tout en laissant la peau douce et apaisée."
      },
      {
        sku: "1639",
        slug: "pompon-peaux-sensibles-calmantes-20",
        label: "Peaux Sensibles (Calmantes) - 20 unités",
        price: 1.69,
        inStock: true,
        image: "/image/1639.png",
        detailedDescription: "Lingettes Pom Pon Peaux Sensibles enrichies en composants calmants pour éviter toute rougeur ou picotement des yeux et des joues."
      },
      {
        sku: "0697",
        slug: "pompon-micellaire-nettoyage-intensif-20",
        label: "Micellaire (Nettoyage intensif) - 20 unités",
        price: 1.89,
        inStock: true,
        image: "/image/0697.png",
        detailedDescription: "Lingettes Pom Pon Eau Micellaire. Capturent la pollution et le maquillage waterproof en un seul passage sans besoin de rincer."
      },
      {
        sku: "0281",
        slug: "pompon-gold-nutriments-revitalisantes-20",
        label: "Gold (Nutriments et Revitalisantes) - 20 unités",
        price: 1.89,
        inStock: true,
        image: "/image/0281.png",
        detailedDescription: "Lingettes Pom Pon Gold enrichies en complexes tonifiants et revitalisants pour redonner éclat et souplesse au visage."
      },
      {
        sku: "07819",
        slug: "pompon-natura-argan-bio-20",
        label: "Natura 100% Fibres Naturelles (Huile d'Argan Bio) - 20 unités",
        price: 2.10,
        inStock: true,
        image: "/image/07819.png",
        detailedDescription: "Lingettes Pom Pon Natura en tissu 100% végétal sans plastique imprégné d'huile d'Argan bio pour démaquiller et nourrir la peau."
      }
    ]
  }
];