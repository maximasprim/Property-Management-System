import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TILandHistory,TSLandHistory,landHistoryTable } from "../Drizzle/schema";



export const landHistoryService = async ():Promise<TSLandHistory[] | null> =>{
    return await db.query.landHistoryTable.findMany();

}

export const getLandHistoryService = async (id: number): Promise<TSLandHistory | undefined> => {
    return await db.query.landHistoryTable.findFirst({
        where: eq(landHistoryTable.history_id, id)
    })
}

export const createLandHistoryService = async (history: TILandHistory): Promise<TILandHistory> => {
    await db.insert(landHistoryTable).values(history)
    return history;
}

export const updateLandHistoryService = async (id: number, history: TILandHistory) => {
    await db.update(landHistoryTable).set(history).where(eq(landHistoryTable.history_id, id))
    return history;
}

export const deleteLandHistoryService = async (id: number) => {
    await db.delete(landHistoryTable).where(eq(landHistoryTable.history_id, id))
    return "LandHistory deleted successfully";
}

// export const getLandHistoryWithBookingsService = async (): Promise<
//   TSLandHistory[] | null
// > => {
//   return await db.query.landHistoryTable.findMany({
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

// export const getSingleLandHistoryWithBookingService = async (id:number): Promise<TSLandHistory[] | null> =>{
//     return await db.query.landHistoryTable.findMany({
//         where: eq(landHistoryTable.history_id,id),
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

// export const getLandHistoryWithTicketsService = async (): Promise<
//   TSLandHistory[] | null
// > => {
//   return await db.query.landHistoryTable.findMany({
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           history_id: true,
//           subject: true,
//           description: true,
//           status: true
          
//         },
//       },
//     },
//   });
// };
// export const getSingleLandHistoryWithTicketsService = async (id:number): Promise<
//   TSLandHistory[] | null
// > => {
//   return await db.query.landHistoryTable.findMany({
//     where: eq(landHistoryTable.history_id,id),
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           history_id: true,
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