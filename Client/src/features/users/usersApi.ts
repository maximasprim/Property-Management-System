import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Payment } from '../Payments/PaymentsApi';

export interface User {
  profile_picture?: string;
    user_id: number;
    full_name: string;
    email: string;
    contact_phone?: string;
    address?: string;
    role: string;
    created_at: string;
    updated_at: string;
    bookings?: [];
    payments?: [];
   
  }

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Replace with your actual API URL
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<any[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    fetchUserById: builder.query<User, number>({
        query: (user_id) => ({
          url: `/users/${user_id}`,
          method: 'GET',
        }),
      }),
    fetchUserWithBookings: builder.query<User, number>({
        query: (user_id) => ({
          url: `/users/withBookings/${user_id}`,
          method: 'GET',
        }),
      }),
    fetchUserWithPayments: builder.query<User, number>({
        query: (user_id) => ({
          url: `/users/withPayments/${user_id}`,
          method: 'GET',
        }),
      }),
    addUser: builder.mutation<any, Partial<any>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<any, Partial<any>>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.user_id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFetchUserWithBookingsQuery,
  useFetchUserWithPaymentsQuery,
} = usersApi;
