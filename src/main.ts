import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { authGuard } from "./http/middleware/authGuard";
import { BaseRouter } from "./http/routers/BaseRouter";

const app = new Hono();

app.get("*", secureHeaders());
app.use("*", logger());
app.use("*", authGuard());

BaseRouter(app);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);
export default app;
