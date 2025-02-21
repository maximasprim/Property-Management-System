"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLandHistory = exports.updateLandHistory = exports.createLandHistory = exports.getSingleLandHistory = exports.listLandHistory = void 0;
const landHistory_service_1 = require("./landHistory.service");
const listLandHistory = async (c) => {
    const data = await (0, landHistory_service_1.landHistoryService)();
    if (data == null) {
        return c.text("LandHistory not Found", 404);
    }
    return c.json(data, 200);
};
exports.listLandHistory = listLandHistory;
const getSingleLandHistory = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const history = await (0, landHistory_service_1.getLandHistoryService)(id);
    if (history == undefined) {
        return c.text("history not found!", 404);
    }
    return c.json(history, 200);
};
exports.getSingleLandHistory = getSingleLandHistory;
const createLandHistory = async (c) => {
    try {
        const history = await c.req.json();
        const createdLandHistory = await (0, landHistory_service_1.createLandHistoryService)(history);
        if (!createdLandHistory) {
            return c.text("history not created!", 404);
        }
        return c.json(createdLandHistory, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLandHistory = createLandHistory;
const updateLandHistory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const history = await c.req.json();
        console.log(history);
        //search for history
        const foundhistory = await (0, landHistory_service_1.getLandHistoryService)(id);
        if (foundhistory == undefined)
            return c.text("history not found!", 404);
        //get the data and update
        const res = await (0, landHistory_service_1.updateLandHistoryService)(id, history);
        //return the updated history
        if (!res)
            return c.text("history not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLandHistory = updateLandHistory;
//delete history
const deleteLandHistory = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the history
        const history = await (0, landHistory_service_1.getLandHistoryService)(id);
        if (history == undefined)
            return c.text("LandHistory not found!👽", 404);
        //delete the history
        const res = await (0, landHistory_service_1.deleteLandHistoryService)(id);
        if (!res)
            return c.text("LandHistory not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLandHistory = deleteLandHistory;
//history relations
// export const listLandHistoryWithBookings = async (c: Context) =>{
//   const data = await getLandHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listLandHistoryWithTickets = async (c: Context) =>{
//   const data = await getLandHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleLandHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
