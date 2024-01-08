import {
  transformRecords,
  getRecordsByType,
  getCurrentBalance,
} from "@/database/models/record/record.repo";
import { Dashboard } from "./Dashboard";
import { Context } from "hono";
import { render } from "enzo/core";

export async function getDashboard(c: Context) {
  const expenses = transformRecords(await getRecordsByType("expense"));
  const income = transformRecords(await getRecordsByType("income"));
  const currentBalance = await getCurrentBalance();

  return render(
    c,
    <Dashboard
      currentBalance={currentBalance}
      income={income}
      expenses={expenses}
    />
  );
}
