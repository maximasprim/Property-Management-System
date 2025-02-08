import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIVehiclesHistory,TSVehiclesHistory,vehiclesHistoryTable } from "../Drizzle/schema";



export const vehiclesHistoryService = async ():Promise<TSVehiclesHistory[] | null> =>{
    return await db.query.vehiclesHistoryTable.findMany();

}

export const getVehiclesHistoryService = async (id: number): Promise<TSVehiclesHistory | undefined> => {
    return await db.query.vehiclesHistoryTable.findFirst({
        where: eq(vehiclesHistoryTable.history_id, id)
    })
}

export const createVehiclesHistoryService = async (history: TIVehiclesHistory): Promise<TIVehiclesHistory> => {
    await db.insert(vehiclesHistoryTable).values(history)
    return history;
}

export const updateVehiclesHistoryService = async (id: number, history: TIVehiclesHistory) => {
    await db.update(vehiclesHistoryTable).set(history).where(eq(vehiclesHistoryTable.history_id, id))
    return history;
}

export const deleteVehiclesHistoryService = async (id: number) => {
    await db.delete(vehiclesHistoryTable).where(eq(vehiclesHistoryTable.history_id, id))
    return "VehiclesHistory deleted successfully";
}

// export const getVehiclesHistoryWithBookingsService = async (): Promise<
//   TSVehiclesHistory[] | null
// > => {
//   return await db.query.vehiclesHistoryTable.findMany({
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

// export const getSingleVehiclesHistoryWithBookingService = async (id:number): Promise<TSVehiclesHistory[] | null> =>{
//     return await db.query.vehiclesHistoryTable.findMany({
//         where: eq(vehiclesHistoryTable.history_id,id),
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

// export const getVehiclesHistoryWithTicketsService = async (): Promise<
//   TSVehiclesHistory[] | null
// > => {
//   return await db.query.vehiclesHistoryTable.findMany({
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
// export const getSingleVehiclesHistoryWithTicketsService = async (id:number): Promise<
//   TSVehiclesHistory[] | null
// > => {
//   return await db.query.vehiclesHistoryTable.findMany({
//     where: eq(vehiclesHistoryTable.history_id,id),
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