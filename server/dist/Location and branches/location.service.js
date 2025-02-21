"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.createLocationService = exports.getLocationService = exports.locationService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const locationService = async () => {
    return await db_1.default.query.locationsTable.findMany();
};
exports.locationService = locationService;
const getLocationService = async (address) => {
    return await db_1.default.query.locationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.locationsTable.address, address)
    });
};
exports.getLocationService = getLocationService;
const createLocationService = async (location) => {
    await db_1.default.insert(schema_1.locationsTable).values(location);
    return location;
};
exports.createLocationService = createLocationService;
const updateLocationService = async (address, location) => {
    await db_1.default.update(schema_1.locationsTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.locationsTable.address, address));
    return location;
};
exports.updateLocationService = updateLocationService;
const deleteLocationService = async (address) => {
    await db_1.default.delete(schema_1.locationsTable).where((0, drizzle_orm_1.eq)(schema_1.locationsTable.address, address));
    return "Location deleted successfully";
};
exports.deleteLocationService = deleteLocationService;
