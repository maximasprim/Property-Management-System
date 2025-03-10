import { Hono } from "hono";
import { createBooking, getSingleBooking, listBookings, updateBooking, deleteBooking,SingleBookingWithPaymentsAndUserService,listBookingsWithUserAndPayments} from "./Bookings.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import {bookingsSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth,userRoleAuth } from "../middleware/Auth";



//creating hono instance

export const bookingsRouter = new Hono();

//get states
bookingsRouter.get("/bookings", listBookings)

//get a single Driver    

bookingsRouter.get("/bookings/:id", getSingleBooking)



//create State

bookingsRouter.post("/bookings", zValidator('json', bookingsSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createBooking)

//update Driver

bookingsRouter.put("/bookings/:id", updateBooking)

// delete Driver
bookingsRouter.delete("/bookings/:id", deleteBooking)

bookingsRouter.get("/bookingsSummary", listBookingsWithUserAndPayments)

bookingsRouter.get("/bookingsWithUserAndPayments/:id", SingleBookingWithPaymentsAndUserService)