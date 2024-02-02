import { Hono } from "hono";
import router from "./routers";
import { showRoutes } from "hono/dev";
import { setIndexComponent } from "enzo/core";
import path from "path";
import { secureHeaders } from "hono/secure-headers";
import { Index } from ".";
import { FileRouter } from "./services/fileRouter";
import { serveStatic } from "hono/bun";

setIndexComponent((children) => <Index>{children}</Index>);

const app = new Hono();

app.use("*", secureHeaders());

app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

app.route("/", router);

const fileRouter = new FileRouter();
const fileRoutes = await fileRouter.getRouter();

app.route("/", fileRoutes);

showRoutes(app);

export default app;
