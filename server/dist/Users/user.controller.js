"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.listUsers = void 0;
const user_service_1 = require("./user.service");
const listUsers = async (c) => {
    const data = await (0, user_service_1.usersService)();
    if (data == null) {
        return c.text("User not Found", 404);
    }
    return c.json(data, 200);
};
exports.listUsers = listUsers;
const getSingleUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const user = await (0, user_service_1.getUserService)(id);
    if (user == undefined) {
        return c.text("user not found!", 404);
    }
    return c.json(user, 200);
};
exports.getSingleUser = getSingleUser;
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        const createdUser = await (0, user_service_1.createUserService)(user);
        if (!createdUser) {
            return c.text("user not created!", 404);
        }
        return c.json(createdUser, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
const updateUser = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const user = await c.req.json();
        console.log(user);
        //search for user
        const founduser = await (0, user_service_1.getUserService)(id);
        if (founduser == undefined)
            return c.text("user not found!", 404);
        //get the data and update
        const res = await (0, user_service_1.updateUserService)(id, user);
        //return the updated user
        if (!res)
            return c.text("user not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
//delete user
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const user = await (0, user_service_1.getUserService)(id);
        if (user == undefined)
            return c.text("User not found!👽", 404);
        //delete the user
        const res = await (0, user_service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
//user relations
// export const listUserWithBookings = async (c: Context) =>{
//   const data = await getUserWithBookingsService();
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsingleuserwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleUserWithBookingService(id);
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listUserWithTickets = async (c: Context) =>{
//   const data = await getUserWithTicketsService();
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleUserWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleUserWithTicketsService(id);
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
