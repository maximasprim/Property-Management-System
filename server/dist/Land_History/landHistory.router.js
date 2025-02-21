"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landHistoryRouter = void 0;
const hono_1 = require("hono");
const landHistory_controller_1 = require("./landHistory.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.landHistoryRouter = new hono_1.Hono();
// get states
exports.landHistoryRouter.get("/landHistory", landHistory_controller_1.listLandHistory);
//get a single landHistory    
exports.landHistoryRouter.get("/landHistory/:id", landHistory_controller_1.getSingleLandHistory);
// 
//create a landHistory
exports.landHistoryRouter.post("/landHistory", (0, zod_validator_1.zValidator)('json', validators_1.landHistorySchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), landHistory_controller_1.createLandHistory);
//update landHistory
exports.landHistoryRouter.put("/landHistory/:id", landHistory_controller_1.updateLandHistory);
// delete Driver
exports.landHistoryRouter.delete("/landHistory/:id", landHistory_controller_1.deleteLandHistory);
//get landHistory with bookings
// landHistoryRouter.get("/landHistoryWithBookings", listLandHistoryWithBookings)
// // landHistoryRouter.get("/landHistory/withBookings/:id", listLandHistoryWithBookings)
// landHistoryRouter.get("/landHistory/withBookings/:id", listsinglelandHistorywithBooking)
// landHistoryRouter.get("/landHistoryWithTickets", listLandHistoryWithTickets)  
// landHistoryRouter.get("/landHistory/singleLandHistoryWithTickets/:id", listSingleLandHistoryWithTickets)  
