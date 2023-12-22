import fs from "fs";
import path from "path";

const migrationName = process.argv[3];
if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const now = new Date();
const date = now.toISOString().split("T")[0].replace(/-/g, "");
const time = now.toTimeString().split(" ")[0].replace(/:/g, "");
const filename = `${migrationName}_${date}_${time}.ts`;

const srcPath = path.join("src/database/migrations", filename);

fs.copyFileSync("src/framework/stubs/migration.stub.ts", srcPath);
console.log(`Migration created: ${srcPath}`);
