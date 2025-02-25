// src/features/login/loginApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setError } from './loginSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://property-management-system-api.onrender.com/' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<any, { username: string; password: string }>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch (error) {
          dispatch(setError('Invalid username or password'));
        }
      },
    }),
  }),
});

export const useLoginUserMutation: any = authApi.useLoginUserMutation;