import { Kysely, sql } from "kysely";

export type Expense = {
  id: number;
  name: string;
  amount: number;
};

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("records")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("amount", "numeric", (col) => col.notNull())
    .addColumn("createdAt", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // await db.schema
  //   .createTable("pet")
  //   .addColumn("id", "integer", (col) => col.primaryKey())
  //   .addColumn("name", "text", (col) => col.notNull().unique())
  //   .addColumn("owner_id", "integer", (col) =>
  //     col.references("person.id").onDelete("cascade").notNull()
  //   )
  //   .addColumn("species", "text", (col) => col.notNull())
  //   .execute();

  //   await db.schema
  //     .createIndex("pet_owner_id_index")
  //     .on("pet")
  //     .column("owner_id")
  //     .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("records").execute();
}
