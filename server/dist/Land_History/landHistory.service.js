"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLandHistoryService = exports.updateLandHistoryService = exports.createLandHistoryService = exports.getLandHistoryService = exports.landHistoryService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const landHistoryService = async () => {
    return await db_1.default.query.landHistoryTable.findMany();
};
exports.landHistoryService = landHistoryService;
const getLandHistoryService = async (id) => {
    return await db_1.default.query.landHistoryTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.landHistoryTable.history_id, id)
    });
};
exports.getLandHistoryService = getLandHistoryService;
const createLandHistoryService = async (history) => {
    await db_1.default.insert(schema_1.landHistoryTable).values(history);
    return history;
};
exports.createLandHistoryService = createLandHistoryService;
const updateLandHistoryService = async (id, history) => {
    await db_1.default.update(schema_1.landHistoryTable).set(history).where((0, drizzle_orm_1.eq)(schema_1.landHistoryTable.history_id, id));
    return history;
};
exports.updateLandHistoryService = updateLandHistoryService;
const deleteLandHistoryService = async (id) => {
    await db_1.default.delete(schema_1.landHistoryTable).where((0, drizzle_orm_1.eq)(schema_1.landHistoryTable.history_id, id));
    return "LandHistory deleted successfully";
};
exports.deleteLandHistoryService = deleteLandHistoryService;
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
