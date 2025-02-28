import { Hono } from "hono";
import { createLand, getSingleLand, listLand, updateLand, deleteLand,listLandsWithHistories} from "./lands.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { landsSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const landRouter = new Hono();

// get states
landRouter.get("/lands",listLand)

//get a single land    

landRouter.get("/lands/:id", getSingleLand)

// 

//create a land

landRouter.post("/lands", zValidator('json', landsSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createLand)

//update land

landRouter.put("/lands/:id", updateLand)

// delete Driver
landRouter.delete("/lands/:id", deleteLand)
landRouter.get("/landWithHistory", listLandsWithHistories)
//get lands with bookings
// landRouter.get("/landsWithBookings", listLandWithBookings)
// // landRouter.get("/lands/withBookings/:id", listLandWithBookings)
// landRouter.get("/lands/withBookings/:id", listsinglelandwithBooking)

// landRouter.get("/landsWithTickets", listLandWithTickets)  
// landRouter.get("/lands/singleLandWithTickets/:id", listSingleLandWithTickets)  