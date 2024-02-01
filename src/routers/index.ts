import { Env, Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { baseRouter } from "./baseRouter";
import { userRouter } from "./userRouter";
import { dashboardRouter } from "../pages/Dashboard/Dashboard.router";

export function bootRouter(app: Hono<Env, {}, "/">) {
  app.use("*", secureHeaders());

  app.route("/", baseRouter);
  app.route("/", userRouter);
  app.route("/", dashboardRouter);
}
