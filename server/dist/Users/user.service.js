"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserService = exports.usersService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const usersService = async () => {
    return await db_1.default.query.usersTable.findMany();
};
exports.usersService = usersService;
const getUserService = async (id) => {
    return await db_1.default.query.usersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.usersTable.user_id, id)
    });
};
exports.getUserService = getUserService;
const createUserService = async (user) => {
    await db_1.default.insert(schema_1.usersTable).values(user);
    return user;
};
exports.createUserService = createUserService;
const updateUserService = async (id, user) => {
    await db_1.default.update(schema_1.usersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.usersTable.user_id, id));
    return user;
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.user_id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
// export const getUserWithBookingsService = async (): Promise<
//   TSUsers[] | null
// > => {
//   return await db.query.usersTable.findMany({
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
// export const getSingleUserWithBookingService = async (id:number): Promise<TSUsers[] | null> =>{
//     return await db.query.usersTable.findMany({
//         where: eq(usersTable.user_id,id),
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
// export const getUserWithTicketsService = async (): Promise<
//   TSUsers[] | null
// > => {
//   return await db.query.usersTable.findMany({
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           user_id: true,
//           subject: true,
//           description: true,
//           status: true
//         },
//       },
//     },
//   });
// };
// export const getSingleUserWithTicketsService = async (id:number): Promise<
//   TSUsers[] | null
// > => {
//   return await db.query.usersTable.findMany({
//     where: eq(usersTable.user_id,id),
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           user_id: true,
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
