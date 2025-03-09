import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface VehicleHistory {
  history_id: number;
  property_id: number;
  previous_owner: string;
  transfer_date: string;
  maintenance_type: string;
  maintenance_date: string;
  service_provider: string;
  maintenance_cost: number;
  tenant_name: string;
  lease_start: string;
  
}


export const vehicleHistoryApi = createApi({
  reducerPath: "vehicleHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "localhost:3000" }), // Adjust API base URL if needed
  tagTypes: ["VehicleHistory"],
  endpoints: (builder) => ({
    addVehicleHistory: builder.mutation({
      query: (newHistory) => ({
        url: "/vehiclesHistory",
        method: "POST",
        body: newHistory,
      }),
        invalidatesTags: ["VehicleHistory"],
    }),
    getVehicleHistories: builder.query({
      query: () => "/vehicle-history",
    }),
    updateVehicleHistory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/vehiclesHistory/${id}`,
        method: "PUT",
        body: patch,
      }),
        invalidatesTags: ["VehicleHistory"],
    }),
    deleteVehicleHistory: builder.mutation({
      query: (id) => ({
        url: `/vehiclesHistory/${id}`,
        method: "DELETE",
      }),
        invalidatesTags: ["VehicleHistory"],
    }),
  }),
});

export const { useAddVehicleHistoryMutation, useGetVehicleHistoriesQuery,useUpdateVehicleHistoryMutation,useDeleteVehicleHistoryMutation } = vehicleHistoryApi;
