DO $$ BEGIN
 CREATE TYPE "record_type" AS ENUM('expense', 'income', 'currentBalance');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "records" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" real NOT NULL,
	"type" "record_type" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
