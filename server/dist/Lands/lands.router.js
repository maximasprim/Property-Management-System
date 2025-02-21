"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landRouter = void 0;
const hono_1 = require("hono");
const lands_controller_1 = require("./lands.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.landRouter = new hono_1.Hono();
// get states
exports.landRouter.get("/lands", lands_controller_1.listLand);
//get a single land    
exports.landRouter.get("/lands/:id", lands_controller_1.getSingleLand);
// 
//create a land
exports.landRouter.post("/lands", (0, zod_validator_1.zValidator)('json', validators_1.landsSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), lands_controller_1.createLand);
//update land
exports.landRouter.put("/lands/:id", lands_controller_1.updateLand);
// delete Driver
exports.landRouter.delete("/lands/:id", lands_controller_1.deleteLand);
//get lands with bookings
// landRouter.get("/landsWithBookings", listLandWithBookings)
// // landRouter.get("/lands/withBookings/:id", listLandWithBookings)
// landRouter.get("/lands/withBookings/:id", listsinglelandwithBooking)
// landRouter.get("/landsWithTickets", listLandWithTickets)  
// landRouter.get("/lands/singleLandWithTickets/:id", listSingleLandWithTickets)  
