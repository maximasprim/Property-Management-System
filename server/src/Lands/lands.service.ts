import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TILand,TSLand,landTable } from "../Drizzle/schema";
// import cloudinary from "../cloudinary";



export const landService = async ():Promise<TSLand[] | null> =>{
    return await db.query.landTable.findMany();

}

export const getLandService = async (id: number): Promise<TSLand | undefined> => {
    return await db.query.landTable.findFirst({
        where: eq(landTable.property_id, id)
    })
}

export const createLandService = async (land: TILand): Promise<TILand> => {
    // Ensure images field contains URLs
    if (!Array.isArray(land.images)) {
      throw new Error("Images must be an array of URLs");
    }
  
    // Insert house data directly into the database
    await db.insert(landTable).values(land);
  
    return land;
  };
export const updateLandService = async (id: number, house: TILand) => {
    await db.update(landTable).set(house).where(eq(landTable.property_id, id))
    return house;
}

export const deleteLandService = async (id: number) => {
    await db.delete(landTable).where(eq(landTable.property_id, id))
    return "Land deleted successfully";
}

export const getLandsWithHistoryService = async (): Promise<
  TSLand[] | null
> => {
  return await db.query.landTable.findMany({
    with: {
      history: {
        columns: {
          property_id: true,
          previous_owner: true,
          transfer_date: true,
          tenant_name: true,
          lease_start: true,
          lease_end: true,
            legal_issue: true,
            resolution_date: true,
            permit_approval_date: true,
            disaster_type: true,
            disaster_date: true,
            disaster_description: true,
            status_after_disaster: true,
            environmental_assessment_date: true,
            crime_type: true,
            crime_date: true,
            valuation_date: true,
            property_value: true,
            dispute_type: true,
            dispute_status: true,
            dispute_resolution_date: true,
            feedback_date: true,
            tenant_feedback: true

        },
      },
    },
  });
};

// export const getLandWithBookingsService = async (): Promise<
//   TSLand[] | null
// > => {
//   return await db.query.landTable.findMany({
//     with: {
//       bookings: {
//         columns: {
//           booking_id: true,
//           land_id: true,
//           location_id: true,
//           booking_date: true,
//           return_date: true,
//           total_amount: true,
//         },
//       },
//     },
//   });
// };

// export const getSingleLandWithBookingService = async (id:number): Promise<TSLand[] | null> =>{
//     return await db.query.landTable.findMany({
//         where: eq(landTable.house_id,id),
//         with:{
//             bookings: {
//                 columns: {
//                   booking_id: true,
//                   land_id: true,
//                   location_id: true,
//                   booking_date: true,
//                   return_date: true,
//                   total_amount: true,
//                 },
//               },
//             }
//     })
// }

// export const getLandWithTicketsService = async (): Promise<
//   TSLand[] | null
// > => {
//   return await db.query.landTable.findMany({
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
// export const getSingleLandWithTicketsService = async (id:number): Promise<
//   TSLand[] | null
// > => {
//   return await db.query.landTable.findMany({
//     where: eq(landTable.house_id,id),
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