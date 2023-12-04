import { migrateToLatest } from "../migrationCommands";

async function main() {
  await migrateToLatest("./src/database/migrations");
}

await main();
