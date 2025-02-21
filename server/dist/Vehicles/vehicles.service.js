"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehiclesWithHistoryService = exports.deleteVehiclesService = exports.updateVehiclesService = exports.createVehicleService = exports.getVehiclesService = exports.vehiclesService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const vehiclesService = async () => {
    return await db_1.default.query.vehiclesTable.findMany();
};
exports.vehiclesService = vehiclesService;
const getVehiclesService = async (id) => {
    return await db_1.default.query.vehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.property_id, id)
    });
};
exports.getVehiclesService = getVehiclesService;
const createVehicleService = async (vehicle) => {
    // Ensure images field contains URLs
    if (!Array.isArray(vehicle.images)) {
        throw new Error("Images must be an array of URLs");
    }
    // Insert house data directly into the database
    await db_1.default.insert(schema_1.vehiclesTable).values(vehicle);
    return vehicle;
};
exports.createVehicleService = createVehicleService;
const updateVehiclesService = async (id, vehicles) => {
    await db_1.default.update(schema_1.vehiclesTable).set(vehicles).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.property_id, id));
    return "vehicle updated successfully";
};
exports.updateVehiclesService = updateVehiclesService;
const deleteVehiclesService = async (id) => {
    await db_1.default.delete(schema_1.vehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.property_id, id));
    return "vehicle deleted successfully";
};
exports.deleteVehiclesService = deleteVehiclesService;
const getVehiclesWithHistoryService = async () => {
    return await db_1.default.query.vehiclesTable.findMany({
        with: {
            history: {
                columns: {
                    property_id: true,
                    previous_owner: true,
                    transfer_date: true,
                    maintenance_cost: true,
                    maintenance_date: true,
                    maintenance_type: true,
                    service_provider: true,
                    tenant_name: true,
                    lease_start: true,
                    lease_end: true,
                    tax_payment_date: true,
                    tax_amount: true,
                    legal_issue: true,
                    resolution_date: true,
                    permit_approval_date: true,
                    disaster_type: true,
                    disaster_date: true,
                    disaster_description: true,
                    status_after_disaster: true,
                    environmental_assessment_date: true,
                    insurance_policy_number: true,
                    claim_date: true,
                    claim_amount: true,
                    crime_type: true,
                    crime_date: true,
                    valuation_date: true,
                    property_value: true,
                    dispute_type: true,
                    dispute_status: true,
                    dispute_resolution_date: true,
                },
            },
        },
    });
};
exports.getVehiclesWithHistoryService = getVehiclesWithHistoryService;
// export const getSingleUserWithBookingService = async (id:number): Promise<TSUsers[] | null> =>{
//     return await db.query.usersTable.findMany({
//         where: eq(usersTable.user_id,id),
//         with:{
//             bookings: {
//                 columns: {
//                   booking_id: true,
//                   vehicle_id: true,
//                   location_id: true,
//                   booking_date: true,
//                   return_date: true,
//                   total_amount: true,
//                 },
//               },
//             }
//     })
// }
