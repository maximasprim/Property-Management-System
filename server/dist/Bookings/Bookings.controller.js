"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getSingleBooking = exports.listBookings = void 0;
const Bookings_service_1 = require("./Bookings.service");
// import { createPaymentWithStripe } from "../Payments/payments.controller";
const listBookings = async (c) => {
    const data = await (0, Bookings_service_1.bookingsService)();
    if (data == null) {
        return c.text("Booking not Found", 404);
    }
    return c.json(data, 200);
};
exports.listBookings = listBookings;
const getSingleBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const booking = await (0, Bookings_service_1.getBookingsService)(id);
    if (booking == undefined) {
        return c.text(" not found!", 404);
    }
    return c.json(booking, 200);
};
exports.getSingleBooking = getSingleBooking;
const createBooking = async (c) => {
    try {
        const book = await c.req.json();
        // Create booking
        const createdBooking = await (0, Bookings_service_1.createBookingsService)(book);
        if (!createdBooking) {
            return c.text("Booking not created!", 404);
        }
        return c.json(createdBooking, 201);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.createBooking = createBooking;
const updateBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const booking = await c.req.json();
    try {
        //search for user
        const foundBooking = await (0, Bookings_service_1.getBookingsService)(id);
        if (foundBooking == undefined)
            return c.text("Booking not found!", 404);
        //get the data and update
        const res = await (0, Bookings_service_1.updateBookingsService)(id, booking);
        //return the updated user
        if (!res)
            return c.text("booking not updated!", 404);
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBooking = updateBooking;
//delete city
const deleteBooking = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const booking = await (0, Bookings_service_1.getBookingsService)(id);
        if (booking == undefined)
            return c.text("Booking not found!👽", 404);
        //delete the user
        const res = await (0, Bookings_service_1.deleteBookingsService)(id);
        if (!res)
            return c.text("Booking not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBooking = deleteBooking;
// export const listBookingsWithVehicleAndUserAndPayments = async (c: Context) =>{
//   const data = await getBookingWithVehicleAndPaymentsAndUserService();
//   if ( data == null){
//     return c.text("Booking not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const getSingleBookingWithVehicleAndPaymentsAndUser = async (c: Context) => {
//   const id = parseInt(c.req.param("id"));
//   if (isNaN(id)) 
//     return c.text("invalid ID!", 400);
//   const booking = await getSingleBookingWithVehicleAndPaymentsAndUserService(id);
//   if (booking == null) {
//     return c.text("Booking not found!", 404);
//   }
//   return c.json(booking, 200);
// }
