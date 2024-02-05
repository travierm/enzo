import { Hono } from "hono";

const app = new Hono();

app.post("/auth/login", async () => {
  return new Response("pong", { status: 200 });
});

export default app;
