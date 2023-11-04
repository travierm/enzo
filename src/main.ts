import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { authGuard, User } from "./http/middleware/authGuard";
import { initAssetRoutes } from "./http/routers/assetRouter";
import { initControllerRoutes } from "./http/routers/controllerRouter";

type Variables = {
  user?: User;
};

const app = new Hono<{ Variables: Variables }>();

app.get("*", secureHeaders());
app.use("*", logger());
app.use("*", authGuard());

initControllerRoutes(app);
initAssetRoutes(app);

//console.log(`bun-htmx running at http://${ENV_HOSTNAME}:${ENV_PORT}`);
export default app;
