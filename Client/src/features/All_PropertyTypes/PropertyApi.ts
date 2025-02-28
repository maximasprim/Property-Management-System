import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { get } from "lodash";


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
    

}

export const propertiesApi = createApi({
  reducerPath: "propertiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Houses", "Lands", "Vehicles"],
  endpoints: (builder) => ({
    getHouses: builder.query<House[], void>({
          query: () => "/houses",
          providesTags: ["Houses"],
        }),
    getLands: builder.query<Land[],void>({
      query: () => "/lands",
      providesTags: ["Lands"],
    }),
    getVehicles: builder.query<Vehicle[],void>({
      query: () => "/vehicles",
      providesTags: ["Vehicles"],
    }),
    getHouseById: builder.query<House, number>({
      query: (property_id) => `houses/${property_id}`,
      providesTags: ["Houses"],
    }),
    getLandById: builder.query<Land, number>({
      query: (property_id) => `lands/${property_id}`,
      providesTags: ["Lands"],  
    }),
    getVehicleById: builder.query<Vehicle, number>({
      query: (property_id) => `vehicles/${property_id}`,
      providesTags: ["Vehicles"],
    }),  
  }),
  
});

export const { useGetHousesQuery, useGetLandsQuery, useGetVehiclesQuery,useGetHouseByIdQuery,useGetLandByIdQuery,useGetVehicleByIdQuery } = propertiesApi;
