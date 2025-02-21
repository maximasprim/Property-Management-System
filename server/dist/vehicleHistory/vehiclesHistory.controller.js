"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehiclesHistory = exports.updateVehiclesHistory = exports.createVehiclesHistory = exports.getSingleVehiclesHistory = exports.listVehiclesHistory = void 0;
const vehiclesHistory_service_1 = require("./vehiclesHistory.service");
const listVehiclesHistory = async (c) => {
    const data = await (0, vehiclesHistory_service_1.vehiclesHistoryService)();
    if (data == null) {
        return c.text("VehiclesHistory not Found", 404);
    }
    return c.json(data, 200);
};
exports.listVehiclesHistory = listVehiclesHistory;
const getSingleVehiclesHistory = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const history = await (0, vehiclesHistory_service_1.getVehiclesHistoryService)(id);
    if (history == undefined) {
        return c.text("history not found!", 404);
    }
    return c.json(history, 200);
};
exports.getSingleVehiclesHistory = getSingleVehiclesHistory;
const createVehiclesHistory = async (c) => {
    try {
        const history = await c.req.json();
        const createdVehiclesHistory = await (0, vehiclesHistory_service_1.createVehiclesHistoryService)(history);
        if (!createdVehiclesHistory) {
            return c.text("history not created!", 404);
        }
        return c.json(createdVehiclesHistory, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehiclesHistory = createVehiclesHistory;
const updateVehiclesHistory = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const history = await c.req.json();
        console.log(history);
        //search for history
        const foundhistory = await (0, vehiclesHistory_service_1.getVehiclesHistoryService)(id);
        if (foundhistory == undefined)
            return c.text("history not found!", 404);
        //get the data and update
        const res = await (0, vehiclesHistory_service_1.updateVehiclesHistoryService)(id, history);
        //return the updated history
        if (!res)
            return c.text("history not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehiclesHistory = updateVehiclesHistory;
//delete history
const deleteVehiclesHistory = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the history
        const history = await (0, vehiclesHistory_service_1.getVehiclesHistoryService)(id);
        if (history == undefined)
            return c.text("VehiclesHistory not found!👽", 404);
        //delete the history
        const res = await (0, vehiclesHistory_service_1.deleteVehiclesHistoryService)(id);
        if (!res)
            return c.text("VehiclesHistory not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehiclesHistory = deleteVehiclesHistory;
//history relations
// export const listVehiclesHistoryWithBookings = async (c: Context) =>{
//   const data = await getVehiclesHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleVehiclesHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listVehiclesHistoryWithTickets = async (c: Context) =>{
//   const data = await getVehiclesHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleVehiclesHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleVehiclesHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
