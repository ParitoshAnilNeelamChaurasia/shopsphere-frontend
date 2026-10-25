import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types/models';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.product.id === action.payload.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, existing.product.stock);
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    addQuantity: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const existing = state.items.find((item) => item.product.id === action.payload.product.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + action.payload.quantity, existing.product.stock);
      } else {
        state.items.push({ product: action.payload.product, quantity: Math.min(action.payload.quantity, action.payload.product.stock) });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((entry) => entry.product.id === action.payload);
      if (item) item.quantity = Math.min(item.quantity + 1, item.product.stock);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((entry) => entry.product.id === action.payload);
      if (!item) return;
      if (item.quantity === 1) {
        state.items = state.items.filter((entry) => entry.product.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  addQuantity,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
