"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesRouter = void 0;
const hono_1 = require("hono");
const vehicles_controller_1 = require("./vehicles.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
// import { adminRoleAuth, bothRolesAuth } from "../middleware/Auth";
//creating hono instance
exports.vehiclesRouter = new hono_1.Hono();
// get states
exports.vehiclesRouter.get("/vehicles", vehicles_controller_1.listVehicles);
//get a single vehicle    
exports.vehiclesRouter.get("/vehicles/:id", vehicles_controller_1.getSingleVehicle);
// 
//create a vehicle
exports.vehiclesRouter.post("/vehicles", (0, zod_validator_1.zValidator)('json', validators_1.vehicleSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), vehicles_controller_1.createVehicle);
//update vehicle
exports.vehiclesRouter.put("/vehicles/:id", vehicles_controller_1.updateVehicle);
// delete Driver
exports.vehiclesRouter.delete("/vehicles/:id", vehicles_controller_1.deleteVehicle);
exports.vehiclesRouter.get("/vehicleshistory", vehicles_controller_1.listVehiclesWithHistories);
