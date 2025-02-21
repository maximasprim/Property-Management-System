"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLandService = exports.updateLandService = exports.createLandService = exports.getLandService = exports.landService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
// import cloudinary from "../cloudinary";
const landService = async () => {
    return await db_1.default.query.landTable.findMany();
};
exports.landService = landService;
const getLandService = async (id) => {
    return await db_1.default.query.landTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.landTable.property_id, id)
    });
};
exports.getLandService = getLandService;
const createLandService = async (land) => {
    // Ensure images field contains URLs
    if (!Array.isArray(land.images)) {
        throw new Error("Images must be an array of URLs");
    }
    // Insert house data directly into the database
    await db_1.default.insert(schema_1.landTable).values(land);
    return land;
};
exports.createLandService = createLandService;
const updateLandService = async (id, house) => {
    await db_1.default.update(schema_1.landTable).set(house).where((0, drizzle_orm_1.eq)(schema_1.landTable.property_id, id));
    return house;
};
exports.updateLandService = updateLandService;
const deleteLandService = async (id) => {
    await db_1.default.delete(schema_1.landTable).where((0, drizzle_orm_1.eq)(schema_1.landTable.property_id, id));
    return "Land deleted successfully";
};
exports.deleteLandService = deleteLandService;
// export const getLandWithBookingsService = async (): Promise<
//   TSLand[] | null
// > => {
//   return await db.query.landTable.findMany({
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
// export const getSingleLandWithBookingService = async (id:number): Promise<TSLand[] | null> =>{
//     return await db.query.landTable.findMany({
//         where: eq(landTable.house_id,id),
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
