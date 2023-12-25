import { Context, Hono } from "hono";

import { serveStatic } from "hono/bun";
import { render } from "enzo/core";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";

const app = new Hono();

app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/index.js", serveStatic({ path: "./public/index.js" }));

app.get("/", (c: Context) => {
  return render(c, <Home />);
});

app.get("/login", (c: Context) => {
  return render(c, <Login />);
});

app.get("/ping", async (req) => {
  return new Response("pong", { status: 200 });
});

export const baseRouter = app;
