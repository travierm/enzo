import { Context, Hono } from "hono";

import { render } from "enzo/core";
import { Dashboard } from "../../views/pages/Dashboard/Dashboard";

const app = new Hono();

app.get("/dashboard", (c: Context) => {
  return render(c, <Dashboard />);
});

export const dashboardRouter = app;
