import { Context, Hono } from "hono";

import { render } from "enzo/core";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Income, IncomeTable } from "./IncomeTable";
import { Dashboard } from "./Dashboard";
import { Stats } from "./Stats";
import { Expense, ExpensesTable } from "./ExpensesTable";
import { AccountBalance } from "./AccountBalance";

const app = new Hono();

let expenses: Expense[] = [
  { id: 1, name: "Rent", amount: 1000 },
  { id: 2, name: "Car", amount: 500 },
  { id: 3, name: "Food", amount: 300 },
];

let currentBalance = 0;

let income: Income[] = [{ id: 1, name: "Work", amount: 4900 }];

app.get("/dashboard", (c: Context) => {
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
  (c) => {
    const { balance } = c.req.valid("form");

    currentBalance = Number(balance);

    c.header("HX-Trigger", "incomeUpdated");
    return render(c, <AccountBalance currentBalance={currentBalance} />);
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
  (c) => {
    const { name, amount } = c.req.valid("form");

    const id = income.length + 1;
    income.push({ id, name, amount: Number(amount) });

    c.header("HX-Trigger", "incomeUpdated");
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
  (c) => {
    const { name, amount } = c.req.valid("form");

    const id = expenses.length + 1;
    expenses.push({ id, name, amount: Number(amount) });

    c.header("HX-Trigger", "expenseUpdated");
    return render(c, <ExpensesTable expenses={expenses} />);
  }
);

app.delete("/dashboard/expense/:id", (c) => {
  const id = Number(c.req.param("id"));

  expenses = expenses.filter((i) => i.id !== id);

  c.header("HX-Trigger", "expenseUpdated");
  return render(c, <ExpensesTable expenses={expenses} />);
});

app.delete("/dashboard/income/:id", (c) => {
  const id = Number(c.req.param("id"));

  income = income.filter((income) => income.id !== id);

  c.header("HX-Trigger", "incomeUpdated");
  return render(c, <IncomeTable income={income} />);
});

app.get("/dashboard/stats", (c) => {
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
