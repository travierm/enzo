import { Context, Hono } from "hono";

import {
  createRecord,
  deleteRecord,
} from "@/database/models/record/record.repo";
import { validateForm } from "enzo/core";
import { z } from "zod";
import { getDashboard } from "./Dashboard.controller";

const app = new Hono();

app.get("/dashboard", async (c: Context) => {
  return getDashboard(c);
});

app.post("/dashboard/account-balance", async (c) => {
  const result = await validateForm(
    c,
    z.object({
      balance: z.string(),
    })
  );

  let numericBalance = 0;
  if (result.success) {
    let balance = result.data.balance.replace(/[^\d.]/g, "");
    numericBalance = Number(balance);

    numericBalance =
      numericBalance < 0
        ? Math.ceil(numericBalance)
        : Math.floor(numericBalance);

    await createRecord({
      name: "Account Balance",
      amount: numericBalance,
      type: "currentBalance",
    });
  }

  return getDashboard(c);
});

app.post("/dashboard/income", async (c) => {
  const result = await validateForm(
    c,
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  );

  if (result.success) {
    const { name, amount } = result.data;

    await createRecord({
      name,
      amount: Number(amount),
      type: "income",
    });
  }

  return getDashboard(c);
});

app.post("/dashboard/expense", async (c) => {
  const result = await validateForm(
    c,
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  );

  if (result.success) {
    const { name, amount } = result.data;

    await createRecord({
      name,
      amount: Number(amount),
      type: "expense",
    });
  }

  return getDashboard(c);
});

app.delete("/dashboard/expense/:id", async (c) => {
  const id = Number(c.req.param("id"));

  await deleteRecord(id);

  return getDashboard(c);
});

app.delete("/dashboard/income/:id", async (c) => {
  const id = Number(c.req.param("id"));

  await deleteRecord(id);

  return getDashboard(c);
});

export const dashboardRouter = app;
