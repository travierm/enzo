import "reflect-metadata";
import "./polyfills/compressionStream";
import { Hono } from "hono";
import { bootRouter } from "./routers/router";
import { showRoutes } from "hono/dev";

const app = new Hono();

bootRouter(app);
showRoutes(app);
export default app;
