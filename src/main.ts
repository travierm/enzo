import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { authGuard } from "./http/middleware/authGuard";
import { baseRouter } from "./http/routers/baseRouter";
import { importAllFromPath } from "./framework/fileImporter";
import { userRouter } from "./http/routers/userRouter";

const app = new Hono();

// bootlogger
importAllFromPath("src/services/**/*.ts");

app.get("*", secureHeaders());
//app.use("*", logger());
//app.use("*", authGuard());

app.route("/", baseRouter);
app.route("/", userRouter);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);
export default app;
