import { Hono } from "hono";
import { createPropertyHistory, getSinglePropertyHistory, listPropertyHistory, updatePropertyHistory, deletePropertyHistory} from "./pHistory.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { propertyHistorySchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const propertyHistoryRouter = new Hono();

// get states
propertyHistoryRouter.get("/propertyHistory",listPropertyHistory)

//get a single propertyHistory    

propertyHistoryRouter.get("/propertyHistory/:id", getSinglePropertyHistory)

// 

//create a propertyHistory

propertyHistoryRouter.post("/propertyHistory", zValidator('json', propertyHistorySchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createPropertyHistory)

//update propertyHistory

propertyHistoryRouter.put("/propertyHistory/:id", updatePropertyHistory)

// delete Driver
propertyHistoryRouter.delete("/propertyHistory/:id", deletePropertyHistory)

//get propertyHistory with bookings
// propertyHistoryRouter.get("/propertyHistoryWithBookings", listPropertyHistoryWithBookings)
// // propertyHistoryRouter.get("/propertyHistory/withBookings/:id", listPropertyHistoryWithBookings)
// propertyHistoryRouter.get("/propertyHistory/withBookings/:id", listsinglepropertyHistorywithBooking)

// propertyHistoryRouter.get("/propertyHistoryWithTickets", listPropertyHistoryWithTickets)  
// propertyHistoryRouter.get("/propertyHistory/singlePropertyHistoryWithTickets/:id", listSinglePropertyHistoryWithTickets)  