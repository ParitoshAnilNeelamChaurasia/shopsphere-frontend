import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/axiosBaseQuery';
import type { Order } from '../../types/models';

// Request body sent to the backend when a customer places an order.
interface CreateOrderRequest {
  address: {
    fullName: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Order'],

  endpoints: (builder) => ({
    // Create a new order.
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Order'],
    }),

    // Fetch all orders belonging to the logged-in customer.
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: '/orders/me',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    // Fetch one order using its order ID.
    getOrderById: builder.query<Order, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, orderId) => [
        { type: 'Order', id: orderId },
      ],
    }),
  }),
});

// Export the hooks used by React components.
export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = ordersApi;
