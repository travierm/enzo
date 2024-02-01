import { Hono } from "hono";
import { baseRouter } from "./baseRouter";
import { userRouter } from "./userRouter";
import { dashboardRouter } from "../pages/Dashboard/Dashboard.router";

const app = new Hono();

app.route("/", baseRouter);
app.route("/", userRouter);
app.route("/", dashboardRouter);

export default app;
