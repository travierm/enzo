import { Env, Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { baseRouter } from "./baseRouter";
import { userRouter } from "./userRouter";
import { dashboardRouter } from "./dashboardRouter";

export function bootRouter(app: Hono<Env, {}, "/">) {
  app.get("*", secureHeaders());
  //app.use("*", logger());
  //app.use("*", authGuard());

  app.route("/", baseRouter);
  app.route("/", userRouter);
  app.route("/", dashboardRouter);
}
