import { Hono } from "hono";
import { createHouseHistory, getSingleHouseHistory, listHouseHistory, updateHouseHistory, deleteHouseHistory} from "./houseHistory.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { houseHistorySchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const houseHistoryRouter = new Hono();

// get states
houseHistoryRouter.get("/houseHistory",listHouseHistory)

//get a single houseHistory    

houseHistoryRouter.get("/houseHistory/:id", getSingleHouseHistory)

// 

//create a houseHistory

houseHistoryRouter.post("/houseHistory", zValidator('json', houseHistorySchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createHouseHistory)

//update houseHistory

houseHistoryRouter.put("/houseHistory/:id", updateHouseHistory)

// delete Driver
houseHistoryRouter.delete("/houseHistory/:id", deleteHouseHistory)

//get houseHistory with bookings
// houseHistoryRouter.get("/houseHistoryWithBookings", listHouseHistoryWithBookings)
// // houseHistoryRouter.get("/houseHistory/withBookings/:id", listHouseHistoryWithBookings)
// houseHistoryRouter.get("/houseHistory/withBookings/:id", listsinglehouseHistorywithBooking)

// houseHistoryRouter.get("/houseHistoryWithTickets", listHouseHistoryWithTickets)  
// houseHistoryRouter.get("/houseHistory/singleHouseHistoryWithTickets/:id", listSingleHouseHistoryWithTickets)  