"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const hono_1 = require("hono");
const Bookings_controller_1 = require("./Bookings.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.bookingsRouter = new hono_1.Hono();
//get states
exports.bookingsRouter.get("/bookings", Bookings_controller_1.listBookings);
//get a single Driver    
exports.bookingsRouter.get("/bookings/:id", Bookings_controller_1.getSingleBooking);
//create State
exports.bookingsRouter.post("/bookings", (0, zod_validator_1.zValidator)('json', validators_1.bookingsSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), Bookings_controller_1.createBooking);
//update Driver
exports.bookingsRouter.put("/bookings/:id", Bookings_controller_1.updateBooking);
// delete Driver
exports.bookingsRouter.delete("/bookings/:id", Bookings_controller_1.deleteBooking);
// bookingsRouter.get("/bookingsWith-vehicle-and-user-and-payments", listBookingsWithVehicleAndUserAndPayments)
// bookingsRouter.get("/bookingsWith-vehicle-and-user-and-payments/:id", getSingleBookingWithVehicleAndPaymentsAndUser)
