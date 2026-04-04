import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;    // e.g. "Mustard Edition"
  finish: string;     // e.g. "Graphite Grey" — the selected finish color
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Notification State
  toast: { show: boolean; message: string } | null;
  
  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  showNotification: (message: string) => void;
  clearNotification: () => void;
  removeItem: (id: string, finish: string) => void;
  updateQuantity: (id: string, finish: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  // Computers
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toast: null,

      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id && item.finish === newItem.finish
          );
          
          // Trigger toast
          setTimeout(() => get().clearNotification(), 3000);
          const toast = { show: true, message: `${newItem.name.toUpperCase()} [${newItem.finish.toUpperCase()}] ADDED_TO_MANIFEST` };

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id && item.finish === newItem.finish
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              toast,
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }], toast };
        });
      },

      showNotification: (message) => set({ toast: { show: true, message } }),
      clearNotification: () => set({ toast: null }),

      removeItem: (id, finish) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.finish === finish)
          ),
        }));
      },

      updateQuantity: (id, finish, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.finish === finish
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "veef-cart-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
