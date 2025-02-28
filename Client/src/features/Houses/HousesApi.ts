import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// House and House History Type Definitions
export interface HouseHistory {
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

export interface House {
  property_id: number;
  address: string;
  name: string;
  house_type: string;
  number_of_rooms: number;
  size: number;
  price: number;
  status: string;
  year_built: number;
  images: string[];
  created_at: string;
  updated_at: string;
  house_history: HouseHistory[]; // Nested history
}

export const HousesApi = createApi({
  reducerPath: "housesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Houses"],
  endpoints: (builder) => ({
    fetchHousesWithHistory: builder.query<House[], void>({
      query: () => "/housesWithHistory",
      providesTags: ["Houses"],
    }),
    getHouses: builder.query<House[], void>({
      query: () => "/houses",
      providesTags: ["Houses"],
    }),
    getHouseById: builder.query<House, number>({
      query: (id) => `/houses/${id}`,
      providesTags: ["Houses"],
    }),
    getHouseHistory: builder.query<HouseHistory[], number>({
      query: (id) => `/houses/history/${id}`,
      providesTags: ["Houses"],
    }),
    createHouse: builder.mutation<House, Partial<House>>({
      query: (newHouse) => ({
        url: "/houses",
        method: "POST",
        body: newHouse,
      }),
      invalidatesTags: ["Houses"],
    }),
    updateHouse: builder.mutation<House, Partial<House>>({
      query: ({ property_id, ...rest }) => ({
        url: `/houses/${property_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Houses"],
    }),
    deleteHouse: builder.mutation<{ success: boolean; property_id: number }, number>({
      query: (property_id) => ({
        url: `/houses/${property_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Houses"],
    }),
  }),
});

export const {
  useFetchHousesWithHistoryQuery,
  useGetHousesQuery,
  useGetHouseByIdQuery,
  useGetHouseHistoryQuery,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
} = HousesApi;
