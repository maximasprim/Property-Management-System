"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const migrator_1 = require("drizzle-orm/neon-http/migrator");
const db_1 = __importDefault(require("./db"));
async function migration() {
    await (0, migrator_1.migrate)(db_1.default, { migrationsFolder: __dirname + "/migrations" });
    console.log("=======migrations ended=======");
    process.exit(0);
}
migration().catch((err) => {
    console.error(err);
    process.exit(0);
});
