import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("sn-SN", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const shippingOptions = [
  {
    id: 1,
    name: "Senthales 4h:Dakar Livraison dans les alentours de Dieuppeul 1",
    price: 1500,
    deliveryZone:
      "Castor / Zone de Captage / Derklé / Liberté 1 à 6 / Hlm / Grand Dakar / Colobane / Mérmoz / Sacré coeur / Scat urbam / Grand yoff / Mariste",
  },
  {
    id: 2,
    name: "Senthales: 8h Dakar rapide et éfficace",
    price: 2000,
    deliveryZone:
      "Point E / Fass / Médina / Yarakh / Hann Bel-Air / Plateau / Sicap Foire / Patte D'oie / Ouest Foire / Nord Foire / Cité Ataya / Cité Damél / Ouakam / Yoff Virage / Cité Biagui / Ngor Almadies / Mamelle / Parcelle / Pikine",
  },
  {
    id: 3,
    name: "Senthales 8h: Banlieue rapide et éfficace",
    price: 2500,
    deliveryZone: "Guédiawaye / Golf / Hamo 6 / Thiaroye",
  },
  {
    id: 4,
    name: "Senthales: Express Dakar dans la horaire interval 2h environ",
    price: 3000,
    deliveryZone:
      "Livraison Express-Dakar dans la Tranche Horaire que vous aurez choisie - intérval 2h environ",
  },
  {
    id: 5,
    name: "Senthales 8h: Banlieue Rapide et Efficace",
    price: 3500,
    deliveryZone:
      "Yeumbeul / Sicap Mbao / Fass Mbao / Keur Mbaye Fall / Zac Mbao / Keur Massar / Malika / Almadie 2 Sédima / Rufisque",
  },
  {
    id: 6,
    name: "Senthales: Express dans les 3h Banlieue Rapide et éfficace",
    price: 4000,
    deliveryZone:
      "Livraison Express : Pikine / Guédiawaye / Thiaroye / Keur Mbaye Fall / Yeumbeul / Zac Mbao / Keur massar / Malika / Rufisque",
  },
  {
    id: 7,
    name: "Senthales 24h: Dans les Régions Rapide et Efficace",
    price: 5000,
    deliveryZone: "Livraison dans les Région: 24h rapide et éfficace",
  },
];

export interface FormDataAddress {
  fullname: string;
  address: string;
  city: string;
  phone: string;
  zip: string;
}

export interface UserR {
  _id: string;
  gender: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductR {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subCategory: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface FormDataAddressR {
  fullname: string;
  address: string;
  city: string;
  phone: string;
  zip: string;
}

export interface OrderR {
  _id: string;
  userId: string;
  products: ProductR[];
  totalPrice: number;
  shipping: number;
  paymentMethod: string;
  shippingZone: string;
  shippingDetails: FormDataAddressR;
  paymentStatus: string;
  orderNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export const covertDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const generateOrderNumber = () => {
  return Math.random().toString(36).substring(2, 10);
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
