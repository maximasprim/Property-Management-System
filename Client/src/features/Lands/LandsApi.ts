import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Land Type Definitions
export interface Land {
  property_id: number;
  location: string | null;
  size: number;
  price: number;
  status: string;
  land_type: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

export const landsApi = createApi({
  reducerPath: "landsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    fetchLands: builder.query<Land[], void>({
      query: () => "/lands",
    }),
  }),
});

export const { useFetchLandsQuery } = landsApi;
