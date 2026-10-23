import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '../../types/models';

const defaultAddress = {
  fullName: 'Demo Customer',
  phone: '9876543210',
  line1: '221B Baker Street',
  city: 'Bengaluru',
  state: 'Karnataka',
  postalCode: '560001',
};

const demoOrder: Order = {
  id: 'SS-1001',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  status: 'SHIPPED',

  subtotal: 56998,
  shipping: 0,
  discount: 0,
  total: 56998,
  paymentMethod: 'CARD',
  address: defaultAddress,
  items: [
    {
      product: {
        id: 111,
        name: 'PixelView 4K Monitor',
        slug: 'pixelview-4k-monitor',
        brand: 'PixelView',
        category: 'Electronics',
        price: 29999,
        originalPrice: 34999,
        rating: 4.6,
        reviews: 407,
        stock: 9,
        image:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
        images: [],
        description: '4K UHD monitor for work and entertainment.',
        specifications: {},
      },
      quantity: 1,
      price: 29999,
    },
    {
      product: {
        id: 108,
        name: 'KeyForge Mechanical Keyboard',
        slug: 'keyforge-mechanical-keyboard',
        brand: 'KeyForge',
        category: 'Gaming',
        price: 5799,
        originalPrice: 6499,
        rating: 4.8,
        reviews: 941,
        stock: 29,
        image:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
        images: [],
        description: 'Mechanical keyboard.',
        specifications: {},
      },
      quantity: 2,
      price: 11598,
    },
    {
      product: {
        id: 102,
        name: 'Pulse X1 Smartwatch',
        slug: 'pulse-x1-smartwatch',
        brand: 'Pulse',
        category: 'Electronics',
        price: 4999,
        originalPrice: 6999,
        rating: 4.5,
        reviews: 892,
        stock: 34,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
        images: [],
        description: 'Smartwatch.',
        specifications: {},
      },
      quantity: 1,
      price: 4999,
    },
  ],
};

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = (() => {
  try {
    const saved = localStorage.getItem('shopsphere-orders');

    if (saved) {
      const parsed: unknown = JSON.parse(saved);

      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'orders' in parsed &&
        Array.isArray(parsed.orders)
      ) {
        return parsed as OrdersState;
      }
    }
  } catch {
    // Use the demo order if saved data cannot be read.
  }

  return { orders: [demoOrder] };
})();

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order['status'] }>,
    ) => {
      const order = state.orders.find((entry) => entry.id === action.payload.id);
      if (order) order.status = action.payload.status;
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
