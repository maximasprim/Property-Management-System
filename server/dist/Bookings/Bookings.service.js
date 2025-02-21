"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingsService = exports.updateBookingsService = exports.createBookingsService = exports.getBookingsService = exports.bookingsService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const bookingsService = async () => {
    return await db_1.default.query.bookingsTable.findMany();
};
exports.bookingsService = bookingsService;
const getBookingsService = async (id) => {
    return await db_1.default.query.bookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingsTable.booking_id, id)
    });
};
exports.getBookingsService = getBookingsService;
const createBookingsService = async (booking) => {
    const { total_amount, user_id, booking_id, booking_date } = booking;
    try {
        // Ensure amount is a number
        const amount = Number(total_amount);
        // Create a payment record
        const paymentRecord = {
            property_type: "",
            property_id: 0,
            payment_id: booking_id,
            booking_id: booking_id,
            amount: Number(total_amount),
            status: "Pending", // or appropriate status
            transaction_date: new Date(), // Current date
            payment_method: "Credit Card", // or appropriate method
            transaction_id: `${booking_id}_${new Date().getTime()}`,
        };
        // Insert booking into bookings table
        await db_1.default.insert(schema_1.bookingsTable).values(booking);
        // Insert payment record into payments table
        await db_1.default.insert(schema_1.paymentsTable).values(paymentRecord);
        return booking;
    }
    catch (error) {
        console.error('Error creating booking and payment:', error);
        throw new Error('Unable to create booking and payment');
    }
};
exports.createBookingsService = createBookingsService;
const updateBookingsService = async (id, booking) => {
    await db_1.default.update(schema_1.bookingsTable).set(booking).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.booking_id, id));
    return booking;
};
exports.updateBookingsService = updateBookingsService;
const deleteBookingsService = async (id) => {
    await db_1.default.delete(schema_1.bookingsTable).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.booking_id, id));
    return "Booking deleted successfully";
};
exports.deleteBookingsService = deleteBookingsService;
// export const getBookingWithVehicleAndPaymentsAndUserService = async (): Promise<TSBookings[] | null> => {
//   return await db.query.bookingsTable.findMany({
//     with: {
//       vehicles: {
//         columns: {
//           vehicle_id: true,
//           availability: true,
//         },
//       },
//       payments: {
//         columns: {
//           payment_id: true,
//           payment_status: true,
//           amount: true,
//           payment_method: true,
//           transaction_id: true,
//         },
//       },
//       user: {
//         columns: {
//           user_id: true,
//           full_name: true,
//           email: true,
//           role: true,
//         },
//       },
//     },
//   });
// };
// export const getSingleBookingWithVehicleAndPaymentsAndUserService = async (id: number): Promise<TSBookings | null> => {
//   return await db.query.bookingsTable.findFirst({
//     where: eq(bookingsTable.booking_id, id),
//     with: {
//       vehicle: {
//         columns: {
//           vehicle_id: true,
//           availability: true,
//         },
//       },
//       payments: {
//         columns: {
//           payment_id: true,
//           payment_status: true,
//           amount: true,
//           payment_method: true,
//           transaction_id: true,
//         },
//       },
//       user: {
//         columns: {
//           user_id: true,
//           full_name: true,
//           email: true,
//           role: true,
//         },
//       },
//     },
//   }) as TSBookings | null; // Add type assertion to match the expected return type
// };
