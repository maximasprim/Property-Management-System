import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIBookings, TSBookings, bookingsTable, TIPayments, paymentsTable, vehiclesTable, usersTable } from "../Drizzle/schema";
import { createPaymentsService } from "../Payments/payments.service";

export const bookingsService = async (): Promise<TSBookings[] | null> => {
  return await db.query.bookingsTable.findMany();
};

export const getBookingsService = async (id: number): Promise<TSBookings | undefined> => {
  return await db.query.bookingsTable.findFirst({
    where: eq(bookingsTable.booking_id, id)
  });
};

export const createBookingsService = async (booking: TIBookings): Promise<TIBookings> => {
  const { total_amount, user_id, booking_id, booking_date } = booking;

  try {
    // Ensure amount is a number
    const amount = Number(total_amount);

    // Create a payment record
    const paymentRecord: TIPayments = {
      property_type: "",
      property_name: "",
      payment_id: booking_id,
      booking_id: booking_id,
      amount: Number(total_amount),
      status: "Pending", // or appropriate status
      transaction_date: new Date(), // Current date
      payment_method: "Credit Card", // or appropriate method
      transaction_id: `${booking_id}_${new Date().getTime()}`,
     
    };

    // Insert booking into bookings table
    await db.insert(bookingsTable).values(booking);

    // Insert payment record into payments table
    await db.insert(paymentsTable).values(paymentRecord);

    return booking;
  } catch (error) {
    console.error('Error creating booking and payment:', error);
    throw new Error('Unable to create booking and payment');
  }
};

export const updateBookingsService = async (id: number, booking: TIBookings) => {
  await db.update(bookingsTable).set(booking).where(eq(bookingsTable.booking_id, id));
  return booking;
};

export const deleteBookingsService = async (id: number) => {
  await db.delete(bookingsTable).where(eq(bookingsTable.booking_id, id));
  return "Booking deleted successfully";
};

export const getBookingWithPaymentsAndUserService = async (): Promise<TSBookings[] | null> => {
  return await db.query.bookingsTable.findMany({
    with: {
      
      payments: {
        columns: {
          payment_id: true,
          status: true,
          amount: true,
          payment_method: true,
          transaction_id: true,
        },
      },
      users: {
        columns: {
          user_id: true,
          full_name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

export const getSingleBookingWithPaymentsAndUserService = async (id: number): Promise<TSBookings | null> => {
  return await db.query.bookingsTable.findFirst({
    where: eq(bookingsTable.booking_id, id),
    with: {
      payments: {
        columns: {
          payment_id: true,
          status: true,
          amount: true,
          payment_method: true,
          transaction_id: true,
        },
      },
      users: {
        columns: {
          user_id: true,
          full_name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as TSBookings | null; // Add type assertion to match the expected return type
};
