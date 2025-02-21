"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHouseHistoryService = exports.updateHouseHistoryService = exports.createHouseHistoryService = exports.getHouseHistoryService = exports.propertyHistoryService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const propertyHistoryService = async () => {
    return await db_1.default.query.houseHistoryTable.findMany();
};
exports.propertyHistoryService = propertyHistoryService;
const getHouseHistoryService = async (id) => {
    return await db_1.default.query.houseHistoryTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.houseHistoryTable.history_id, id)
    });
};
exports.getHouseHistoryService = getHouseHistoryService;
const createHouseHistoryService = async (history) => {
    await db_1.default.insert(schema_1.houseHistoryTable).values(history);
    return history;
};
exports.createHouseHistoryService = createHouseHistoryService;
const updateHouseHistoryService = async (id, history) => {
    await db_1.default.update(schema_1.houseHistoryTable).set(history).where((0, drizzle_orm_1.eq)(schema_1.houseHistoryTable.history_id, id));
    return history;
};
exports.updateHouseHistoryService = updateHouseHistoryService;
const deleteHouseHistoryService = async (id) => {
    await db_1.default.delete(schema_1.houseHistoryTable).where((0, drizzle_orm_1.eq)(schema_1.houseHistoryTable.history_id, id));
    return "HouseHistory deleted successfully";
};
exports.deleteHouseHistoryService = deleteHouseHistoryService;
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
