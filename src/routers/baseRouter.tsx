import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";

import { serveStatic } from "hono/bun";
import { z } from "zod";

const app = new Hono();

app.use("*", async (c, next) => {
  if (c.req.method === "POST") {
    console.log(await c.req.parseBody());
  }

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
