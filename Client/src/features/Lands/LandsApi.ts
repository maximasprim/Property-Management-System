import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Land and Land History Type Definitions
export interface LandHistory {
  history_id: number;
  property_id: number;
  previous_owner?: string;
  transfer_date: string;
  tenant_name?: string;
  lease_start?: string;
  lease_end?: string;
  legal_issue?: string;
  resolution_date?: string;
  permit_approval_date?: string;
  disaster_type?: string;
  disaster_description?: string;
  disaster_date?: string;
  status_after_disaster?: string;
  environmental_assessment_date?: string;
  crime_type?: string;
  crime_date?: string;
  valuation_date?: string;
  property_value?: number;
  dispute_type?: string;
  dispute_status?: string;
  dispute_resolution_date?: string;
  tenant_feedback?: string;
  feedback_date?: string;
}

export interface Land {
  property_id: number;
  location: string | null;
  size: number;
  property_name: string;
  price: number;
  status: string;
  land_type: string;
  images: string[];
  created_at: string;
  updated_at: string;
  land_history: LandHistory[]; // Nested history
}

export const landsApi = createApi({
  reducerPath: "landsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Lands"],
  endpoints: (builder) => ({
    fetchLandsWithHistory: builder.query<Land[], void>({
      query: () => "/landWithHistory",
      providesTags: ["Lands"],
    }),
    getLands: builder.query<Land[], void>({
      query: () => "/lands",
      providesTags: ["Lands"],
    }),
    getLandById: builder.query<Land, number>({
      query: (id) => `/lands/${id}`,
      providesTags: ["Lands"],
    }),
    getLandHistory: builder.query<LandHistory[], number>({
      query: (id) => `/lands/history/${id}`,
      providesTags: ["Lands"],
    }),
    createLand: builder.mutation<Land, Partial<Land>>({
      query: (newLand) => ({
        url: "/lands",
        method: "POST",
        body: newLand,
      }),
      invalidatesTags: ["Lands"],
    }),
    updateLand: builder.mutation<Land, Partial<Land>>({
      query: ({ property_id, ...rest }) => ({
        url: `/lands/${property_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Lands"],
    }),
    deleteLand: builder.mutation<{ success: boolean; property_id: number }, number>({
      query: (property_id) => ({
        url: `/lands/${property_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lands"],
    }),
  }),
});

export const {
  useFetchLandsWithHistoryQuery,
  useGetLandsQuery,
  useGetLandByIdQuery,
  useGetLandHistoryQuery,
  useCreateLandMutation,
  useUpdateLandMutation,
  useDeleteLandMutation,
} = landsApi;
