import { Context, Hono } from "hono";

import { render } from "enzo/core";
import { Dashboard } from "../../views/pages/Dashboard/Dashboard";
import { Income, IncomeTable } from "../../views/pages/Dashboard/IncomeTable";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

let income: Income[] = [
  { name: "Rent", amount: 1000 },
  { name: "Car", amount: 500 },
  { name: "Food", amount: 300 },
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

    income.push({ name, amount: Number(amount) });

    return render(c, <IncomeTable income={income} />);
  }
);

export const dashboardRouter = app;
