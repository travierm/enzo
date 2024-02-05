import { RequestVariables } from "@/requestVariables";
import { Hono } from "hono";

const app = new Hono<{ Variables: RequestVariables }>();

app.post("/login", async () => {
  return new Response("pong", { status: 200 });
});

export default app;
