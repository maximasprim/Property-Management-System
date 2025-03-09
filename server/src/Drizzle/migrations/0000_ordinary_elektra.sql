DO $$ BEGIN
 CREATE TYPE "public"."property_type" AS ENUM('house', 'land', 'vehicle');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'both');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authentications" (
	"auth_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"username" varchar(256) NOT NULL,
	"role" "role" DEFAULT 'user',
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"property_type" varchar(50) NOT NULL,
	"property_name" varchar NOT NULL,
	"total_amount" integer NOT NULL,
	"user_id" integer,
	"booking_date" timestamp DEFAULT now() NOT NULL,
	"status" varchar(50) NOT NULL,
	"location" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "house_history" (
	"history_id" serial PRIMARY KEY NOT NULL,
	"property_id" integer,
	"previous_owner" varchar(255),
	"transfer_date" date,
	"maintenance_date" date,
	"maintenance_type" varchar(255),
	"maintenance_provider" varchar(255),
	"maintenance_cost" integer,
	"tenant_name" varchar(255),
	"lease_start" date,
	"lease_end" date,
	"usage_type" varchar(50),
	"legal_issue" varchar(255),
	"resolution_date" date,
	"disaster_type" varchar(255),
	"disaster_description" text,
	"disaster_date" date,
	"status_after_disaster" varchar(50),
	"environmental_assessment_date" date,
	"crime_type" varchar(255),
	"crime_date" date,
	"valuation_date" date,
	"property_value" integer,
	"utility_type" varchar(50),
	"utility_installation_amount" integer,
	"utility_installation_date" date,
	"tenant_feedback" text,
	"feedback_date" date,
	"construction_date" date,
	"renovation_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "houses" (
	"property_id" serial PRIMARY KEY NOT NULL,
	"address" varchar,
	"name_of_House" varchar(255) NOT NULL,
	"house_type" varchar(50) NOT NULL,
	"number_of_rooms" integer NOT NULL,
	"size_of_property" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"status" varchar(50) NOT NULL,
	"year_built" integer,
	"images" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "land_history" (
	"history_id" serial PRIMARY KEY NOT NULL,
	"property_id" integer,
	"previous_owner" varchar(255),
	"transfer_date" date NOT NULL,
	"tenant_name" varchar(255),
	"lease_start" date,
	"lease_end" date,
	"legal_issue" varchar(255),
	"resolution_date" date,
	"permit_approval_date" date,
	"disaster_type" varchar(255),
	"disaster_description" text,
	"disaster_date" date,
	"status_after_disaster" varchar(50),
	"environmental_assessment_date" date,
	"crime_type" varchar(255),
	"crime_date" date,
	"valuation_date" date,
	"property_value" integer,
	"dispute_type" varchar(255),
	"dispute_status" varchar(50),
	"dispute_resolution_date" date,
	"tenant_feedback" text,
	"feedback_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "land" (
	"property_id" serial PRIMARY KEY NOT NULL,
	"property_name" varchar(255) NOT NULL,
	"location" varchar,
	"size" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"status" varchar(50) NOT NULL,
	"land_type" varchar(50) NOT NULL,
	"images" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"name_of_branch" varchar(255) NOT NULL,
	"address" varchar(255) PRIMARY KEY NOT NULL,
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"zip_code" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"property_type" varchar(50) NOT NULL,
	"property_name" varchar NOT NULL,
	"amount" integer NOT NULL,
	"booking_id" integer,
	"buyer_id" integer,
	"transaction_date" timestamp DEFAULT now() NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"status" varchar(256) DEFAULT 'Pending',
	"payment_method" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"property_type" varchar(50) NOT NULL,
	"property_name" varchar NOT NULL,
	"user_name" varchar NOT NULL,
	"user_id" integer,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"contact_phone" varchar(20),
	"address" varchar(255),
	"role" "role" DEFAULT 'user',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles_history" (
	"history_id" serial PRIMARY KEY NOT NULL,
	"property_id" integer,
	"previous_owner" varchar(255),
	"transfer_date" date,
	"maintenance_type" varchar(255),
	"maintenance_date" date,
	"service_provider" varchar(255),
	"maintenance_cost" integer,
	"tenant_name" varchar(255),
	"lease_start" date,
	"lease_end" date,
	"tax_payment_date" date,
	"tax_amount" integer,
	"legal_issue" varchar(255),
	"resolution_date" date,
	"permit_approval_date" date,
	"disaster_type" varchar(255),
	"disaster_description" text,
	"disaster_date" date,
	"status_after_disaster" varchar(50),
	"environmental_assessment_date" date,
	"insurance_policy_number" varchar(50),
	"insurance_claim_date" date,
	"insurance_claim_amount" integer,
	"crime_type" varchar(255),
	"crime_date" date,
	"valuation_date" date,
	"property_value" integer,
	"dispute_type" varchar(255),
	"dispute_status" varchar(50),
	"dispute_resolution_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"property_id" serial PRIMARY KEY NOT NULL,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"vin" varchar(100) NOT NULL,
	"status" varchar(50) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"mileage" integer NOT NULL,
	"fuel_type" varchar(50),
	"location" varchar,
	"images" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicles_vin_unique" UNIQUE("vin")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authentications" ADD CONSTRAINT "authentications_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_location_location_address_fk" FOREIGN KEY ("location") REFERENCES "public"."location"("address") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "house_history" ADD CONSTRAINT "house_history_property_id_houses_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."houses"("property_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "houses" ADD CONSTRAINT "houses_address_location_address_fk" FOREIGN KEY ("address") REFERENCES "public"."location"("address") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "land_history" ADD CONSTRAINT "land_history_property_id_land_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."land"("property_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "land" ADD CONSTRAINT "land_location_location_address_fk" FOREIGN KEY ("location") REFERENCES "public"."location"("address") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_buyer_id_users_user_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("user_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles_history" ADD CONSTRAINT "vehicles_history_property_id_vehicles_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."vehicles"("property_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_location_location_address_fk" FOREIGN KEY ("location") REFERENCES "public"."location"("address") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
