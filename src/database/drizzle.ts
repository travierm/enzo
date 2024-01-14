import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { migrate } from 'drizzle-orm/postgres-js/migrator';

// // for migrations
// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient);
