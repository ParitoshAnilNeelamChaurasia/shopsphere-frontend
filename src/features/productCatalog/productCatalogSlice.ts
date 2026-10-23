import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { mockProducts } from '../../data/products';
import type { Product } from '../../types/models';

export interface ProductCatalogState {
  products: Product[];
}

const initialState: ProductCatalogState = {
  products: mockProducts,
};

const productCatalogSlice = createSlice({
  name: 'productCatalog',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productCatalogSlice.actions;
export default productCatalogSlice.reducer;
