export interface ProductVariant {
  sku: string;
  slug: string;
  label: string;
  price: number;
  inStock: boolean;
  image: string;
  detailedDescription: string;
}

export interface PetProduct {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  seoUrl: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

export const PET_CATALOG: PetProduct[] = [
  {
    id: "rispet-traverse",
    name: "Tapis Hygiéniques Absorbants RISPET",
    category: "petcare",
    subCategory: "Traverse & Tapis Animaux",
    seoUrl: "/produit/petcare/rispet-traverse",
    description: "Tapis hygiéniques absorbants pour animaux avec technologie de contrôle des odeurs, idéaux pour l'intérieur ou l'apprentissage.",
    features: [
      "Technologie de contrôle des odeurs",
      "Haute capacité d'absorption",
      "Base imperméable anti-fuites"
    ],
    variants: [
      {
        sku: "83892",
        slug: "rispet-tapis-hygieniques-60x80-14",
        label: "Tapis hygiéniques 60x80 cm - 14 unités",
        price: 4.25,
        inStock: true,
        image: "/image/83892.png",
        detailedDescription: "Tapis d'apprentissage RISPET 60x80 cm pour chiots et animaux d'intérieur. Équipés de bandes adhésives aux 4 coins et d'un fond étanche pour protéger les sols."
      },
      {
        sku: "83893",
        slug: "rispet-tapis-hygieniques-90x60-14",
        label: "Tapis hygiéniques 90x60 cm - 14 unités",
        price: 5.40,
        inStock: true,
        image: "/image/83893.png",
        detailedDescription: "Alèses absorbantes pour animaux RISPET 90x60 cm. Leur structure en relief draine rapidement les urines et neutralise les mauvaises odeurs."
      },
      {
        sku: "83894",
        slug: "rispet-tapis-green-fresh-90x60-14",
        label: "Tapis Green Fresh 90x60 cm - 14 unités (Nouveauté)",
        price: 5.40,
        inStock: true,
        image: "/image/83894.png",
        detailedDescription: "Tapis hygiéniques RISPET Green Fresh 90x60 cm infusés d'un parfum d'herbe fraîche incitant naturellement l'animal à y faire ses besoins."
      }
    ]
  },
  {
    id: "rispet-salviettine",
    name: "Lingettes Hygiéniques RISPET pour Animaux",
    category: "petcare",
    subCategory: "Salviettine Animaux",
    seoUrl: "/produit/petcare/rispet-salviettine",
    description: "Lingettes hygiéniques et purifiantes pour le pelage, les yeux et les oreilles des chiens, chats et animaux domestiques.",
    features: [
      "Formules enrichies (Noix de coco, Avocat, Camomille)",
      "Testé dermatologiquement pour animaux",
      "Nettoyage et parfum délicat"
    ],
    variants: [
      {
        sku: "07830",
        slug: "rispet-lingettes-noix-de-coco-keratine-54",
        label: "Lingettes Noix de coco et Kératine - 54 unités",
        price: 2.20,
        inStock: true,
        image: "/image/07830.png",
        detailedDescription: "Lingettes humides RISPET Noix de coco & Kératine (20x22 cm) pour nettoyer les pattes et faire briller le pelage des chiens et chats au retour de promenade."
      },
      {
        sku: "07831",
        slug: "rispet-lingettes-avocat-soie-54",
        label: "Lingettes Avocat et Soie - 54 unités",
        price: 2.20,
        inStock: true,
        image: "/image/07831.png",
        detailedDescription: "Lingettes nettoyantes RISPET Avocat & Proteines de Soie. Hydratent la peau et apportent une douceur soyeuse aux pelages délicats."
      },
      {
        sku: "07856",
        slug: "rispet-disques-yeux-oreilles-12",
        label: "Lingettes Yeux et Oreilles (Disques) - 12 unités (Nouveauté)",
        price: 0.79,
        inStock: true,
        image: "/image/07856.png",
        detailedDescription: "Disques nettoyants spécifiques RISPET Yeux & Oreilles imprégnés d'extrait de Camomille pour éliminer les impuretés sans piquer."
      }
    ]
  },
  {
    id: "rispet-shampoo",
    name: "Shampooing & Baume RISPET",
    category: "petcare",
    subCategory: "Shampooing & Gants Animaux",
    seoUrl: "/produit/petcare/rispet-shampoo",
    description: "Shampooings et baumes détergents et hygiénisants pour chiens et animaux de compagnie, formule délicate sans allergènes.",
    features: [
      "Formule sans allergènes et pH équilibré",
      "Action adoucissante et démêlante",
      "Parfums longue durée"
    ],
    variants: [
      {
        sku: "2183",
        slug: "rispet-shampooing-noix-de-coco-keratine-370ml",
        label: "Shampooing Noix de coco et Kératine (Poils Longs) - 370 ml",
        price: 2.27,
        inStock: true,
        image: "/image/2183.png",
        detailedDescription: "Shampooing RISPET Noix de coco et Kératine 370 ml formulé pour nourrir, gainer et faciliter le démêlage des chiens à poils longs."
      },
      {
        sku: "2184",
        slug: "rispet-shampooing-avocat-soie-370ml",
        label: "Shampooing Avocat et Soie (Poils Courts) - 370 ml",
        price: 2.27,
        inStock: true,
        image: "/image/2184.png",
        detailedDescription: "Shampooing RISPET Avocat & Soie 370 ml adapté aux pelages ras et courts pour éliminer l'excès de sébum et raviver la brillance du poil."
      },
      {
        sku: "2185",
        slug: "rispet-gants-jetables-hygieniques-8",
        label: "Gants jetables hygiéniques - 8 gants",
        price: 2.27,
        inStock: true,
        image: "/image/2185.png",
        detailedDescription: "Gants pré-imprégnés de toilette sans eau RISPET (paquet de 8). Permettent d'effectuer un shampooing rapide à sec sur les animaux qui redoutent l'eau."
      }
    ]
  },
  {
    id: "rispet-homecare",
    name: "Entretien Maison & Poils RISPET HomeCare",
    category: "petcare",
    subCategory: "Entretien Maison & Poils",
    seoUrl: "/produit/petcare/rispet-homecare",
    description: "Paniers microfibres et plumeaux de dépoussiérage et capture des poils d'animaux pour tous types de sols.",
    features: [
      "Capture efficace des poils d'animaux et poussières",
      "Idéal pour sols lisses et parquets",
      "Recharges économiques et accessoires maniables"
    ],
    variants: [
      {
        sku: "2195",
        slug: "rispet-microfibres-3d-sols-10",
        label: "Lingettes Microfibres 3D pour sols (10 unités)",
        price: 2.99,
        inStock: true,
        image: "/image/2195.png",
        detailedDescription: "Lingettes dépoussiérantes 3D RISPET (10 unités). Attirent et piègent par électrostatique les poils de chiens et chats sur le parquet et le carrelage."
      },
      {
        sku: "2196",
        slug: "rispet-microfibres-3d-sols-20",
        label: "Lingettes Microfibres 3D pour sols (20 unités)",
        price: 4.99,
        inStock: true,
        image: "/image/2196.png",
        detailedDescription: "Format économique de 20 lingettes microfibres 3D RISPET pour un nettoyage régulier et sans effort des poils d'animaux au sol."
      },
      {
        sku: "2197",
        slug: "rispet-plumeau-depoussiérant-kit",
        label: "Plumeau dépoussiérant (1 manche + 3 plumeaux)",
        price: 1.65,
        inStock: true,
        image: "/image/2197.png",
        detailedDescription: "Kit starter Plumeau RISPET comprenant 1 manche ergonomique et 3 recharges en microfibres pour dépoussiérer les meubles et recoins accumulant les poils."
      },
      {
        sku: "2198",
        slug: "rispet-recharge-plumeaux-5",
        label: "Recharge Plumeaux dépoussiérants (5 plumeaux)",
        price: 1.65,
        inStock: true,
        image: "/image/2198.png",
        detailedDescription: "Recharges de plumeaux dépoussiérants RISPET (5 unités) pour conserver des surfaces exemptes de poils d'animaux domestiques."
      }
    ]
  }
];