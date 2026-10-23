import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import ordersReducer from '../features/orders/ordersSlice';
import productCatalogReducer from '../features/productCatalog/productCatalogSlice';

import { productApi } from '../services/productApi';
import { ordersApi } from '../features/orders/ordersApi';

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    productCatalog: productCatalogReducer,
    [productApi.reducerPath]: productApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },

  preloadedState: {
    cart: readStorage('shopsphere-cart', { items: [] }),
    wishlist: readStorage('shopsphere-wishlist', { items: [] }),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      ordersApi.middleware,
    ),
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('shopsphere-cart', JSON.stringify(state.cart));
  localStorage.setItem('shopsphere-wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('shopsphere-orders', JSON.stringify(state.orders));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;