"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseRouter = void 0;
const hono_1 = require("hono");
const houses_controller_1 = require("./houses.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.houseRouter = new hono_1.Hono();
// get states
exports.houseRouter.get("/houses", houses_controller_1.listHouses);
//get a single house    
exports.houseRouter.get("/houses/:id", houses_controller_1.getSingleHouse);
// 
//create a house
exports.houseRouter.post("/houses", (0, zod_validator_1.zValidator)('json', validators_1.housesSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), houses_controller_1.createHouse);
//update house
exports.houseRouter.put("/houses/:id", houses_controller_1.updateHouse);
// delete Driver
exports.houseRouter.delete("/houses/:id", houses_controller_1.deleteHouse);
//get houses with bookings
// houseRouter.get("/housesWithBookings", listHouseWithBookings)
// // houseRouter.get("/houses/withBookings/:id", listHouseWithBookings)
// houseRouter.get("/houses/withBookings/:id", listsinglehousewithBooking)
// houseRouter.get("/housesWithTickets", listHouseWithTickets)  
// houseRouter.get("/houses/singleHouseWithTickets/:id", listSingleHouseWithTickets)  
