import { Hono } from "hono";
import router from "./routers";
import { showRoutes } from "hono/dev";
import { setIndexComponent } from "enzo/core";
import { Index } from ".";
import { secureHeaders } from "hono/secure-headers";

setIndexComponent((children) => <Index>{children}</Index>);

const app = new Hono();

app.use("*", secureHeaders()).use();
app.route("/", router);

showRoutes(app);

export default app;
