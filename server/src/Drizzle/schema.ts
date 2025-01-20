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
  address: varchar("address").references(() => locationBranches.address, { onDelete: "set null" }),
  name: varchar("name_of_House", { length: 255 }).notNull(),
  number_of_rooms: integer("number_of_rooms").notNull(),
  size: integer("size").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  year_built: integer("year_built"),
  image: text("image"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Land Table
export const landTable = pgTable("land", {
  land_id: serial("land_id").primaryKey(),
  owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  location: varchar("location").references(() => locationBranches.address, { onDelete: "set null" }),
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
  location: varchar("location").references(() => locationBranches.address, { onDelete: "set null" }),
  image: text("image"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//locations and branches

export const locationBranches = pgTable("location", {
  address: varchar("address", { length: 255 }).primaryKey(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
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
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  booking_date: timestamp("booking_date").notNull().defaultNow(),
  status: varchar("status", { length: 50 }).notNull(),// confirmed, pending, cancelled
});

// Transactions Table (covers all property types)
export const transactionsTable = pgTable("transactions", {
  transaction_id: serial("transaction_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  booking_id: integer("booking_id").references(() => bookingsTable.booking_id, { onDelete: "set null" }),
  buyer_id: integer("buyer_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  sale_price: decimal("sale_price", { precision: 10, scale: 2 }).notNull(),
  transaction_date: timestamp("transaction_date").notNull().defaultNow(),
  status: varchar("status", { length: 50 }).notNull(),
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

// Favorites Table (covers all property types)
export const favoritesTable = pgTable("favorites", {
  favorite_id: serial("favorite_id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

// Property Media Table (new addition)
export const propertyMediaTable = pgTable("property_media", {
  media_id: serial("media_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

// Relations
export const userRelations = relations(usersTable, ({ one,many }) => ({
  auth: one(authenticationsTable),
  reviews: many(reviewsTable),
  favorites: many(favoritesTable),
  transactions: many(transactionsTable)
}));

export const authenticationsRelations = relations(authenticationsTable, ({ one }) => ({
  users: one(usersTable),
}));

export const houseRelations = relations(housesTable, ({ many }) => ({
  history: many(propertyHistoryTable),
  transactions: many(transactionsTable),
  reviews: many(reviewsTable),
  favorites: many(favoritesTable),
  media: many(propertyMediaTable),
}));

export const landRelations = relations(landTable, ({ many }) => ({
  history: many(propertyHistoryTable),
  transactions: many(transactionsTable),
  reviews: many(reviewsTable),
  favorites: many(favoritesTable),
  media: many(propertyMediaTable),
}));

export const vehicleRelations = relations(vehiclesTable, ({ many }) => ({
  history: many(propertyHistoryTable),
  transactions: many(transactionsTable),
  reviews: many(reviewsTable),
  favorites: many(favoritesTable),
  media: many(propertyMediaTable),
}));

export const locationBranchesRelations = relations(locationBranches, ({ many }) => ({
  houses: many(housesTable),
  land: many(landTable),
  vehicles: many(vehiclesTable),
}));

export const transactionsRelations = relations(transactionsTable, ({ one }) => ({
  buyer: one(usersTable),
  bookingsTable: one(bookingsTable),
}));

export const bookingsRelations = relations(bookingsTable, ({ one,many }) => ({
  transaction: one(transactionsTable),
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

export type TILocationBranches = typeof locationBranches.$inferInsert;
export type TSLocationBranches = typeof locationBranches.$inferSelect;

export type TIPropertyHistory = typeof propertyHistoryTable.$inferInsert;
export type TSPropertyHistory = typeof propertyHistoryTable.$inferSelect;

export type TITransactions = typeof transactionsTable.$inferInsert;
export type TSTransactions = typeof transactionsTable.$inferSelect;

export type TIBookings = typeof bookingsTable.$inferInsert;
export type TSBookings = typeof bookingsTable.$inferSelect;

export type TIReviews = typeof reviewsTable.$inferInsert;
export type TSReviews = typeof reviewsTable.$inferSelect;

export type TIFavorites = typeof favoritesTable.$inferInsert;
export type TSFavorites = typeof favoritesTable.$inferSelect;

export type TIPropertyMedia = typeof propertyMediaTable.$inferInsert;
export type TSPropertyMedia = typeof propertyMediaTable.$inferSelect;
