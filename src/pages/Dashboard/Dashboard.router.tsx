import { Context, Hono } from "hono";

import { render } from "enzo/core";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { IncomeTable } from "./IncomeTable";
import { Dashboard } from "./Dashboard";
import { Stats } from "./Stats";
import { ExpensesTable } from "./ExpensesTable";
import { AccountBalance } from "./AccountBalance";
import {
  createRecord,
  deleteRecord,
  getCurrentBalance,
  getRecordsByType,
  transformRecords,
} from "@/database/models/record/record.repo";

const app = new Hono();

app.get("/dashboard", async (c: Context) => {
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
});

app.post(
  "/dashboard/account-balance",
  zValidator(
    "form",
    z.object({
      balance: z.string(),
    })
  ),
  async (c) => {
    const { balance } = c.req.valid("form");

    await createRecord({
      name: "Account Balance",
      amount: Number(balance),
      type: "currentBalance",
    });

    c.header("HX-Trigger", "incomeUpdated");

    return render(c, <AccountBalance currentBalance={balance} />);
  }
);

app.post(
  "/dashboard/income",
  zValidator(
    "form",
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
  async (c) => {
    const { name, amount } = c.req.valid("form");

    await createRecord({
      name,
      amount: Number(amount),
      type: "income",
    });

    c.header("HX-Trigger", "incomeUpdated");

    const income = transformRecords(await getRecordsByType("income"));
    return render(c, <IncomeTable income={income} />);
  }
);

app.post(
  "/dashboard/expense",
  zValidator(
    "form",
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  ),
  async (c) => {
    const { name, amount } = c.req.valid("form");

    await createRecord({
      name,
      amount: Number(amount),
      type: "expense",
    });

    const expenses = transformRecords(await getRecordsByType("expense"));

    c.header("HX-Trigger", "expenseUpdated");
    return render(c, <ExpensesTable expenses={expenses} />);
  }
);

app.delete("/dashboard/expense/:id", async (c) => {
  const id = Number(c.req.param("id"));

  await deleteRecord(id);
  const expenses = transformRecords(await getRecordsByType("expense"));

  c.header("HX-Trigger", "expenseUpdated");
  return render(c, <ExpensesTable expenses={expenses} />);
});

app.delete("/dashboard/income/:id", async (c) => {
  const id = Number(c.req.param("id"));

  await deleteRecord(id);

  c.header("HX-Trigger", "incomeUpdated");

  const income = transformRecords(await getRecordsByType("income"));
  return render(c, <IncomeTable income={income} />);
});

app.get("/dashboard/stats", async (c) => {
  const expenses = await getRecordsByType("expense");
  const income = await getRecordsByType("income");
  const currentBalance = await getCurrentBalance();

  return render(
    c,
    <Stats
      currentBalance={currentBalance}
      income={income}
      expenses={expenses}
    />
  );
});

export const dashboardRouter = app;
