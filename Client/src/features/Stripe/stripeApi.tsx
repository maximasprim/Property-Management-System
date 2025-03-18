import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TPayments {
    checkoutUrl: string;
    
}

export const PaymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    createPayments: builder.mutation<TPayments, { booking_id: number; amount: number; buyer_id: number }>({
      query: ({ booking_id, amount }) => {
        const buyer_id = localStorage.getItem("user_id"); // Fetch user_id from localStorage

        if (!buyer_id) {
          throw new Error("User ID not found in localStorage");
        }

        return {
          url: 'create-checkout-session',
          method: 'POST',
          body: {
            booking_id,
            amount,
            buyer_id: Number(buyer_id), // Ensure buyer_id is sent as a number
            success_url: 'http://localhost:5173/paymentsuccess',
            cancel_url: 'http://localhost:5173/paymentcancel',
          },
        };
      },
    }),
  }),
});

export const { useCreatePaymentsMutation } = PaymentsAPI;
