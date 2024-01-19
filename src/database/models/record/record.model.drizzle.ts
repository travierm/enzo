import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const RecordTypeEnum = pgEnum("record_type", [
  "expense",
  "income",
  "currentBalance",
]);

export type RecordTable = typeof recordTable.$inferInsert;
export type RecordType = RecordTable["type"];

export const recordTable = pgTable("records", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  type: RecordTypeEnum("type").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type InsertRecordSchema = z.infer<typeof insertRecordSchema>;
export const insertRecordSchema = createInsertSchema(recordTable).omit({
  id: true,
  createdAt: true,
  type: true,
});

export type UpdateRecordSchema = z.infer<typeof updateRecordSchema>;
export const updateRecordSchema = insertRecordSchema.partial().extend({
  id: z.coerce.number().min(1),
});

// const selectRecordSchema = createSelectSchema(recordTable, {
//   amount: z.number().transform((amount) => formatNumberToUSD(amount)),
// });
