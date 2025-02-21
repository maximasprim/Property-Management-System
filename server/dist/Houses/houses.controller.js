"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHouse = exports.updateHouse = exports.createHouse = exports.getSingleHouse = exports.listHouses = void 0;
const houses_service_1 = require("./houses.service");
const listHouses = async (c) => {
    const data = await (0, houses_service_1.housesService)();
    if (data == null) {
        return c.text("House not Found", 404);
    }
    return c.json(data, 200);
};
exports.listHouses = listHouses;
const getSingleHouse = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const house = await (0, houses_service_1.getHouseService)(id);
    if (house == undefined) {
        return c.text("house not found!", 404);
    }
    return c.json(house, 200);
};
exports.getSingleHouse = getSingleHouse;
const createHouse = async (c) => {
    try {
        const house = await c.req.json(); // Expect JSON request
        if (!house) {
            return c.json({ error: "Missing house data in request" }, 400);
        }
        // Validate required fields
        const requiredFields = [
            "address",
            "name",
            "number_of_rooms",
            "size",
            "price",
            "status",
            "year_built",
            "images",
        ];
        for (const field of requiredFields) {
            if (!(field in house)) {
                return c.json({ error: `Missing required field: ${field}` }, 400);
            }
        }
        // Ensure images is an array
        if (!Array.isArray(house.images)) {
            return c.json({ error: "Images must be an array of URLs" }, 400);
        }
        // Pass house to service function
        const createdHouse = await (0, houses_service_1.createHouseService)(house);
        if (!createdHouse) {
            return c.text("House not created!", 404);
        }
        return c.json(createdHouse, 201);
    }
    catch (error) {
        console.error("Error creating house:", error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.createHouse = createHouse;
const updateHouse = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const house = await c.req.json();
        console.log(house);
        //search for house
        const foundhouse = await (0, houses_service_1.getHouseService)(id);
        if (foundhouse == undefined)
            return c.text("house not found!", 404);
        //get the data and update
        const res = await (0, houses_service_1.updateHouseService)(id, house);
        //return the updated house
        if (!res)
            return c.text("house not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateHouse = updateHouse;
//delete house
const deleteHouse = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the house
        const house = await (0, houses_service_1.getHouseService)(id);
        if (house == undefined)
            return c.text("House not found!👽", 404);
        //delete the house
        const res = await (0, houses_service_1.deleteHouseService)(id);
        if (!res)
            return c.text("House not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteHouse = deleteHouse;
//house relations
// export const listHouseWithBookings = async (c: Context) =>{
//   const data = await getHouseWithBookingsService();
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsinglehousewithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseWithBookingService(id);
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listHouseWithTickets = async (c: Context) =>{
//   const data = await getHouseWithTicketsService();
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleHouseWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseWithTicketsService(id);
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }
