"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.loginUserSchema = exports.registerUserSchema = exports.locationSchema = exports.landHistorySchema = exports.landsSchema = exports.paymentsSchema = exports.houseHistorySchema = exports.housesSchema = exports.bookingsSchema = exports.vehiclesHistorySchema = exports.vehicleSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
// user_id:z.number(),
// full_name:z.string(),
// email:z.string().email(),
// contact_phone:z.string(),
// address:z.string(),
// role:z.string()
});
exports.vehicleSchema = zod_1.z.object({});
exports.vehiclesHistorySchema = zod_1.z.object({});
exports.bookingsSchema = zod_1.z.object({});
exports.housesSchema = zod_1.z.object({});
exports.houseHistorySchema = zod_1.z.object({});
exports.paymentsSchema = zod_1.z.object({});
exports.landsSchema = zod_1.z.object({});
exports.landHistorySchema = zod_1.z.object({});
exports.locationSchema = zod_1.z.object({});
exports.registerUserSchema = zod_1.z.object({});
exports.loginUserSchema = zod_1.z.object({});
exports.reviewSchema = zod_1.z.object({});
