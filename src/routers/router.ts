import { Env, Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { baseRouter } from "./baseRouter";
import { userRouter } from "./userRouter";
import { dashboardRouter } from "../pages/Dashboard/Dashboard.router";
import { compress } from "hono/compress";

export function bootRouter(app: Hono<Env, {}, "/">) {
  app.use("*", secureHeaders());
  app.use("*", compress())
  //app.use("*", logger());
  //app.use("*", authGuard());

  app.route("/", baseRouter);
  app.route("/", userRouter);
  app.route("/", dashboardRouter);
}
