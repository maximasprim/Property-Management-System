import { Hono } from "hono";
import { createVehicle, getSingleVehicle, listVehicles, updateVehicle, deleteVehicle } from "./vehicles.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { vehicleSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const vehiclesRouter = new Hono();

// get states
vehiclesRouter.get("/vehicles", listVehicles)

//get a single vehicle    

vehiclesRouter.get("/vehicles/:id",bothRolesAuth, getSingleVehicle)

// 

//create a vehicle

vehiclesRouter.post("/vehicles", zValidator('json', vehicleSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createVehicle)

//update vehicle

vehiclesRouter.put("/vehicles/:id",adminRoleAuth, updateVehicle)

// delete Driver
vehiclesRouter.delete("/vehicles/:id", deleteVehicle)