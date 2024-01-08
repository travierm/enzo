import { logger } from "@/logger";
import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";

import { serveStatic } from "hono/bun";
import { z } from "zod";

const app = new Hono();

app.use("*", async (c, next) => {
  let log = logger;
  if (c.req.method === "POST") {
    const body = await c.req.parseBody();

    log = logger.child({ body: body });
  }

  log.debug(`${c.req.method} ${c.req.url}`);

  return next();
});

app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

app.get("/", (c: Context) => {
  return c.redirect("/dashboard");
});

app.get("/ping", async (req) => {
  return new Response("pong", { status: 200 });
});

export const baseRouter = app;
