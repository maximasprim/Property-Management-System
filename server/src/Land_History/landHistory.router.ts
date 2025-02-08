import { Hono } from "hono";
import { createLandHistory, getSingleLandHistory, listLandHistory, updateLandHistory, deleteLandHistory} from "./landHistory.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { landHistorySchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const landHistoryRouter = new Hono();

// get states
landHistoryRouter.get("/landHistory",listLandHistory)

//get a single landHistory    

landHistoryRouter.get("/landHistory/:id", getSingleLandHistory)

// 

//create a landHistory

landHistoryRouter.post("/landHistory", zValidator('json', landHistorySchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createLandHistory)

//update landHistory

landHistoryRouter.put("/landHistory/:id", updateLandHistory)

// delete Driver
landHistoryRouter.delete("/landHistory/:id", deleteLandHistory)

//get landHistory with bookings
// landHistoryRouter.get("/landHistoryWithBookings", listLandHistoryWithBookings)
// // landHistoryRouter.get("/landHistory/withBookings/:id", listLandHistoryWithBookings)
// landHistoryRouter.get("/landHistory/withBookings/:id", listsinglelandHistorywithBooking)

// landHistoryRouter.get("/landHistoryWithTickets", listLandHistoryWithTickets)  
// landHistoryRouter.get("/landHistory/singleLandHistoryWithTickets/:id", listSingleLandHistoryWithTickets)  