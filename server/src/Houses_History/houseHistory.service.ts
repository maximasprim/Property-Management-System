import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIHouseHistory,TSHouseHistory,houseHistoryTable } from "../Drizzle/schema";



export const propertyHistoryService = async ():Promise<TSHouseHistory[] | null> =>{
    return await db.query.houseHistoryTable.findMany();

}

export const getHouseHistoryService = async (id: number): Promise<TSHouseHistory | undefined> => {
    return await db.query.houseHistoryTable.findFirst({
        where: eq(houseHistoryTable.history_id, id)
    })
}

export const createHouseHistoryService = async (history: TIHouseHistory): Promise<TIHouseHistory> => {
    await db.insert(houseHistoryTable).values(history)
    return history;
}

export const updateHouseHistoryService = async (id: number, history: TIHouseHistory) => {
    await db.update(houseHistoryTable).set(history).where(eq(houseHistoryTable.history_id, id))
    return history;
}

export const deleteHouseHistoryService = async (id: number) => {
    await db.delete(houseHistoryTable).where(eq(houseHistoryTable.history_id, id))
    return "HouseHistory deleted successfully";
}

// export const getPropertyHistoryWithBookingsService = async (): Promise<
//   TSPropertyHistory[] | null
// > => {
//   return await db.query.houseHistoryTable.findMany({
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
//     return await db.query.houseHistoryTable.findMany({
//         where: eq(houseHistoryTable.history_id,id),
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
//   return await db.query.houseHistoryTable.findMany({
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
//   return await db.query.houseHistoryTable.findMany({
//     where: eq(houseHistoryTable.history_id,id),
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