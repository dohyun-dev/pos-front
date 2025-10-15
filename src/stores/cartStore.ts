import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: string[];
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalAmount: 0,
  totalQuantity: 0,

  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        items: [...items, { ...item, quantity: 1 }],
      });
    }
    get().calculateTotals();
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
    get().calculateTotals();
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
    get().calculateTotals();
  },

  clearCart: () => {
    set({
      items: [],
      totalAmount: 0,
      totalQuantity: 0,
    });
  },

  calculateTotals: () => {
    const items = get().items;
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    set({ totalAmount, totalQuantity });
  },
}));
