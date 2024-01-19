import type { Config } from "drizzle-kit";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// for query purposes
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// This is used by drizzle-studio & drizzle-migrations
export default {
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  schema: "./src/database/models/**/*.model.drizzle.ts",
  out: "./src/database/migrations",
} satisfies Config;

const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient);
