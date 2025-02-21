"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHouseService = exports.updateHouseService = exports.createHouseService = exports.getHouseService = exports.housesService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
// import cloudinary from "../cloudinary";
const housesService = async () => {
    return await db_1.default.query.housesTable.findMany();
};
exports.housesService = housesService;
const getHouseService = async (id) => {
    return await db_1.default.query.housesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.housesTable.property_id, id)
    });
};
exports.getHouseService = getHouseService;
const createHouseService = async (houses) => {
    // Ensure images field contains URLs
    if (!Array.isArray(houses.images)) {
        throw new Error("Images must be an array of URLs");
    }
    // Insert house data directly into the database
    await db_1.default.insert(schema_1.housesTable).values(houses);
    return houses;
};
exports.createHouseService = createHouseService;
const updateHouseService = async (id, house) => {
    await db_1.default.update(schema_1.housesTable).set(house).where((0, drizzle_orm_1.eq)(schema_1.housesTable.property_id, id));
    return house;
};
exports.updateHouseService = updateHouseService;
const deleteHouseService = async (id) => {
    await db_1.default.delete(schema_1.housesTable).where((0, drizzle_orm_1.eq)(schema_1.housesTable.property_id, id));
    return "House deleted successfully";
};
exports.deleteHouseService = deleteHouseService;
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
