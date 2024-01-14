import { db } from "@/database/drizzle";
import {
  RecordTable,
  recordTable,
  RecordType,
  UpdateRecordSchema,
} from "./record.model.drizzle";
import { desc, eq, sql, asc } from "drizzle-orm";

export type RecordWithAmountUSD = RecordTable & { amountUSD: string };
const selectWithUSD = {
  id: recordTable.id,
  name: recordTable.name,
  amount: recordTable.amount,
  amountUSD: sql<string>`cast(${recordTable.amount} as money)`,
  type: recordTable.type,
  createdAt: recordTable.createdAt,
}

export function createRecord(record: RecordTable) {
  return db.insert(recordTable).values(record);
}

export function deleteRecord(id: UpdateRecordSchema["id"]) {
  return db.delete(recordTable).where(eq(recordTable.id, id));
}

export function getFirstRecordByType(type: RecordType) {
  return db
    .select(selectWithUSD)
    .from(recordTable)
    .where(eq(recordTable.type, type))
    .orderBy(desc(recordTable.createdAt))
    .limit(1)
    .then((records) => records[0]);
}

export function getRecordsByType(type: RecordType) {
  return db
    .select(selectWithUSD)
    .from(recordTable)
    .where(eq(recordTable.type, type))
    .then((r) => r);
}
