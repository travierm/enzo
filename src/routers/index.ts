import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.get("/ping", async () => {
  return new Response("pong", { status: 200 });
});

export default app;
