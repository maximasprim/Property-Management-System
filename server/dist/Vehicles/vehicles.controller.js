"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listVehiclesWithHistories = exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getSingleVehicle = exports.listVehicles = void 0;
const vehicles_service_1 = require("./vehicles.service");
const listVehicles = async (c) => {
    const data = await (0, vehicles_service_1.vehiclesService)();
    if (data == null) {
        return c.text("vehicle not Found", 404);
    }
    return c.json(data, 200);
};
exports.listVehicles = listVehicles;
const getSingleVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const vehicle = await (0, vehicles_service_1.getVehiclesService)(id);
    if (vehicle == undefined) {
        return c.text("vehicle not found!", 404);
    }
    return c.json(vehicle, 200);
};
exports.getSingleVehicle = getSingleVehicle;
const createVehicle = async (c) => {
    try {
        const vehicle = await c.req.json(); // Expect JSON request
        if (!vehicle) {
            return c.json({ error: "Missing vehicle data in request" }, 400);
        }
        // Validate required fields
        const requiredFields = [
            "make",
            "model",
            "year",
            "vin",
            "status",
            "price",
            "mileage",
            "fuel_type",
            "location",
            "images",
        ];
        for (const field of requiredFields) {
            if (!(field in vehicle)) {
                return c.json({ error: `Missing required field: ${field}` }, 400);
            }
        }
        // Ensure images is an array
        if (!Array.isArray(vehicle.images)) {
            return c.json({ error: "Images must be an array of URLs" }, 400);
        }
        // Pass vehicle to service function
        const createdvehicle = await (0, vehicles_service_1.createVehicleService)(vehicle);
        if (!createdvehicle) {
            return c.text("vehicle not created!", 404);
        }
        return c.json(createdvehicle, 201);
    }
    catch (error) {
        console.error("Error creating vehicle:", error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicle = createVehicle;
const updateVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const vehicle = await c.req.json();
    try {
        //search for vehicle
        const foundvehicle = await (0, vehicles_service_1.getVehiclesService)(id);
        if (foundvehicle == undefined)
            return c.text("vehicle not found!", 404);
        //get the data and update
        const res = await (0, vehicles_service_1.updateVehiclesService)(id, vehicle);
        //return the updated vehicle
        if (!res)
            return c.text("vehicle not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehicle = updateVehicle;
//delete vehicle
const deleteVehicle = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the vehicle
        const vehicle = await (0, vehicles_service_1.getVehiclesService)(id);
        if (vehicle == undefined)
            return c.text("vehicle not found!👽", 404);
        //delete the vehicle
        const res = await (0, vehicles_service_1.deleteVehiclesService)(id);
        if (!res)
            return c.text("vehicle not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicle = deleteVehicle;
const listVehiclesWithHistories = async (c) => {
    const data = await (0, vehicles_service_1.getVehiclesWithHistoryService)();
    if (data == null) {
        return c.text("user not Found", 404);
    }
    return c.json(data, 200);
};
exports.listVehiclesWithHistories = listVehiclesWithHistories;
// export const listsingleuserwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleUserWithBookingService(id);
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
