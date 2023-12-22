import "reflect-metadata";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";

import { authGuard } from "./http/middleware/authGuard";
import { baseRouter } from "./http/routers/baseRouter";
import { userRouter } from "./http/routers/userRouter";

const app = new Hono();

app.get("*", secureHeaders());
//app.use("*", logger());
app.use("*", authGuard());

app.route("/", baseRouter);
app.route("/", userRouter);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);
export default app;
