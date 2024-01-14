import { Dashboard } from "./Dashboard";
import { Context } from "hono";
import { render } from "enzo/core";
import {
  getFirstRecordByType,
  getRecordsByType,
} from "@/database/models/record/record.repo.drizzle";
import { logger } from "@/logger";

export async function getDashboard(c: Context) {
  const expenses = await getRecordsByType("expense");
  const income = await getRecordsByType("income");
  const currentBalance = (await getFirstRecordByType("currentBalance")).amount;

  logger.info(expenses)
  return render(
    c,
    <Dashboard
      currentBalance={currentBalance}
      income={income}
      expenses={expenses}
    />
  );
}
