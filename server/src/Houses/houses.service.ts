import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIHouses,TSHouses,housesTable } from "../Drizzle/schema";
// import cloudinary from "../cloudinary";



export const housesService = async ():Promise<TSHouses[] | null> =>{
    return await db.query.housesTable.findMany();

}

export const getHouseService = async (id: number): Promise<TSHouses | undefined> => {
    return await db.query.housesTable.findFirst({
        where: eq(housesTable.property_id, id)
    })
}

export const createHouseService = async (houses: TIHouses): Promise<TIHouses> => {
    // Ensure images field contains URLs
    if (!Array.isArray(houses.images)) {
      throw new Error("Images must be an array of URLs");
    }
  
    // Insert house data directly into the database
    await db.insert(housesTable).values(houses);
  
    return houses;
  };
export const updateHouseService = async (id: number, house: TIHouses) => {
    await db.update(housesTable).set(house).where(eq(housesTable.property_id, id))
    return house;
}

export const deleteHouseService = async (id: number) => {
    await db.delete(housesTable).where(eq(housesTable.property_id, id))
    return "House deleted successfully";
}
export const getHousesWithHistoryService = async (): Promise<
  TSHouses[] | null
> => {
  return await db.query.housesTable.findMany({
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
            legal_issue: true,
            resolution_date: true,
            disaster_type: true,
            disaster_date: true,
            disaster_description: true,
            status_after_disaster: true,
            environmental_assessment_date: true,
            crime_type: true,
            crime_date: true,
            valuation_date: true,
            property_value: true,
            utility_type: true,
            utility_installation_amount: true,
            utility_installation_date: true,
            tenant_feedback: true,
            feedback_date: true,
            construction_date: true,
            renovation_date: true,

        },
      },
    },
  });
};
// export const getHouseWithBookingsService = async (): Promise<
//   TSHouses[] | null
// > => {
//   return await db.query.housesTable.findMany({
//     with: {
//       bookings: {
//         columns: {
//           booking_id: true,
//           vehicle_id: true,
//           location_id: true,
//           booking_date: true,
//           return_date: true,
//           total_amount: true,
//         },
//       },
//     },
//   });
// };

// export const getSingleHouseWithBookingService = async (id:number): Promise<TSHouses[] | null> =>{
//     return await db.query.housesTable.findMany({
//         where: eq(housesTable.house_id,id),
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

// export const getHouseWithTicketsService = async (): Promise<
//   TSHouses[] | null
// > => {
//   return await db.query.housesTable.findMany({
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           house_id: true,
//           subject: true,
//           description: true,
//           status: true
          
//         },
//       },
//     },
//   });
// };
// export const getSingleHouseWithTicketsService = async (id:number): Promise<
//   TSHouses[] | null
// > => {
//   return await db.query.housesTable.findMany({
//     where: eq(housesTable.house_id,id),
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           house_id: true,
//           subject: true,
//           description: true,
//           status: true,
//           created_at:true,
//           updated_at:true
          
//         },
//       },
//     },
//   });
// };