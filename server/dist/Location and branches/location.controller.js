"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getSingleLocation = exports.listLocation = void 0;
const location_service_1 = require("./location.service");
const listLocation = async (c) => {
    const data = await (0, location_service_1.locationService)();
    if (data == null) {
        return c.text("Location not Found", 404);
    }
    return c.json(data, 200);
};
exports.listLocation = listLocation;
// export const getSingleLocation = async (c: Context) => {
//   const id = parseInt(c.req.param("id"));
//   if (isNaN(id)) 
//       return c.text("invalid ID!", 400);
//   const location = await getLocationService(id);
//   if (location == undefined){
//       return c.text(" not found!", 404);
//   }
//   return c.json(location, 200);
// } 
const getSingleLocation = async (c) => {
    const address = c.req.param("address");
    if (!address || typeof address !== "string") {
        return c.text("Invalid address!", 400);
    }
    const location = await (0, location_service_1.getLocationService)(address);
    if (location == undefined) {
        return c.text("Location Not found!", 404);
    }
    return c.json(location, 200);
};
exports.getSingleLocation = getSingleLocation;
const createLocation = async (c) => {
    try {
        const location = await c.req.json();
        const createdLocation = await (0, location_service_1.createLocationService)(location);
        if (!createdLocation) {
            return c.text("Location not created!", 404);
        }
        return c.json(createdLocation, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLocation = createLocation;
const updateLocation = async (c) => {
    const address = c.req.param("id");
    if (!address || typeof address !== "string") {
        return c.text("invalid address!", 400);
    }
    const location = await c.req.json();
    try {
        //search for user
        const foundLocation = await (0, location_service_1.getLocationService)(address);
        if (foundLocation == undefined)
            return c.text("Location not found!", 404);
        //get the data and update
        const res = await (0, location_service_1.updateLocationService)(address, location);
        //return the updated user
        if (!res)
            return c.text("Location not updated!", 404);
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLocation = updateLocation;
//delete city
const deleteLocation = async (c) => {
    const address = c.req.param("id");
    if (!address || typeof address !== "string")
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const location = await (0, location_service_1.getLocationService)(address);
        if (location == undefined)
            return c.text("Location not found!👽", 404);
        //delete the user
        const res = await (0, location_service_1.deleteLocationService)(address);
        if (!res)
            return c.text("Location not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLocation = deleteLocation;
