import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIPropertyHistory,TSPropertyHistory,propertyHistoryTable } from "../Drizzle/schema";



export const propertyHistoryService = async ():Promise<TSPropertyHistory[] | null> =>{
    return await db.query.propertyHistoryTable.findMany();

}

export const getPropertyHistoryService = async (id: number): Promise<TSPropertyHistory | undefined> => {
    return await db.query.propertyHistoryTable.findFirst({
        where: eq(propertyHistoryTable.history_id, id)
    })
}

export const createPropertyHistoryService = async (history: TIPropertyHistory): Promise<TIPropertyHistory> => {
    await db.insert(propertyHistoryTable).values(history)
    return history;
}

export const updatePropertyHistoryService = async (id: number, history: TIPropertyHistory) => {
    await db.update(propertyHistoryTable).set(history).where(eq(propertyHistoryTable.history_id, id))
    return history;
}

export const deletePropertyHistoryService = async (id: number) => {
    await db.delete(propertyHistoryTable).where(eq(propertyHistoryTable.history_id, id))
    return "PropertyHistory deleted successfully";
}

// export const getPropertyHistoryWithBookingsService = async (): Promise<
//   TSPropertyHistory[] | null
// > => {
//   return await db.query.propertyHistoryTable.findMany({
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

// export const getSinglePropertyHistoryWithBookingService = async (id:number): Promise<TSPropertyHistory[] | null> =>{
//     return await db.query.propertyHistoryTable.findMany({
//         where: eq(propertyHistoryTable.history_id,id),
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

// export const getPropertyHistoryWithTicketsService = async (): Promise<
//   TSPropertyHistory[] | null
// > => {
//   return await db.query.propertyHistoryTable.findMany({
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
// export const getSinglePropertyHistoryWithTicketsService = async (id:number): Promise<
//   TSPropertyHistory[] | null
// > => {
//   return await db.query.propertyHistoryTable.findMany({
//     where: eq(propertyHistoryTable.history_id,id),
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