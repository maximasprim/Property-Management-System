import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import {TIVehicles,TSVehicles,vehiclesTable } from "../Drizzle/schema";



export const vehiclesService = async ():Promise<TSVehicles[] | null> =>{
    return await db.query.vehiclesTable.findMany();

}

export const getVehiclesService = async (id: number): Promise<TSVehicles | undefined> => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.property_id, id)
    })
}

export const createVehicleService = async (vehicle: TIVehicles): Promise<TIVehicles> => {
    // Ensure images field contains URLs
    if (!Array.isArray(vehicle.images)) {
      throw new Error("Images must be an array of URLs");
    }
  
    // Insert house data directly into the database
    await db.insert(vehiclesTable).values(vehicle);
  
    return vehicle;
  };

export const updateVehiclesService = async (id: number, vehicles: TIVehicles) => {
    await db.update(vehiclesTable).set(vehicles).where(eq(vehiclesTable.property_id, id))
    return "vehicle updated successfully";
}

export const deleteVehiclesService = async (id: number) => {
    await db.delete(vehiclesTable).where(eq(vehiclesTable.property_id, id))
    return "vehicle deleted successfully";
}

export const getVehiclesWithHistoryService = async (): Promise<
  TSVehicles[] | null
> => {
  return await db.query.vehiclesTable.findMany({
    with: {
      history: {
        columns: {
          property_id: true,
          previous_owner: true,
          transfer_date: true,
          maintenance_cost: true,
          maintenance_date: true,
          maintenance_type: true,
          service_provider: true,
          tenant_name: true,
          lease_start: true,
          lease_end: true,
          tax_payment_date: true,
            tax_amount: true,
            legal_issue: true,
            resolution_date: true,
            permit_approval_date: true,
            disaster_type: true,
            disaster_date: true,
            disaster_description: true,
            status_after_disaster: true,
            environmental_assessment_date: true,
            insurance_policy_number: true,
            claim_date: true,
            claim_amount: true,
            crime_type: true,
            crime_date: true,
            valuation_date: true,
            property_value: true,
            dispute_type: true,
            dispute_status: true,
            dispute_resolution_date: true,

        },
      },
    },
  });
};

// export const getSingleUserWithBookingService = async (id:number): Promise<TSUsers[] | null> =>{
//     return await db.query.usersTable.findMany({
//         where: eq(usersTable.user_id,id),
//         with:{
//             bookings: {
//                 columns: {
//                   booking_id: true,
//                   vehicle_id: true,
//                   location_id: true,
//                   booking_date: true,
//                   return_date: true,
//                   total_amount: true,
//                 },
//               },
//             }
//     })
// }
