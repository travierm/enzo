import "reflect-metadata";
import { Hono } from "hono";
import { bootRouter } from "./routers/router";

const app = new Hono();

bootRouter(app);

export default app;
