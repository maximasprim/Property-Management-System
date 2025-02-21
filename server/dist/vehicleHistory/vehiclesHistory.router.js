"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesHistoryRouter = void 0;
const hono_1 = require("hono");
const vehiclesHistory_controller_1 = require("./vehiclesHistory.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.vehiclesHistoryRouter = new hono_1.Hono();
// get states
exports.vehiclesHistoryRouter.get("/vehiclesHistory", vehiclesHistory_controller_1.listVehiclesHistory);
//get a single vehiclesHistory    
exports.vehiclesHistoryRouter.get("/vehiclesHistory/:id", vehiclesHistory_controller_1.getSingleVehiclesHistory);
// 
//create a vehiclesHistory
exports.vehiclesHistoryRouter.post("/vehiclesHistory", (0, zod_validator_1.zValidator)('json', validators_1.vehiclesHistorySchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), vehiclesHistory_controller_1.createVehiclesHistory);
//update vehiclesHistory
exports.vehiclesHistoryRouter.put("/vehiclesHistory/:id", vehiclesHistory_controller_1.updateVehiclesHistory);
// delete Driver
exports.vehiclesHistoryRouter.delete("/vehiclesHistory/:id", vehiclesHistory_controller_1.deleteVehiclesHistory);
//get vehiclesHistory with bookings
// vehiclesHistoryRouter.get("/vehiclesHistoryWithBookings", listVehiclesHistoryWithBookings)
// // vehiclesHistoryRouter.get("/vehiclesHistory/withBookings/:id", listVehiclesHistoryWithBookings)
// vehiclesHistoryRouter.get("/vehiclesHistory/withBookings/:id", listsinglevehiclesHistorywithBooking)
// vehiclesHistoryRouter.get("/vehiclesHistoryWithTickets", listVehiclesHistoryWithTickets)  
// vehiclesHistoryRouter.get("/vehiclesHistory/singleVehiclesHistoryWithTickets/:id", listSingleVehiclesHistoryWithTickets)  
