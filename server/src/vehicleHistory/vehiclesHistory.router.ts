import { Hono } from "hono";
import { createVehiclesHistory, getSingleVehiclesHistory, listVehiclesHistory, updateVehiclesHistory, deleteVehiclesHistory} from "./vehiclesHistory.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { vehiclesHistorySchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const vehiclesHistoryRouter = new Hono();

// get states
vehiclesHistoryRouter.get("/vehiclesHistory",listVehiclesHistory)

//get a single vehiclesHistory    

vehiclesHistoryRouter.get("/vehiclesHistory/:id", getSingleVehiclesHistory)

// 

//create a vehiclesHistory

vehiclesHistoryRouter.post("/vehiclesHistory", zValidator('json', vehiclesHistorySchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createVehiclesHistory)

//update vehiclesHistory

vehiclesHistoryRouter.put("/vehiclesHistory/:id", updateVehiclesHistory)

// delete Driver
vehiclesHistoryRouter.delete("/vehiclesHistory/:id", deleteVehiclesHistory)

//get vehiclesHistory with bookings
// vehiclesHistoryRouter.get("/vehiclesHistoryWithBookings", listVehiclesHistoryWithBookings)
// // vehiclesHistoryRouter.get("/vehiclesHistory/withBookings/:id", listVehiclesHistoryWithBookings)
// vehiclesHistoryRouter.get("/vehiclesHistory/withBookings/:id", listsinglevehiclesHistorywithBooking)

// vehiclesHistoryRouter.get("/vehiclesHistoryWithTickets", listVehiclesHistoryWithTickets)  
// vehiclesHistoryRouter.get("/vehiclesHistory/singleVehiclesHistoryWithTickets/:id", listSingleVehiclesHistoryWithTickets)  