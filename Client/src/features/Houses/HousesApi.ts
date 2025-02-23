import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Land Type Definitions
export interface House {
  property_id: number;
  address: string;
  name: string;
  number_of_rooms: number;
  size: number;
  price: number;
  status: string;
  year_built: number;
  images: string[];

}

export const HousesApi = createApi({
  reducerPath: "housesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://property-management-system-api.onrender.com" }),
  endpoints: (builder) => ({
    fetchHouses: builder.query<House[], void>({
      query: () => "/houses",
    }),
  }),
});

export const { useFetchHousesQuery } = HousesApi;
