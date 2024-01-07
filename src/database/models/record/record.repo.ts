import { db } from "../../db";
import {
  NewRecord,
  RecordType,
  Record,
  TransformedRecord,
} from "./record.model";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function createRecord(record: NewRecord) {
  return db.insertInto("records").values(record).execute();
}

export function deleteRecord(id: number) {
  return db.deleteFrom("records").where("id", "=", id).execute();
}

export function getFirstRecordByType(type: RecordType) {
  return db
    .selectFrom("records")
    .where("type", "=", type)
    .selectAll("records")
    .limit(1)
    .executeTakeFirst();
}

export function getRecordsByType(type: RecordType) {
  return db
    .selectFrom("records")
    .where("type", "=", type)
    .selectAll()
    .execute();
}

export async function getCurrentBalance() {
  const currentBalanceRecord = await getFirstRecordByType("currentBalance");

  let currentBalance = 0;
  if (currentBalanceRecord) {
    currentBalance = Number(currentBalanceRecord.amount);
  }

  return currentBalance;
}

export async function getCurrentBalanceUSD() {
  return USDollar.format(await getCurrentBalance());
}

// Transformers
export function transformRecords(
  records: Record[] | Record
): TransformedRecord[] {
  if (!Array.isArray(records)) {
    records = [records];
  }

  return records.map((record) => {
    const amountUSD = USDollar.format(record.amount);

    return { ...record, amountUSD };
  });
}
