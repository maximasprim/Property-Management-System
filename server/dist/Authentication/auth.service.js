"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userloginService = exports.createAuthUserService = void 0;
const schema_1 = require("../Drizzle/schema");
const db_1 = __importDefault(require("../Drizzle/db"));
const Drizzle_orm_1 = require("Drizzle-orm");
// import { mailFunction } from "../mail"
const createAuthUserService = async (user) => {
    try {
        // Insert user into `users` table
        const createdUser = await db_1.default.insert(schema_1.usersTable).values({
            full_name: user.username,
            email: user.email,
            contact_phone: user.contact_phone,
            address: user.address,
            role: user.role || 'user'
        }).returning();
        // Extract the created user ID
        const userId = createdUser[0].user_id;
        // Insert user into `auth_user` table
        await db_1.default.insert(schema_1.authenticationsTable).values({
            user_id: userId,
            password: user.password,
            username: user.username,
            role: user.role
        }).returning();
        //   // Ensure username is defined and of type string before calling mailFunction
        //   if (!user.username || typeof user.username !== 'string') {
        //     throw new Error('Invalid username');
        //   }
        //   // Sending welcome email to the user
        //   await mailFunction(user.username, 'Welcome to Maximus CarBook', 'welcome-email', { username: user.username, password: user.password });
        //   console.log("Authservices: Sent welcome email");
        return createdUser[0]; // Return the created user
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('User creation failed');
    }
};
exports.createAuthUserService = createAuthUserService;
const userloginService = async (user) => {
    const { username, password } = user;
    return await db_1.default.query.authenticationsTable.findFirst({
        columns: {
            auth_id: true,
            user_id: true,
            username: true,
            role: true,
            password: true
        }, where: (0, Drizzle_orm_1.sql) ` ${schema_1.authenticationsTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    user_id: true,
                    full_name: true,
                    email: true,
                    contact_phone: true,
                    address: true,
                    role: true,
                }
            }
        }
    });
};
exports.userloginService = userloginService;
