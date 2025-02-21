"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const user_controller_1 = require("./user.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
//creating hono instance
exports.userRouter = new hono_1.Hono();
// get states
exports.userRouter.get("/users", user_controller_1.listUsers);
//get a single user    
exports.userRouter.get("/users/:id", user_controller_1.getSingleUser);
// 
//create a user
exports.userRouter.post("/users", (0, zod_validator_1.zValidator)('json', validators_1.userSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), user_controller_1.createUser);
//update user
exports.userRouter.put("/users/:id", user_controller_1.updateUser);
// delete Driver
exports.userRouter.delete("/users/:id", user_controller_1.deleteUser);
//get users with bookings
// userRouter.get("/usersWithBookings", listUserWithBookings)
// // userRouter.get("/users/withBookings/:id", listUserWithBookings)
// userRouter.get("/users/withBookings/:id", listsingleuserwithBooking)
// userRouter.get("/usersWithTickets", listUserWithTickets)  
// userRouter.get("/users/singleUserWithTickets/:id", listSingleUserWithTickets)  
