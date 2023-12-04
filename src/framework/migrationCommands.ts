import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";

async function getKyselyMigrator() {
  // Resolve the absolute path for the migration folder
  const migrationFolderPath = path.resolve("./src/database/migrations");

  // Logging the resolved path for debugging
  console.log(`Using migration folder path: ${migrationFolderPath}`);

  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: migrationFolderPath, // Use the resolved absolute path
    }),
  });

  return { migrator, db };
}

export async function migrateToLatest(pathString: string) {
  // Resolve the absolute path for the migration folder
  const { migrator, db } = await getKyselyMigrator();
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("Failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}
