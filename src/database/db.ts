import { Insertable, Kysely, PostgresDialect } from "kysely";
import { DB, Records } from "kysely-codegen";
import { Pool } from "pg";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

export function createRecord(record: Insertable<Records>) {
  return db.insertInto("records").values(record).execute();
}

export function getRecordsByType(type: string) {
  return db
    .selectFrom("records")
    .where("type", "=", type)
    .selectAll()
    .execute();
}
