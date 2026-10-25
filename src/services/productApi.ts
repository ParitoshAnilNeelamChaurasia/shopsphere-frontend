import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';
import { mockProducts } from '../data/products';
import type { PaginatedProducts, Product, ProductQuery } from '../types/models';
// import type { RootState } from '../store/store';
import type { ProductCatalogState } from '../features/productCatalog/productCatalogSlice';

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false';

const filterProducts = (products: Product[], query: ProductQuery): PaginatedProducts => {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 8;
  const search = query.search?.trim().toLowerCase() ?? '';

  let filtered = products.filter((product) => {
    const matchesSearch =
      !search ||
      `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(search);
    const matchesCategory = !query.category || product.category === query.category;
    return matchesSearch && matchesCategory;
  });

  if (query.sort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (query.sort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (query.sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (query.sort === 'newest') filtered = [...filtered].sort((a, b) => b.id - a.id);

  const totalElements = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    content: filtered.slice(start, start + pageSize),
    totalElements,
    totalPages,
    page: safePage,
    pageSize,
  };
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, ProductQuery>({
      async queryFn(query, api) {
        if (useMockApi) {
          // const state = api.getState() as RootState;
          const state = api.getState() as {
            productCatalog: ProductCatalogState;
          };
          const products = state.productCatalog?.products?.length
            ? state.productCatalog.products
            : mockProducts;
          return { data: filterProducts(products, query) };
        }

        return await axiosBaseQuery()<PaginatedProducts>({
          url: '/products',
          method: 'GET',
          params: query,
        });
      },
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product | undefined, number>({
      async queryFn(id, api) {
        if (useMockApi) {
          const state = api.getState() as {
            productCatalog: ProductCatalogState;
          };
          const product = state.productCatalog?.products?.find((entry) => entry.id === id);
          return { data: product };
        }

        return await axiosBaseQuery()<Product>({
          url: `/products/${id}`,
          method: 'GET',
        });
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
