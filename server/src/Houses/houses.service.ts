import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIHouses,TSHouses,housesTable } from "../Drizzle/schema";



export const housesService = async ():Promise<TSHouses[] | null> =>{
    return await db.query.housesTable.findMany();

}

export const getHouseService = async (id: number): Promise<TSHouses | undefined> => {
    return await db.query.housesTable.findFirst({
        where: eq(housesTable.house_id, id)
    })
}

export const createHouseService = async (house: TIHouses): Promise<TIHouses> => {
    await db.insert(housesTable).values(house)
    return house;
}

export const updateHouseService = async (id: number, house: TIHouses) => {
    await db.update(housesTable).set(house).where(eq(housesTable.house_id, id))
    return house;
}

export const deleteHouseService = async (id: number) => {
    await db.delete(housesTable).where(eq(housesTable.house_id, id))
    return "House deleted successfully";
}

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