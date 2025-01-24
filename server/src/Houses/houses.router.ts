import { Hono } from "hono";
import { createHouse, getSingleHouse, listHouses, updateHouse, deleteHouse} from "./houses.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { housesSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const houseRouter = new Hono();

// get states
houseRouter.get("/houses",listHouses)

//get a single house    

houseRouter.get("/houses/:id", getSingleHouse)

// 

//create a house

houseRouter.post("/houses", zValidator('json', housesSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createHouse)

//update house

houseRouter.put("/houses/:id", updateHouse)

// delete Driver
houseRouter.delete("/houses/:id", deleteHouse)

//get houses with bookings
// houseRouter.get("/housesWithBookings", listHouseWithBookings)
// // houseRouter.get("/houses/withBookings/:id", listHouseWithBookings)
// houseRouter.get("/houses/withBookings/:id", listsinglehousewithBooking)

// houseRouter.get("/housesWithTickets", listHouseWithTickets)  
// houseRouter.get("/houses/singleHouseWithTickets/:id", listSingleHouseWithTickets)  