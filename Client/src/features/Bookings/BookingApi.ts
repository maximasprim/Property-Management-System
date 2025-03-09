import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Booking {
    booking_id: number;
    property_type: string;
    property_name: string;
    property_id: number;
    total_amount: number;
    user_id: number;
    booking_date: string;
    status: string;
    location: string | null;
    users?: User;
    payments?: Payment;
  }

export interface Payment {
    payment_id: number;
    property_type: string;
    property_name: string;
    booking_id: number;
    amount: number;
    buyer_id: number;
    payment_method: string;
    transaction_id: string;
    status: string;
    transaction_date: string;
  }

export interface User {
    user_id: number;
    full_name: string;
    email: string;
    contact_phone: string | null;
    address: string | null;
  }
export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Bookings"],
    endpoints: (builder) => ({
      getBookings: builder.query({
        query: () => "/bookings",
        providesTags: ["Bookings"],
      }),
      getBookingsSummary: builder.query({
        query: () => "/bookingsSummary",
        providesTags: ["Bookings"],
      }),
      getSingleBookingDetails: builder.query<Booking,number>({
        query: (booking_id) => `/bookingsWithUserAndPayments/${booking_id}`,
        providesTags: ["Bookings"],
      }),

      deleteBooking: builder.mutation({
        query: (bookingId) => ({
          url: `/bookings/${bookingId}`,
          method: "DELETE",
        }),
      }),
      updateBooking: builder.mutation<Booking, Booking>({
            query: ({ booking_id, ...rest }) => ({
              url: `/bookings/${booking_id}`,
              method: "PUT",
              body: rest,
            }),
            invalidatesTags: ["Bookings"],
          }),

          createBooking: builder.mutation<Booking, Partial<Booking>>({
            query: (newBooking) => ({
              url: "/bookings",
              method: "POST",
              body: newBooking,
            }),
            invalidatesTags: ["Bookings"],
          }),
    }),
  });
  
  export const { useGetBookingsQuery, useDeleteBookingMutation, useUpdateBookingMutation, useGetSingleBookingDetailsQuery,useGetBookingsSummaryQuery,useCreateBookingMutation } = bookingApi;
  