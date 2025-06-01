export type Category = {
  id: string;
  title: string;
  slug: string;
  isLink: boolean;
  subcat?: SubType[];
};

export type SubType = Pick<Category, "id" | "title" | "slug">;

export const categories: Category[] = [
  {
    id: "ghfsd",
    title: "Epicerie Sucrée",
    slug: "epicerie-sucree",
    isLink: false,
    subcat: [
      {
        id: "haotb",
        title: "Café capsule & Moulu",
        slug: "cafe-capsule-moulu",
      },
      {
        id: "gvwts",
        title: "Crémerie & Fromage",
        slug: "cremerie-fromage",
      },
      {
        id: "laxpe",
        title: "Sucres & Edulcorants",
        slug: "sucres-edulcorants",
      },
      {
        id: "kwany",
        title: "Pâte â Tartiner",
        slug: "pate-a-tartiner",
      },
      {
        id: "bpawv",
        title: "Pâtes à tartiner",
        slug: "pates-a-tartiner",
      },
      {
        id: "jwxit",
        title: "Beurre & Margarine",
        slug: "beurre-margarine",
      },
    ],
  },
  {
    id: "kaxpq",
    title: "Riz",
    slug: "riz",
    isLink: false,
    subcat: [
      {
        id: "hzwls",
        title: "Riz parfumé 100% brisure",
        slug: "riz-parfume-100-brisure",
      },
      {
        id: "gvwts",
        title: "Riz nom parfumé",
        slug: "riz-nom-parfume",
      },
      {
        id: "laxpe",
        title: "Riz de la vallée",
        slug: "riz-de-la-vallee",
      },
    ],
  },
  {
    id: "vxfwi",
    title: "Huile",
    slug: "huile",
    isLink: false,
    subcat: [
      {
        id: "hzwls",
        title: "Huile végétale",
        slug: "huile-vegetale",
      },
      {
        id: "gvwts",
        title: "huile de soja",
        slug: "huile-de-soja",
      },
      {
        id: "laxpe",
        title: "huile de tournesol",
        slug: "huile-de-tournesol",
      },
      {
        id: "kwany",
        title: "huile d'arachide",
        slug: "huile-d-arachide",
      },
      {
        id: "bpawv",
        title: "huile de palme",
        slug: "huile-de-palme",
      },
      {
        id: "jwxit",
        title: "huile d'olive",
        slug: "huile-d-olive",
      },
    ],
  },
  {
    id: "jzqpa",
    title: "Boissons",
    slug: "boissons",
    isLink: false,
    subcat: [
      {
        id: "hwqmd",
        title: "Eau",
        slug: "eau",
      },
      {
        id: "gvwts",
        title: "Jus de fruits",
        slug: "jus-de-fruits",
      },
      {
        id: "laxpe",
        title: "Boissons gazeuses",
        slug: "boissons-gazeuses",
      },
      {
        id: "kwany",
        title: "Thé et infusions",
        slug: "the-et-infusions",
      },
      {
        id: "bpawv",
        title: "Jus de citron",
        slug: "jus-de-citron",
      },
      {
        id: "jwxit",
        title: "Miel pur",
        slug: "miel-pur",
      },
      {
        id: "jxapw",
        title: "Huile de palme",
        slug: "huile-de-palme",
      },
      {
        id: "lwqmb",
        title: "diw nior (beurre de vache)",
        slug: "diw-nior-beurre-de-vache",
      },
    ],
  },
  {
    id: "mkwya",
    title: "Pâte Alimentaire",
    slug: "pate-alimentaire",
    isLink: false,
    subcat: [
      {
        id: "hwqmd",
        title: "Couscous",
        slug: "couscous",
      },
      {
        id: "gvwts",
        title: "Mouhamsa",
        slug: "mouhamsa",
      },
      {
        id: "laxpe",
        title: "Pâte d'arachide",
        slug: "pate-d-arachide",
      },
      {
        id: "kwany",
        title: "Spaghetti",
        slug: "spaghetti",
      },
      {
        id: "bpawv",
        title: "Vermicelle",
        slug: "vermicelle",
      },
      {
        id: "jwxit",
        title: "Autres pâtes",
        slug: "autres-pates",
      },
      {
        id: "pzqkf",
        title: "Macaroni",
        slug: "macaroni",
      },
    ],
  },
  {
    id: "lxaiu",
    title: "Fruits & légumes & viandes",
    slug: "fruits-legumes-viandes",
    isLink: true,
    subcat: [
      {
        id: "haxpw",
        title: "Fruits",
        slug: "fruits",
      },
      {
        id: "gvwts",
        title: "Légumes",
        slug: "legumes",
      },
      {
        id: "laxpe",
        title: "Viandes d'agneau",
        slug: "viandes-d-agneau",
      },
      {
        id: "kwany",
        title: "Viande de veau",
        slug: "viande-de-veau",
      },
      {
        id: "bpawv",
        title: "Poulets",
        slug: "poulets",
      },
    ],
  },
  {
    id: "lvwkf",
    title: "Biscuits & Confiserie",
    slug: "biscuits-confiserie",
    isLink: false,
    subcat: [
      {
        id: "haxdt",
        title: "Café capsule & Moulu",
        slug: "cafe-capsule-moulu",
      },
      {
        id: "gvwts",
        title: "Crémerie & Fromage",
        slug: "cremerie-fromage",
      },
      {
        id: "laxpe",
        title: "Sucres & Edulcorants",
        slug: "sucres-edulcorants",
      },
      {
        id: "kwany",
        title: "Pâte â Tartiner",
        slug: "pate-a-tartiner",
      },
      {
        id: "bpawv",
        title: "Pâtes à tartiner",
        slug: "pates-a-tartiner",
      },
      {
        id: "jwxit",
        title: "Beurre & Margarine",
        slug: "beurre-margarine",
      },
    ],
  },
  {
    id: "mxjax",
    title: "Produits-bébé",
    slug: "produits-bebe",
    isLink: false,
    subcat: [
      {
        id: "kqbdt",
        title: "Aliments bébé",
        slug: "aliments-bebe",
      },
      {
        id: "gvwts",
        title: "Couches",
        slug: "couches",
      },
      {
        id: "laxpe",
        title: "Assouplissant",
        slug: "assouplissant",
      },
      {
        id: "kwany",
        title: "Parfumerie",
        slug: "parfumerie",
      },
      {
        id: "bpawv",
        title: "Pates dentifrice",
        slug: "pates-dentifrice",
      },
      {
        id: "jwxit",
        title: "Lingette",
        slug: "lingettes",
      },
      {
        id: "haqvi",
        title: "Lait de corps",
        slug: "lait-de-corps",
      },
      {
        id: "jwzit",
        title: "Savon",
        slug: "savon",
      },
      {
        id: "iqdlh",
        title: "poudre bébé",
        slug: "poudre-bebe",
      },
      {
        id: "hwzpy",
        title: "Brosse a dents",
        slug: "brosse-a-dents",
      },
    ],
  },
  {
    id: "mkxzb",
    title: "Epicerie Salée",
    slug: "epicerie-salee",
    isLink: false,
    subcat: [
      {
        id: "lzysr",
        title: "piment-ail-poivre-épices",
        slug: "piment-ail-poivre-epices",
      },
      {
        id: "kwbai",
        title: "Vinaigres & Vinaigrettes",
        slug: "vinaigres-vinaigrettes",
      },
      {
        id: "gvwts",
        title: "Moutarde",
        slug: "moutarde",
      },
      {
        id: "laxpe",
        title: "Sauces & Tomates & Mayonnaises",
        slug: "sauces-tomates-mayonnaises",
      },
      {
        id: "kwany",
        title: "Bouillon",
        slug: "bouillon",
      },
      {
        id: "bpawv",
        title: "Condiment",
        slug: "condiment",
      },
      {
        id: "jwxit",
        title: "Tomate",
        slug: "tomate",
      },
      {
        id: "oszvi",
        title: "Thon",
        slug: "thon",
      },
      {
        id: "izqkh",
        title: "Conserve",
        slug: "conserve",
      },
      {
        id: "haqvi",
        title: "Sauces et aromes",
        slug: "sauces-et-aromes",
      },
      {
        id: "nvghd",
        title: "Oeufs",
        slug: "oeufs",
      },
    ],
  },
  {
    id: "otshf",
    title: "Produits locaux",
    slug: "produits-locaux",
    isLink: false,
    subcat: [
      {
        id: "maqpx",
        title: "Café capsule & Moulu",
        slug: "cafe-capsule-moulu",
      },
    ],
  },
  {
    id: "hftws",
    title: "Divers Produits",
    slug: "divers-produits",
    isLink: false,
    subcat: [
      {
        id: "mbzui",
        title: "Café capsule & Moulu",
        slug: "cafe-capsule-moulu",
      },
    ],
  },
  {
    id: "ynegv",
    title: "Surgelées & charcuterie",
    slug: "surgelees-charcuterie",
    isLink: true,
    subcat: [
      {
        id: "qnxif",
        title: "Café capsule & Moulu",
        slug: "cafe-capsule-moulu",
      },
    ],
  },
  {
    id: "jkdve",
    title: "Boulangerie & Patisserie",
    slug: "boulangerie-patisserie",
    isLink: false,
    subcat: [
      {
        id: "xywvx",
        title: "Café capsule & Moulu",
        slug: "cafe-capsule-moulu",
      },
    ],
  },
  {
    id: "jiawb",
    title: "Produits locaux",
    slug: "produits-locaux",
    isLink: true,
  },
  {
    id: "lzaqp",
    title: "Divers Produits",
    slug: "divers-produits",
    isLink: true,
  },
];
