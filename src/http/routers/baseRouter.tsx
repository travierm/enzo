import { Context, Hono } from "hono";

import { serveStatic } from "hono/bun";
import { renderComponent } from "../../framework/renderer/renderComponent";
import { Login } from "../../views/pages/Login";

const app = new Hono();

app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/index.js", serveStatic({ path: "./public/index.js" }));

app.get("/", (c: Context) => {
  return renderComponent(c, <Login />)
});

app.get("/login", (c: Context) => {
  return renderComponent(c, <Login />);
});

app.get("/ping", async (req) => {
  return new Response("pong", { status: 200 });
});

export default app;
