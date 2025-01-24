import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  uuid,
  text,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Role Enum
export const roleEnum = pgEnum("role", ["user", "admin", "buyer"]);
//propert type
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
  house_id: serial("house_id").primaryKey(),
  owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  address: varchar("address").references(() => locationsTable.address, { onDelete: "set null" }),
  name: varchar("name_of_House", { length: 255 }).notNull(),
  number_of_rooms: integer("number_of_rooms").notNull(),
  size: integer("size").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  year_built: integer("year_built"),
  image1: text("image"),
  imade2: text("image"),
  image3: text("image"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Land Table
export const landTable = pgTable("land", {
  land_id: serial("land_id").primaryKey(),
  owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  location: varchar("location").references(() => locationsTable.address, { onDelete: "set null" }),
  size: integer("size").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  land_type: varchar("land_type", { length: 50 }).notNull(),
  image: text("image"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Vehicles Table
export const vehiclesTable = pgTable("vehicles", {
  vehicle_id: serial("vehicle_id").primaryKey(),
  owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  vin: varchar("vin", { length: 100 }).unique().notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  fuel_type: varchar("fuel_type", { length: 50 }),
  location: varchar("location").references(() => locationsTable.address, { onDelete: "set null" }),
  image1: text("image1"),
  image2: text("image2"),
  image3: text("image3"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

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

// Property History Table (covers all property types)
export const propertyHistoryTable = pgTable("property_history", {
  history_id: serial("history_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  event: varchar("event", { length: 255 }).notNull(),
  event_date: timestamp("event_date").notNull(),
  description: text("description"),
});

//Bookings Table
export const bookingsTable = pgTable("bookings", {
  booking_id: serial("booking_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
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
  property_id: integer("property_id").notNull(),
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
  property_id: integer("property_id").notNull(),
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});



// Relations
export const userRelations = relations(usersTable, ({ one,many }) => ({
  auth: one(authenticationsTable),
  reviews: many(reviewsTable),
  payments: many(paymentsTable)
}));

export const authenticationsRelations = relations(authenticationsTable, ({ one }) => ({
  users: one(usersTable),
}));

export const houseRelations = relations(housesTable, ({ many }) => ({
  history: many(propertyHistoryTable),
  payments: many(paymentsTable),
  locations: many(locationsTable),
  reviews: many(reviewsTable),
  
}));

export const landRelations = relations(landTable, ({ many }) => ({
  history: many(propertyHistoryTable),
  payments: many(paymentsTable),
  locations: many(locationsTable),
  reviews: many(reviewsTable),
  // media: many(propertyMediaTable),
}));

export const vehicleRelations = relations(vehiclesTable, ({ many }) => ({
  history: many(propertyHistoryTable),
  locations: many(locationsTable),
  payments: many(paymentsTable),
  reviews: many(reviewsTable),
  // media: many(propertyMediaTable),
}));

export const locationsRelations = relations(locationsTable, ({ many }) => ({
  houses: many(housesTable),
  land: many(landTable),
  vehicles: many(vehiclesTable),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  buyer: one(usersTable),
  bookingsTable: one(bookingsTable),
}));

export const bookingsRelations = relations(bookingsTable, ({ one,many }) => ({
  payments: one(paymentsTable),
  users: one(usersTable),
}));

export const historyRelations = relations(propertyHistoryTable, ({ many }) => ({
  house: many(housesTable),
  land: many(landTable),
  vehicle: many(vehiclesTable),
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

export type TIPropertyHistory = typeof propertyHistoryTable.$inferInsert;
export type TSPropertyHistory = typeof propertyHistoryTable.$inferSelect;

export type TIPayments = typeof paymentsTable.$inferInsert;
export type TSPayments = typeof paymentsTable.$inferSelect;

export type TIBookings = typeof bookingsTable.$inferInsert;
export type TSBookings = typeof bookingsTable.$inferSelect;

export type TIReviews = typeof reviewsTable.$inferInsert;
export type TSReviews = typeof reviewsTable.$inferSelect;

// export type TIPropertyMedia = typeof propertyMediaTable.$inferInsert;
// export type TSPropertyMedia = typeof propertyMediaTable.$inferSelect;
