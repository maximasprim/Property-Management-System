"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseHistoryRouter = void 0;
const hono_1 = require("hono");
const houseHistory_controller_1 = require("./houseHistory.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.houseHistoryRouter = new hono_1.Hono();
// get states
exports.houseHistoryRouter.get("/houseHistory", houseHistory_controller_1.listHouseHistory);
//get a single houseHistory    
exports.houseHistoryRouter.get("/houseHistory/:id", houseHistory_controller_1.getSingleHouseHistory);
// 
//create a houseHistory
exports.houseHistoryRouter.post("/houseHistory", (0, zod_validator_1.zValidator)('json', validators_1.houseHistorySchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), houseHistory_controller_1.createHouseHistory);
//update houseHistory
exports.houseHistoryRouter.put("/houseHistory/:id", houseHistory_controller_1.updateHouseHistory);
// delete Driver
exports.houseHistoryRouter.delete("/houseHistory/:id", houseHistory_controller_1.deleteHouseHistory);
//get houseHistory with bookings
// houseHistoryRouter.get("/houseHistoryWithBookings", listHouseHistoryWithBookings)
// // houseHistoryRouter.get("/houseHistory/withBookings/:id", listHouseHistoryWithBookings)
// houseHistoryRouter.get("/houseHistory/withBookings/:id", listsinglehouseHistorywithBooking)
// houseHistoryRouter.get("/houseHistoryWithTickets", listHouseHistoryWithTickets)  
// houseHistoryRouter.get("/houseHistory/singleHouseHistoryWithTickets/:id", listSingleHouseHistoryWithTickets)  
