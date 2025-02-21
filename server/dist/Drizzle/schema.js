"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRelations = exports.bookingsRelations = exports.paymentsRelations = exports.locationsRelations = exports.vehicleHistoryRelations = exports.vehicleRelations = exports.landHistoryRelations = exports.landRelations = exports.houseHistoryRelations = exports.houseRelations = exports.authenticationsRelations = exports.userRelations = exports.reviewsTable = exports.paymentsTable = exports.bookingsTable = exports.locationsTable = exports.vehiclesHistoryTable = exports.vehiclesTable = exports.landHistoryTable = exports.landTable = exports.houseHistoryTable = exports.housesTable = exports.authenticationsTable = exports.usersTable = exports.propertyTypeEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Role Enum
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin", "both"]);
// //property type
exports.propertyTypeEnum = (0, pg_core_1.pgEnum)("property_type", ["house", "land", "vehicle"]);
// Users Table
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    user_id: (0, pg_core_1.serial)("user_id").primaryKey(),
    full_name: (0, pg_core_1.varchar)("full_name", { length: 256 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 256 }).unique().notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }),
    address: (0, pg_core_1.varchar)("address", { length: 255 }),
    role: (0, exports.roleEnum)("role").default("user"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//authentications table
exports.authenticationsTable = (0, pg_core_1.pgTable)("authentications", {
    auth_id: (0, pg_core_1.serial)("auth_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    username: (0, pg_core_1.varchar)("username", { length: 256 }).notNull(),
    role: (0, exports.roleEnum)("role").default("user"),
    password: (0, pg_core_1.varchar)("password", { length: 256 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Houses Table
exports.housesTable = (0, pg_core_1.pgTable)("houses", {
    property_id: (0, pg_core_1.serial)("property_id").primaryKey(),
    // owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
    address: (0, pg_core_1.varchar)("address").references(() => exports.locationsTable.address, { onDelete: "set null" }),
    name: (0, pg_core_1.varchar)("name_of_House", { length: 255 }).notNull(),
    number_of_rooms: (0, pg_core_1.integer)("number_of_rooms").notNull(),
    size: (0, pg_core_1.integer)("size_of_property").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    year_built: (0, pg_core_1.integer)("year_built"),
    images: (0, pg_core_1.json)("images").default([]), // Array of image URLs
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//houses history table
exports.houseHistoryTable = (0, pg_core_1.pgTable)("house_history", {
    history_id: (0, pg_core_1.serial)("history_id").primaryKey(),
    property_id: (0, pg_core_1.integer)("property_id").references(() => exports.housesTable.property_id, { onDelete: "cascade" }),
    // Ownership History
    previous_owner: (0, pg_core_1.varchar)("previous_owner", { length: 255 }),
    transfer_date: (0, pg_core_1.date)("transfer_date"),
    // Maintenance and Repairs Hi story
    maintenance_date: (0, pg_core_1.date)("maintenance_date"),
    maintenance_type: (0, pg_core_1.varchar)("maintenance_type", { length: 255 }),
    service_provider: (0, pg_core_1.varchar)("maintenance_provider", { length: 255 }),
    maintenance_cost: (0, pg_core_1.integer)("maintenance_cost"),
    // Rental or Occupancy History
    tenant_name: (0, pg_core_1.varchar)("tenant_name", { length: 255 }),
    lease_start: (0, pg_core_1.date)("lease_start(Rental_property)"),
    lease_end: (0, pg_core_1.date)("lease_end"),
    usage_type: (0, pg_core_1.varchar)("usage_type", { length: 50 }), // e.g., 'residential', 'commercial'
    // Legal and Regulatory History
    legal_issue: (0, pg_core_1.varchar)("legal_issue", { length: 255 }),
    resolution_date: (0, pg_core_1.date)("resolution_date"),
    // permit_approval_date: date("permit_approval_date"),
    // Environmental History
    disaster_type: (0, pg_core_1.varchar)("disaster_type", { length: 255 }),
    disaster_description: (0, pg_core_1.text)("disaster_description"),
    disaster_date: (0, pg_core_1.date)("disaster_date"),
    status_after_disaster: (0, pg_core_1.varchar)("status_after_disaster", { length: 50 }),
    environmental_assessment_date: (0, pg_core_1.date)("environmental_assessment_date"),
    // Crime and Safety History
    crime_type: (0, pg_core_1.varchar)("crime_type", { length: 255 }),
    crime_date: (0, pg_core_1.date)("crime_date"),
    // Market and Valuation History
    valuation_date: (0, pg_core_1.date)("valuation_date"),
    property_value: (0, pg_core_1.integer)("property_value"),
    // Utility and Infrastructure History
    utility_type: (0, pg_core_1.varchar)("utility_type", { length: 50 }),
    utility_installation_amount: (0, pg_core_1.integer)("utility_installation_amount"),
    utility_installation_date: (0, pg_core_1.date)("utility_installation_date"),
    // Tenant Feedback or Reviews
    tenant_feedback: (0, pg_core_1.text)("tenant_feedback"),
    feedback_date: (0, pg_core_1.date)("feedback_date"),
    // Development History
    construction_date: (0, pg_core_1.date)("construction_date"),
    renovation_date: (0, pg_core_1.date)("renovation_date"),
});
// Land Table
exports.landTable = (0, pg_core_1.pgTable)("land", {
    property_id: (0, pg_core_1.serial)("property_id").primaryKey(),
    location: (0, pg_core_1.varchar)("location").references(() => exports.locationsTable.address, { onDelete: "set null" }),
    size: (0, pg_core_1.integer)("size").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    land_type: (0, pg_core_1.varchar)("land_type", { length: 50 }).notNull(),
    images: (0, pg_core_1.json)("images").default([]), // Array of image URLs
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//land history table
exports.landHistoryTable = (0, pg_core_1.pgTable)("land_history", {
    history_id: (0, pg_core_1.serial)("history_id").primaryKey(),
    property_id: (0, pg_core_1.integer)("property_id").references(() => exports.landTable.property_id, { onDelete: "cascade" }),
    // Ownership History
    previous_owner: (0, pg_core_1.varchar)("previous_owner", { length: 255 }),
    transfer_date: (0, pg_core_1.date)("transfer_date").notNull(),
    // Rental or Occupancy History
    tenant_name: (0, pg_core_1.varchar)("tenant_name(For_Rental_Property)", { length: 255 }),
    lease_start: (0, pg_core_1.date)("lease_start"),
    lease_end: (0, pg_core_1.date)("lease_end"),
    // Legal and Regulatory History
    legal_issue: (0, pg_core_1.varchar)("legal_issue", { length: 255 }),
    resolution_date: (0, pg_core_1.date)("resolution_date"),
    permit_approval_date: (0, pg_core_1.date)("permit_approval_date"),
    // Environmental History
    disaster_type: (0, pg_core_1.varchar)("disaster_type", { length: 255 }),
    disaster_description: (0, pg_core_1.text)("disaster_description"),
    disaster_date: (0, pg_core_1.date)("disaster_date"),
    status_after_disaster: (0, pg_core_1.varchar)("status_after_disaster", { length: 50 }),
    environmental_assessment_date: (0, pg_core_1.date)("environmental_assessment_date"),
    // Crime and Safety History
    crime_type: (0, pg_core_1.varchar)("crime_type", { length: 255 }),
    crime_date: (0, pg_core_1.date)("crime_date"),
    // Market and Valuation History
    valuation_date: (0, pg_core_1.date)("valuation_date"),
    property_value: (0, pg_core_1.integer)("property_value"),
    // Dispute and Litigation History
    dispute_type: (0, pg_core_1.varchar)("dispute_type", { length: 255 }),
    dispute_status: (0, pg_core_1.varchar)("dispute_status", { length: 50 }),
    dispute_resolution_date: (0, pg_core_1.date)("dispute_resolution_date"),
    // Tenant Feedback or Reviews
    tenant_feedback: (0, pg_core_1.text)("tenant_feedback(For_rental_properry)"),
    feedback_date: (0, pg_core_1.date)("feedback_date"),
});
// Vehicles Table
exports.vehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    property_id: (0, pg_core_1.serial)("property_id").primaryKey(),
    // owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
    make: (0, pg_core_1.varchar)("make", { length: 100 }).notNull(),
    model: (0, pg_core_1.varchar)("model", { length: 100 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    vin: (0, pg_core_1.varchar)("vin", { length: 100 }).unique().notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    mileage: (0, pg_core_1.integer)("mileage").notNull(),
    fuel_type: (0, pg_core_1.varchar)("fuel_type", { length: 50 }),
    location: (0, pg_core_1.varchar)("location").references(() => exports.locationsTable.address, { onDelete: "set null" }),
    images: (0, pg_core_1.json)("images").default([]), // Array of image URLs
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//vehicles history table
exports.vehiclesHistoryTable = (0, pg_core_1.pgTable)("vehicles_history", {
    history_id: (0, pg_core_1.serial)("history_id").primaryKey(),
    property_id: (0, pg_core_1.integer)("property_id").references(() => exports.vehiclesTable.property_id, { onDelete: "cascade" }),
    // Ownership History
    previous_owner: (0, pg_core_1.varchar)("previous_owner", { length: 255 }),
    transfer_date: (0, pg_core_1.date)("transfer_date"),
    // Maintenance and Repairs Hi story
    maintenance_type: (0, pg_core_1.varchar)("maintenance_type", { length: 255 }),
    maintenance_date: (0, pg_core_1.date)("maintenance_date"),
    service_provider: (0, pg_core_1.varchar)("service_provider", { length: 255 }),
    maintenance_cost: (0, pg_core_1.integer)("maintenance_cost"),
    // Rental or Occupancy History
    tenant_name: (0, pg_core_1.varchar)("tenant_name", { length: 255 }),
    lease_start: (0, pg_core_1.date)("lease_start"),
    lease_end: (0, pg_core_1.date)("lease_end"),
    // Payment History
    tax_payment_date: (0, pg_core_1.date)("tax_payment_date"),
    tax_amount: (0, pg_core_1.integer)("tax_amount"),
    // Legal and Regulatory History
    legal_issue: (0, pg_core_1.varchar)("legal_issue", { length: 255 }),
    resolution_date: (0, pg_core_1.date)("resolution_date"),
    permit_approval_date: (0, pg_core_1.date)("permit_approval_date"),
    // Environmental History
    disaster_type: (0, pg_core_1.varchar)("disaster_type", { length: 255 }),
    disaster_description: (0, pg_core_1.text)("disaster_description"),
    disaster_date: (0, pg_core_1.date)("disaster_date"),
    status_after_disaster: (0, pg_core_1.varchar)("status_after_disaster", { length: 50 }),
    environmental_assessment_date: (0, pg_core_1.date)("environmental_assessment_date"),
    // Insurance History
    insurance_policy_number: (0, pg_core_1.varchar)("insurance_policy_number", { length: 50 }),
    claim_date: (0, pg_core_1.date)("insurance_claim_date"),
    claim_amount: (0, pg_core_1.integer)("insurance_claim_amount"),
    // Crime and Safety History
    crime_type: (0, pg_core_1.varchar)("crime_type", { length: 255 }),
    crime_date: (0, pg_core_1.date)("crime_date"),
    // Market and Valuation History
    valuation_date: (0, pg_core_1.date)("valuation_date"),
    property_value: (0, pg_core_1.integer)("property_value"),
    // Dispute and Litigation History
    dispute_type: (0, pg_core_1.varchar)("dispute_type", { length: 255 }),
    dispute_status: (0, pg_core_1.varchar)("dispute_status", { length: 50 }),
    dispute_resolution_date: (0, pg_core_1.date)("dispute_resolution_date"),
});
//locations and branches
exports.locationsTable = (0, pg_core_1.pgTable)("location", {
    name_of_branch: (0, pg_core_1.varchar)("name_of_branch", { length: 255 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 255 }).primaryKey(),
    city: (0, pg_core_1.varchar)("city", { length: 100 }).notNull(),
    country: (0, pg_core_1.varchar)("country", { length: 100 }).notNull(),
    zip_code: (0, pg_core_1.varchar)("zip_code", { length: 10 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//Bookings Table
exports.bookingsTable = (0, pg_core_1.pgTable)("bookings", {
    booking_id: (0, pg_core_1.serial)("booking_id").primaryKey(),
    property_type: (0, pg_core_1.varchar)("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
    property_id: (0, pg_core_1.integer)("property_id").notNull(),
    total_amount: (0, pg_core_1.integer)("total_amount").notNull(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    booking_date: (0, pg_core_1.timestamp)("booking_date").notNull().defaultNow(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(), // confirmed, pending, cancelled
    location: (0, pg_core_1.varchar)("location").references(() => exports.locationsTable.address, { onDelete: "set null" })
});
// // Payments Table (covers all property types)
exports.paymentsTable = (0, pg_core_1.pgTable)("payments", {
    payment_id: (0, pg_core_1.serial)("payment_id").primaryKey(),
    property_type: (0, pg_core_1.varchar)("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
    property_id: (0, pg_core_1.integer)("property_id").notNull(),
    amount: (0, pg_core_1.integer)("amount").notNull(),
    booking_id: (0, pg_core_1.integer)("booking_id").references(() => exports.bookingsTable.booking_id, { onDelete: "set null" }),
    buyer_id: (0, pg_core_1.integer)("buyer_id").references(() => exports.usersTable.user_id, { onDelete: "set null" }),
    transaction_date: (0, pg_core_1.timestamp)("transaction_date").notNull().defaultNow(),
    transaction_id: (0, pg_core_1.varchar)("transaction_id", { length: 255 }).notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 256 }).default("Pending"),
    payment_method: (0, pg_core_1.varchar)("payment_method", { length: 50 }).notNull(),
});
// Reviews Table (covers all property types)
exports.reviewsTable = (0, pg_core_1.pgTable)("reviews", {
    review_id: (0, pg_core_1.serial)("review_id").primaryKey(),
    property_type: (0, pg_core_1.varchar)("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
    property_id: (0, pg_core_1.integer)("property_id").notNull(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    rating: (0, pg_core_1.integer)("rating").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
// Relations
exports.userRelations = (0, drizzle_orm_1.relations)(exports.usersTable, ({ one, many }) => ({
    auth: one(exports.authenticationsTable),
    reviews: many(exports.reviewsTable),
    payments: many(exports.paymentsTable)
}));
exports.authenticationsRelations = (0, drizzle_orm_1.relations)(exports.authenticationsTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.authenticationsTable.user_id],
        references: [exports.usersTable.user_id]
    }),
}));
exports.houseRelations = (0, drizzle_orm_1.relations)(exports.housesTable, ({ many }) => ({
    history: many(exports.houseHistoryTable),
    payments: many(exports.paymentsTable),
    locations: many(exports.locationsTable),
    reviews: many(exports.reviewsTable),
}));
exports.houseHistoryRelations = (0, drizzle_orm_1.relations)(exports.houseHistoryTable, ({ one }) => ({
    house: one(exports.housesTable),
}));
exports.landRelations = (0, drizzle_orm_1.relations)(exports.landTable, ({ many }) => ({
    history: many(exports.landHistoryTable),
    payments: many(exports.paymentsTable),
    locations: many(exports.locationsTable),
    reviews: many(exports.reviewsTable),
    // media: many(propertyMediaTable),
}));
exports.landHistoryRelations = (0, drizzle_orm_1.relations)(exports.landHistoryTable, ({ one }) => ({
    land: one(exports.landTable),
}));
exports.vehicleRelations = (0, drizzle_orm_1.relations)(exports.vehiclesTable, ({ many }) => ({
    history: many(exports.vehiclesHistoryTable),
    locations: many(exports.locationsTable),
    payments: many(exports.paymentsTable),
    reviews: many(exports.reviewsTable),
    // media: many(propertyMediaTable),
}));
exports.vehicleHistoryRelations = (0, drizzle_orm_1.relations)(exports.vehiclesHistoryTable, ({ one }) => ({
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.vehiclesHistoryTable.property_id],
        references: [exports.vehiclesTable.property_id]
    }),
}));
exports.locationsRelations = (0, drizzle_orm_1.relations)(exports.locationsTable, ({ many }) => ({
    houses: many(exports.housesTable),
    land: many(exports.landTable),
    vehicles: many(exports.vehiclesTable),
}));
exports.paymentsRelations = (0, drizzle_orm_1.relations)(exports.paymentsTable, ({ one }) => ({
    buyer: one(exports.usersTable),
    bookingsTable: one(exports.bookingsTable),
}));
exports.bookingsRelations = (0, drizzle_orm_1.relations)(exports.bookingsTable, ({ one, many }) => ({
    payments: one(exports.paymentsTable),
    users: one(exports.usersTable),
}));
exports.reviewsRelations = (0, drizzle_orm_1.relations)(exports.reviewsTable, ({ many }) => ({
    users: many(exports.usersTable),
    house: many(exports.housesTable),
    land: many(exports.landTable),
    vehicle: many(exports.vehiclesTable),
}));
// export type TIPropertyMedia = typeof propertyMediaTable.$inferInsert;
// export type TSPropertyMedia = typeof propertyMediaTable.$inferSelect;
