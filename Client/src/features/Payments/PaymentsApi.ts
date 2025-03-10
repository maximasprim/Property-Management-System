// src/features/users/usersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface Payment {
  payment_id: number;
  transaction_id: string;
  property_name: string;
  property_type: string;
  amount: number;
  payment_method: string;
  status: string;
  transaction_date: string;
};

export const usersApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust API base URL
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    fetchUserWithPayments: builder.query({
      query: (userId) => `users/${userId}/payments`,
    }),
  }),
});

export const { useFetchUserWithPaymentsQuery } = usersApi;
