import { Database } from "bun:sqlite";

export const db = new Database("data/db.sqlite", { create: true });

process.on("beforeExit", () => {
  db.close();
});
