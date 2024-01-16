import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import { RecordTable } from "./models/record/record.model";

export type DB = {
  records: RecordTable;
};

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});
