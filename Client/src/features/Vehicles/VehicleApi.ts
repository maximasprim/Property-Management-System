import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Vehicles and Vehicle History Types
export interface VehicleHistory {
  history_id: number;
  property_id: number;
  previous_owner?: string;
  transfer_date?: string;
  maintenance_type?: string;
  maintenance_date?: string;
  service_provider?: string;
  maintenance_cost?: number;
  tenant_name?: string;
  lease_start?: string;
  lease_end?: string;
  tax_payment_date?: string;
  tax_amount?: number;
  legal_issue?: string;
  resolution_date?: string;
  permit_approval_date?: string;
  disaster_type?: string;
  disaster_description?: string;
  disaster_date?: string;
  status_after_disaster?: string;
  environmental_assessment_date?: string;
  insurance_policy_number?: string;
  claim_date?: string;
  claim_amount?: number;
  crime_type?: string;
  crime_date?: string;
  valuation_date?: string;
  property_value?: number;
  dispute_type?: string;
  dispute_status?: string;
  dispute_resolution_date?: string;
}

export interface Vehicle {
  property_id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  status: string;
  price: number;
  mileage: number;
  fuel_type?: string;
  location?: string;
  images: string[];
  created_at: string;
  updated_at: string;
  vehicle_history: VehicleHistory[]; // Nested history
}

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    fetchVehiclesWithHistory: builder.query<Vehicle[], void>({
      query: () => 'vehicleshistory',
    }),
    getVehicles: builder.query({
      query: () => 'vehicles',
    }),
    getVehicleById: builder.query({
      query: (id) => `vehicles/${id}`,
    }),
    getVehicleHistory: builder.query({
      query: (id) => `vehiclesHistory/${id}`,
    }),
    createVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (newVehicle: Vehicle) => ({
        url: 'vehicles',
        method: 'POST',
        body: newVehicle,
      }),
    }),
  }),
});

export const { useFetchVehiclesWithHistoryQuery,useGetVehiclesQuery,useGetVehicleHistoryQuery, useCreateVehicleMutation } = vehiclesApi;
