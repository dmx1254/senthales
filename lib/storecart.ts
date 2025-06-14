// lib/manage.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  favsItems: CartItem[];
  totalItems: number;
  totalAmount: number;
  totalFavsItems: number;
  addItem: (item: CartItem) => void;
  addFavsItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  removeFavsItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Helper functions pour calculer les totaux
const calculateTotalItems = (items: CartItem[]): number => {
  return items.length;
};

const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Création du store
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      favsItems: [],
      totalItems: 0,
      totalAmount: 0,
      totalFavsItems: 0,
      addItem: (newItem) => 
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          );

          let updatedItems: CartItem[];

          if (existingItemIndex > -1) {
            // Update quantity if item exists
            updatedItems = state.items.map((item, index) => {
              if (index === existingItemIndex) {
                return {
                  ...item,
                  quantity: item.quantity + newItem.quantity,
                };
              }
              return item;
            });
          } else {
            // Add new item if it doesn't exist
            updatedItems = [...state.items, newItem];
          }

          return {
            items: updatedItems,
            totalItems: calculateTotalItems(updatedItems),
            totalAmount: calculateTotalAmount(updatedItems),
          };
        }),

      addFavsItem: (newItem) =>
        set((state) => {
          const existingItemIndex = state.favsItems.findIndex(
            (item) => item.id === newItem.id
          );
          if (existingItemIndex > -1) return { ...state };
          const updatedItems = [...state.favsItems, newItem];
          return {
            favsItems: updatedItems,
            totalFavsItems: calculateTotalItems(updatedItems),
          };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== itemId);
          return {
            items: updatedItems,
            totalItems: calculateTotalItems(updatedItems),
            totalAmount: calculateTotalAmount(updatedItems),
          };
        }),

      removeFavsItem: (itemId) =>
        set((state) => {
          const updatedItems = state.favsItems.filter(
            (item) => item.id !== itemId
          );
          return {
            favsItems: updatedItems,
            totalFavsItems: calculateTotalItems(updatedItems),
          };
        }),

      updateQuantity: (itemId, newQuantity) =>
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === itemId) {
                return { ...item, quantity: Math.max(0, newQuantity) };
              }
              return item;
            })
            .filter((item) => item.quantity > 0);

          return {
            items: updatedItems,
            totalItems: calculateTotalItems(updatedItems),
            totalAmount: calculateTotalAmount(updatedItems),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0,
        }),
    }),
    {
      name: "cart-storage", // nom unique pour le localStorage
      storage: createJSONStorage(() => localStorage), // utilise localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      }),
    }
  )
);

// Hook pour obtenir le sous-total du panier avec formatage
export const useCartSubtotal = (): string => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  return new Intl.NumberFormat("sn-SN", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalAmount);
};

// Hook pour obtenir le nombre total d'articles
export const useCartItemsCount = (): number => {
  return useCartStore((state) => state.totalItems);
};

// Hook pour vérifier si le panier est vide
export const useIsCartEmpty = (): boolean => {
  return useCartStore((state) => state.items.length === 0);
};
