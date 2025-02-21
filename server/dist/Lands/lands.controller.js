"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLand = exports.updateLand = exports.createLand = exports.getSingleLand = exports.listLand = void 0;
const lands_service_1 = require("./lands.service");
const listLand = async (c) => {
    const data = await (0, lands_service_1.landService)();
    if (data == null) {
        return c.text("Land not Found", 404);
    }
    return c.json(data, 200);
};
exports.listLand = listLand;
const getSingleLand = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const land = await (0, lands_service_1.getLandService)(id);
    if (land == undefined) {
        return c.text("land not found!", 404);
    }
    return c.json(land, 200);
};
exports.getSingleLand = getSingleLand;
const createLand = async (c) => {
    try {
        const land = await c.req.json(); // Expect JSON request
        if (!land) {
            return c.json({ error: "Missing land data in request" }, 400);
        }
        // Validate required fields
        const requiredFields = [
            "location",
            "size",
            "price",
            "status",
            "land_type",
            "images",
        ];
        for (const field of requiredFields) {
            if (!(field in land)) {
                return c.json({ error: `Missing required field: ${field}` }, 400);
            }
        }
        // Ensure images is an array
        if (!Array.isArray(land.images)) {
            return c.json({ error: "Images must be an array of URLs" }, 400);
        }
        // Pass land to service function
        const createdLand = await (0, lands_service_1.createLandService)(land);
        if (!createdLand) {
            return c.text("Land not created!", 404);
        }
        return c.json(createdLand, 201);
    }
    catch (error) {
        console.error("Error creating land:", error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLand = createLand;
const updateLand = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const land = await c.req.json();
        console.log(land);
        //search for land
        const foundland = await (0, lands_service_1.getLandService)(id);
        if (foundland == undefined)
            return c.text("land not found!", 404);
        //get the data and update
        const res = await (0, lands_service_1.updateLandService)(id, land);
        //return the updated land
        if (!res)
            return c.text("land not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLand = updateLand;
//delete land
const deleteLand = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the land
        const land = await (0, lands_service_1.getLandService)(id);
        if (land == undefined)
            return c.text("Land not found!👽", 404);
        //delete the land
        const res = await (0, lands_service_1.deleteLandService)(id);
        if (!res)
            return c.text("Land not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLand = deleteLand;
//land relations
// export const listLandWithBookings = async (c: Context) =>{
//   const data = await getLandWithBookingsService();
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsinglelandwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandWithBookingService(id);
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listLandWithTickets = async (c: Context) =>{
//   const data = await getLandWithTicketsService();
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleLandWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandWithTicketsService(id);
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }
