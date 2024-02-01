import "reflect-metadata";
import "./polyfills/compressionStream";
import { Hono } from "hono";
import baseRouter from "./routers/router";
import { showRoutes } from "hono/dev";
import { setIndexComponent } from "enzo/core";
import { Index } from ".";
import { secureHeaders } from "hono/secure-headers";

setIndexComponent((children) => <Index>{children}</Index>);

const app = new Hono();
app.use("*", secureHeaders());

app.route("/", baseRouter);

showRoutes(app);

export default app;
