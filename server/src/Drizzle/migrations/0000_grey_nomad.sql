DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'buyer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorites" (
	"favorite_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"property_type" varchar(50) NOT NULL,
	"property_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "houses" (
	"house_id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer,
	"address" varchar(255) NOT NULL,
	"number_of_rooms" integer NOT NULL,
	"size" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"status" varchar(50) NOT NULL,
	"year_built" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "land" (
	"land_id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer,
	"location" varchar(255) NOT NULL,
	"size" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"status" varchar(50) NOT NULL,
	"land_type" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_history" (
	"history_id" serial PRIMARY KEY NOT NULL,
	"property_type" varchar(50) NOT NULL,
	"property_id" integer NOT NULL,
	"event" varchar(255) NOT NULL,
	"event_date" timestamp NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"property_type" varchar(50) NOT NULL,
	"property_id" integer NOT NULL,
	"user_id" integer,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"transaction_id" serial PRIMARY KEY NOT NULL,
	"property_type" varchar(50) NOT NULL,
	"property_id" integer NOT NULL,
	"buyer_id" integer,
	"sale_price" numeric(10, 2) NOT NULL,
	"transaction_date" timestamp DEFAULT now() NOT NULL,
	"status" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"role" "role" DEFAULT 'user',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"vin" varchar(100) NOT NULL,
	"status" varchar(50) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"mileage" integer NOT NULL,
	"fuel_type" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicles_vin_unique" UNIQUE("vin")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "houses" ADD CONSTRAINT "houses_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "land" ADD CONSTRAINT "land_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_buyer_id_users_user_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("user_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
