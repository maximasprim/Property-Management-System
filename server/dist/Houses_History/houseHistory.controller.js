"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHouseHistory = exports.updateHouseHistory = exports.createHouseHistory = exports.getSingleHouseHistory = exports.listHouseHistory = void 0;
const houseHistory_service_1 = require("./houseHistory.service");
const listHouseHistory = async (c) => {
    const data = await (0, houseHistory_service_1.propertyHistoryService)();
    if (data == null) {
        return c.text("HouseHistory not Found", 404);
    }
    return c.json(data, 200);
};
exports.listHouseHistory = listHouseHistory;
const getSingleHouseHistory = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const history = await (0, houseHistory_service_1.getHouseHistoryService)(id);
    if (history == undefined) {
        return c.text("history not found!", 404);
    }
    return c.json(history, 200);
};
exports.getSingleHouseHistory = getSingleHouseHistory;
const createHouseHistory = async (c) => {
    try {
        const history = await c.req.json();
        const createdHouseHistory = await (0, houseHistory_service_1.createHouseHistoryService)(history);
        if (!createdHouseHistory) {
            return c.text("history not created!", 404);
        }
        return c.json(createdHouseHistory, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createHouseHistory = createHouseHistory;
const updateHouseHistory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const history = await c.req.json();
        console.log(history);
        //search for history
        const foundhistory = await (0, houseHistory_service_1.getHouseHistoryService)(id);
        if (foundhistory == undefined)
            return c.text("history not found!", 404);
        //get the data and update
        const res = await (0, houseHistory_service_1.updateHouseHistoryService)(id, history);
        //return the updated history
        if (!res)
            return c.text("history not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateHouseHistory = updateHouseHistory;
//delete history
const deleteHouseHistory = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the history
        const history = await (0, houseHistory_service_1.getHouseHistoryService)(id);
        if (history == undefined)
            return c.text("HouseHistory not found!👽", 404);
        //delete the history
        const res = await (0, houseHistory_service_1.deleteHouseHistoryService)(id);
        if (!res)
            return c.text("HouseHistory not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteHouseHistory = deleteHouseHistory;
//history relations
// export const listHouseHistoryWithBookings = async (c: Context) =>{
//   const data = await getHouseHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listHouseHistoryWithTickets = async (c: Context) =>{
//   const data = await getHouseHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleHouseHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
