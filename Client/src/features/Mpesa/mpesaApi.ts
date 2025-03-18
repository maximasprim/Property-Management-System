import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define API base URL
const BASE_URL = "http://localhost:3000"; // Replace with your actual backend URL

// Define TypeScript interfaces for payment data and response
interface PaymentData {
  amount: number;
  phoneNumber: string;
  propertyType: string;
  propertyName: string;
  bookingId: number;
  buyerId: number;
  paymentMethod: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  checkoutUrl?: string;
}

// Create API slice
export const mpesaApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    processPayment: builder.mutation<ApiResponse, PaymentData>({
      query: (paymentData) => ({
        url: "/initiate",
        method: "POST",
        body: paymentData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useProcessPaymentMutation } = mpesaApi;
