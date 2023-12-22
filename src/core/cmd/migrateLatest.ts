import { migrateToLatest } from "../../../_archive/migrationCommands";

async function main() {
  await migrateToLatest("./src/database/migrations");
}

await main();
