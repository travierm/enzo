import { Hono } from "hono";
import authRoutes from "./auth";
import { renderComponent } from "enzo-core";
import Home from "@/pages/Home";
import { RequestVariables } from "@/requestVariables";

const app = new Hono<{ Variables: RequestVariables }>();

app.get("/", (c) => {
  return renderComponent(c, <Home />);
});

app.get("/ping", async () => {
  return new Response("pong", { status: 200 });
});

app.route("/", authRoutes);

export default app;
