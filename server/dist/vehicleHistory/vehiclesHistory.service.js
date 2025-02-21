"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehiclesHistoryService = exports.updateVehiclesHistoryService = exports.createVehiclesHistoryService = exports.getVehiclesHistoryService = exports.vehiclesHistoryService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const vehiclesHistoryService = async () => {
    return await db_1.default.query.vehiclesHistoryTable.findMany();
};
exports.vehiclesHistoryService = vehiclesHistoryService;
const getVehiclesHistoryService = async (id) => {
    return await db_1.default.query.vehiclesHistoryTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehiclesHistoryTable.history_id, id)
    });
};
exports.getVehiclesHistoryService = getVehiclesHistoryService;
const createVehiclesHistoryService = async (history) => {
    await db_1.default.insert(schema_1.vehiclesHistoryTable).values(history);
    return history;
};
exports.createVehiclesHistoryService = createVehiclesHistoryService;
const updateVehiclesHistoryService = async (id, history) => {
    await db_1.default.update(schema_1.vehiclesHistoryTable).set(history).where((0, drizzle_orm_1.eq)(schema_1.vehiclesHistoryTable.history_id, id));
    return history;
};
exports.updateVehiclesHistoryService = updateVehiclesHistoryService;
const deleteVehiclesHistoryService = async (id) => {
    await db_1.default.delete(schema_1.vehiclesHistoryTable).where((0, drizzle_orm_1.eq)(schema_1.vehiclesHistoryTable.history_id, id));
    return "VehiclesHistory deleted successfully";
};
exports.deleteVehiclesHistoryService = deleteVehiclesHistoryService;
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
