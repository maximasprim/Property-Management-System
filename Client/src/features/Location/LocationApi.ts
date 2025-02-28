// redux/locationsSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Location {
  name_of_branch: string;
  address: string;
  city: string;
  country: string;
  zip_code: string;
//   created_at: string;
//   updated_at: string;
}

interface UpdateLocation {
  address: string;
  name_of_branch?: string;
  city?: string;
  country?: string;
  zip_code?: string;
}

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Locations"],
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => "/location",
      providesTags: ["Locations"],
    }),
    createLocation: builder.mutation<Location, Partial<Location>>({
          query: (newLand) => ({
            url: "/location",
            method: "POST",
            body: newLand,
          }),
          invalidatesTags: ["Locations"],
        }),
    updateLocation: builder.mutation<Location, UpdateLocation>({
      query: ({ address, ...patch }) => ({
        url: `/location/${address}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Locations"],
    }),
    deleteLocation: builder.mutation<{ success: boolean }, string>({
      query: (address) => ({
        url: `/location/${address}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Locations"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationsApi;
