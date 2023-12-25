import { Context, Hono } from "hono";

import { render } from "enzo/core";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Income, IncomeTable } from "./IncomeTable";
import { Dashboard } from "./Dashboard";

const app = new Hono();

let income: Income[] = [
  { id: 1, name: "Rent", amount: 1000 },
  { id: 2, name: "Car", amount: 500 },
  { id: 3, name: "Food", amount: 300 },
];

app.get("/dashboard", (c: Context) => {
  return render(c, <Dashboard income={income} />);
});

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

    return render(c, <IncomeTable income={income} />);
  }
);

app.delete("/dashboard/income/:id", (c) => {
  const id = Number(c.req.param("id"));

  income = income.filter((income) => income.id !== id);

  return render(c, <IncomeTable income={income} />);
});

export const dashboardRouter = app;
