"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const location_controller_1 = require("./location.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.locationRouter = new hono_1.Hono();
//get states
exports.locationRouter.get("/location", location_controller_1.listLocation);
//get a single Driver    
exports.locationRouter.get("/location/:address", location_controller_1.getSingleLocation);
//create State
exports.locationRouter.post("/location", (0, zod_validator_1.zValidator)('json', validators_1.locationSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), location_controller_1.createLocation);
//update Driver
exports.locationRouter.put("/location/:id", location_controller_1.updateLocation);
// delete Driver
exports.locationRouter.delete("/location/:id", location_controller_1.deleteLocation);
