import { Generated, Insertable, Selectable, Updateable } from "kysely";

export type RecordType = "expense" | "income" | "currentBalance";

export type RecordTable = {
  amount: number;
  createdAt: Generated<string>;
  id: Generated<number>;
  name: string;
  type: RecordType;
};

export type Record = Selectable<RecordTable>;
export type NewRecord = Insertable<
  Omit<RecordTable, "updatedAt" | "createdAt">
>;
export type RecordUpdate = Updateable<Omit<RecordTable, "createdAt">>;

export const nonSensitiveUserColumns = [
  "id",
  "amount",
  "createdAt",
  "name",
  "type",
] as const satisfies ReadonlyArray<keyof Record>;
