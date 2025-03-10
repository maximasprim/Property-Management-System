import {
  integer,
  pgEnum,
  date,
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  uuid,
  text,
  decimal,
  json
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { stat } from "fs";

// Role Enum
export const roleEnum = pgEnum("role", ["user", "admin","both"]);

// //property type
export const propertyTypeEnum = pgEnum("property_type", ["house", "land", "vehicle"]);

// Users Table
export const usersTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  full_name: varchar("full_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  contact_phone: varchar("contact_phone", { length: 20 }),
  address: varchar("address", { length: 255 }),
  role: roleEnum("role").default("user"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//authentications table
export const authenticationsTable = pgTable("authentications", {
  auth_id: serial("auth_id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.user_id,{ onDelete: "cascade"}),
  username: varchar("username", { length: 256 }).notNull(),
  role: roleEnum("role").default("user"),
  password: varchar("password", { length: 256 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
// Houses Table
export const housesTable = pgTable("houses", {
  property_id: serial("property_id").primaryKey(),
  // owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  address: varchar("address").references(() => locationsTable.address, { onDelete: "set null" }),
  name: varchar("name_of_House", { length: 255 }).notNull(),
  house_type: varchar("house_type", { length: 50 }).notNull(),
  number_of_rooms: integer("number_of_rooms").notNull(),
  size: integer("size_of_property").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  year_built: integer("year_built"),
  images: json("images").default([]), // Array of image URLs
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//houses history table
export const houseHistoryTable = pgTable("house_history", {
history_id: serial("history_id").primaryKey(),
property_id: integer("property_id").references(() => housesTable.property_id, { onDelete: "cascade" }),
// Ownership History
previous_owner: varchar("previous_owner", { length: 255 }),
transfer_date: date("transfer_date"),
// Maintenance and Repairs Hi story
maintenance_date: date("maintenance_date"),
maintenance_type: varchar("maintenance_type", { length: 255 }),
service_provider: varchar("maintenance_provider", { length: 255 }),
maintenance_cost: integer("maintenance_cost"),

// Rental or Occupancy History
tenant_name: varchar("tenant_name", { length: 255 }),
lease_start: date("lease_start"),
lease_end: date("lease_end"),
usage_type: varchar("usage_type", { length: 50 }), // e.g., 'residential', 'commercial'
// Legal and Regulatory History
legal_issue: varchar("legal_issue", { length: 255 }),
resolution_date: date("resolution_date"),
// permit_approval_date: date("permit_approval_date"),

// Environmental History
disaster_type: varchar("disaster_type", { length: 255 }),
disaster_description: text("disaster_description"),
disaster_date: date("disaster_date"),
status_after_disaster: varchar("status_after_disaster", { length: 50 }),
environmental_assessment_date: date("environmental_assessment_date"),


// Crime and Safety History
crime_type: varchar("crime_type", { length: 255 }),
crime_date: date("crime_date"),

// Market and Valuation History
valuation_date: date("valuation_date"),
property_value: integer("property_value"),

// Utility and Infrastructure History
utility_type: varchar("utility_type", { length: 50 }),
utility_installation_amount: integer("utility_installation_amount"),
utility_installation_date: date("utility_installation_date"),


// Tenant Feedback or Reviews
tenant_feedback: text("tenant_feedback"),
feedback_date: date("feedback_date"),

// Development History
construction_date: date("construction_date"),
renovation_date: date("renovation_date"),

});


// Land Table
export const landTable = pgTable("land", {
  property_id: serial("property_id").primaryKey(),
  property_name: varchar("property_name", { length: 255 }).notNull(),
  location: varchar("location").references(() => locationsTable.address, { onDelete: "set null" }),
  size: integer("size").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  land_type: varchar("land_type", { length: 50 }).notNull(),
  images: json("images").default([]), // Array of image URLs
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//land history table
export const landHistoryTable = pgTable("land_history", {
  history_id: serial("history_id").primaryKey(),
  property_id: integer("property_id").references(() => landTable.property_id, { onDelete: "cascade" }),
  // Ownership History
  previous_owner: varchar("previous_owner", { length: 255 }),
  transfer_date: date("transfer_date").notNull(),
 
  // Rental or Occupancy History
  tenant_name: varchar("tenant_name", { length: 255 }),
  lease_start: date("lease_start"),
  lease_end: date("lease_end"),
  
  // Legal and Regulatory History
  legal_issue: varchar("legal_issue", { length: 255 }),
  resolution_date: date("resolution_date"),
  permit_approval_date: date("permit_approval_date"),

  // Environmental History
  disaster_type: varchar("disaster_type", { length: 255 }),
  disaster_description: text("disaster_description"),
  disaster_date: date("disaster_date"),
  status_after_disaster: varchar("status_after_disaster", { length: 50 }),
  environmental_assessment_date: date("environmental_assessment_date"),

  // Crime and Safety History
  crime_type: varchar("crime_type", { length: 255 }),
  crime_date: date("crime_date"),
 
  // Market and Valuation History
  valuation_date: date("valuation_date"),
  property_value: integer("property_value"),

  // Dispute and Litigation History
  dispute_type: varchar("dispute_type", { length: 255 }),
  dispute_status: varchar("dispute_status", { length: 50 }),
  dispute_resolution_date: date("dispute_resolution_date"),

  // Tenant Feedback or Reviews
  tenant_feedback: text("tenant_feedback"),
  feedback_date: date("feedback_date"),
  
});

// Vehicles Table
export const vehiclesTable = pgTable("vehicles", {
  property_id: serial("property_id").primaryKey(),
  // owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  vin: varchar("vin", { length: 100 }).unique().notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  fuel_type: varchar("fuel_type", { length: 50 }),
  location: varchar("location").references(() => locationsTable.address, { onDelete: "set null" }),
  images: json("images").default([]), // Array of image URLs
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//vehicles history table
export const vehiclesHistoryTable = pgTable("vehicles_history", {
history_id: serial("history_id").primaryKey(),
property_id: integer("property_id").references(() => vehiclesTable.property_id, { onDelete: "cascade" }),
// Ownership History
previous_owner: varchar("previous_owner", { length: 255 }),
transfer_date: date("transfer_date"),

// Maintenance and Repairs Hi story
maintenance_type: varchar("maintenance_type", { length: 255 }),
maintenance_date: date("maintenance_date"),
service_provider: varchar("service_provider", { length: 255 }),
maintenance_cost: integer("maintenance_cost"),

// Rental or Occupancy History
tenant_name: varchar("tenant_name", { length: 255 }),
lease_start: date("lease_start"),
lease_end: date("lease_end"),

// Payment History
tax_payment_date: date("tax_payment_date"),
tax_amount: integer("tax_amount"),

// Legal and Regulatory History
legal_issue: varchar("legal_issue", { length: 255 }),
resolution_date: date("resolution_date"),
permit_approval_date: date("permit_approval_date"),

// Environmental History
disaster_type: varchar("disaster_type", { length: 255 }),
disaster_description: text("disaster_description"),
disaster_date: date("disaster_date"),
status_after_disaster: varchar("status_after_disaster", { length: 50 }),
environmental_assessment_date: date("environmental_assessment_date"),

// Insurance History
insurance_policy_number: varchar("insurance_policy_number", { length: 50 }),
claim_date: date("insurance_claim_date"),
claim_amount: integer("insurance_claim_amount"),

// Crime and Safety History
crime_type: varchar("crime_type", { length: 255 }),
crime_date: date("crime_date"),

// Market and Valuation History
valuation_date: date("valuation_date"),
property_value: integer("property_value"),


// Dispute and Litigation History
dispute_type: varchar("dispute_type", { length: 255 }),
dispute_status: varchar("dispute_status", { length: 50 }),
dispute_resolution_date: date("dispute_resolution_date"),


})
//locations and branches

export const locationsTable = pgTable("location", {
  name_of_branch: varchar("name_of_branch", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).primaryKey(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  zip_code: varchar("zip_code", { length: 10 }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//Bookings Table
export const bookingsTable = pgTable("bookings", {
  booking_id: serial("booking_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_name: varchar("property_name").notNull(),
  // property_id: integer("property_id").notNull(),
  total_amount: integer("total_amount").notNull(),
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  booking_date: timestamp("booking_date").notNull().defaultNow(),
  status: varchar("status", { length: 50 }).notNull(),// confirmed, pending, cancelled
  location: varchar("location").references(() => locationsTable.address, { onDelete: "set null"})
});

// // Payments Table (covers all property types)
export const paymentsTable = pgTable("payments", {
  payment_id: serial("payment_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_name: varchar("property_name").notNull(),
  // property_id: integer("property_id").notNull(),
  amount:integer("amount").notNull(),
  booking_id: integer("booking_id").references(() => bookingsTable.booking_id, { onDelete: "set null" }),
  buyer_id: integer("buyer_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  transaction_date: timestamp("transaction_date").notNull().defaultNow(),
  transaction_id: varchar("transaction_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 256 }).default("Pending"),
  payment_method: varchar("payment_method", { length: 50 }).notNull(),
});

// Reviews Table (covers all property types)
export const reviewsTable = pgTable("reviews", {
  review_id: serial("review_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_name: varchar("property_name").notNull(),
  user_name:varchar("user_name").notNull(),
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
});



// Relations
export const userRelations = relations(usersTable, ({ one,many }) => ({
  auth: one(authenticationsTable),
  reviews: many(reviewsTable),
  payments: many(paymentsTable),
  bookings: many(bookingsTable),
}));

export const authenticationsRelations = relations(authenticationsTable, ({ one }) => ({
  user: one(usersTable,{
    fields:[authenticationsTable.user_id],
    references:[usersTable.user_id]
  }),
}));

export const houseRelations = relations(housesTable, ({ many }) => ({
  history: many(houseHistoryTable),
  payments: many(paymentsTable),
  locations: many(locationsTable),
  reviews: many(reviewsTable),
  
}));

export const houseHistoryRelations = relations(houseHistoryTable, ({ one }) => ({
  house: one(housesTable,{
    fields:[houseHistoryTable.property_id],
    references:[housesTable.property_id]
  }),
}));

export const landRelations = relations(landTable, ({ many }) => ({
  history: many(landHistoryTable),
  payments: many(paymentsTable),
  locations: many(locationsTable),
  reviews: many(reviewsTable),
  // media: many(propertyMediaTable),
}));

export const landHistoryRelations = relations(landHistoryTable, ({ one }) => ({
  land: one(landTable,{
    fields:[landHistoryTable.property_id],
    references:[landTable.property_id]
  }),
}));

export const vehicleRelations = relations(vehiclesTable, ({ many }) => ({
  history: many(vehiclesHistoryTable),
  locations: many(locationsTable),
  payments: many(paymentsTable),
  reviews: many(reviewsTable),
  // media: many(propertyMediaTable),
}));

export const vehicleHistoryRelations = relations(vehiclesHistoryTable, ({ one }) => ({
  vehicle: one(vehiclesTable,{
    fields:[vehiclesHistoryTable.property_id],
    references:[vehiclesTable.property_id]
  }),
}));

export const locationsRelations = relations(locationsTable, ({ many }) => ({
  houses: many(housesTable),
  land: many(landTable),
  vehicles: many(vehiclesTable),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  buyer: one(usersTable,{
    fields:[paymentsTable.buyer_id],
    references:[usersTable.user_id]
  }),
  bookingsTable: one(bookingsTable,{
    fields:[paymentsTable.booking_id],
    references:[bookingsTable.booking_id]
  }),
}));

export const bookingsRelations = relations(bookingsTable, ({ one,many }) => ({
  payments: one(paymentsTable,{
    fields:[bookingsTable.booking_id],
    references:[paymentsTable.booking_id]
  }),
  users: one(usersTable,{
    fields:[bookingsTable.user_id],
    references:[usersTable.user_id]
  }),
}));

export const reviewsRelations = relations(reviewsTable, ({ many }) => ({
  users: many(usersTable),
  house: many(housesTable),
  land: many(landTable),
  vehicle: many(vehiclesTable),
}));

// Type Definitions
export type TIUsers = typeof usersTable.$inferInsert;
export type TSUsers = typeof usersTable.$inferSelect;

export type TIHouses = typeof housesTable.$inferInsert;
export type TSHouses = typeof housesTable.$inferSelect;

export type TILand = typeof landTable.$inferInsert;
export type TSLand = typeof landTable.$inferSelect;

export type TIVehicles = typeof vehiclesTable.$inferInsert;
export type TSVehicles = typeof vehiclesTable.$inferSelect;

export type TILocations = typeof locationsTable.$inferInsert;
export type TSLocations = typeof locationsTable.$inferSelect;

// export type TIPropertyHistory = typeof propertyHistoryTable.$inferInsert;
// export type TSPropertyHistory = typeof propertyHistoryTable.$inferSelect;

export type TIPayments = typeof paymentsTable.$inferInsert;
export type TSPayments = typeof paymentsTable.$inferSelect;

export type TIBookings = typeof bookingsTable.$inferInsert;
export type TSBookings = typeof bookingsTable.$inferSelect;

export type TIReviews = typeof reviewsTable.$inferInsert;
export type TSReviews = typeof reviewsTable.$inferSelect;

export type TIAuthentications = typeof authenticationsTable.$inferInsert;
export type TSAuthentications = typeof authenticationsTable.$inferSelect;

export type TIHouseHistory = typeof houseHistoryTable.$inferInsert;
export type TSHouseHistory = typeof houseHistoryTable.$inferSelect;

export type TILandHistory = typeof landHistoryTable.$inferInsert;
export type TSLandHistory = typeof landHistoryTable.$inferSelect;

export type TIVehiclesHistory = typeof vehiclesHistoryTable.$inferInsert;
export type TSVehiclesHistory = typeof vehiclesHistoryTable.$inferSelect;

// export type TIPropertyMedia = typeof propertyMediaTable.$inferInsert;
// export type TSPropertyMedia = typeof propertyMediaTable.$inferSelect;
