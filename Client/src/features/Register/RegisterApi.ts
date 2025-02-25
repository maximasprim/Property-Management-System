// src/features/register/registerApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterUser } from './RegisterSlice';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://property-management-system-api.onrender.com' }), // Adjust baseUrl as per your API endpoint
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, RegisterUser>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const useRegisterUserMutation: any = registerApi.useRegisterUserMutation;

export default registerApi;