import { Hono } from "hono";
import authRoutes from "./auth";
import { FileRouter } from "@/core/fileRouter";
import { renderComponent } from "@/core";
import Home from "@/pages/Home";

const app = new Hono();

const fileRouter = new FileRouter();
const fileRoutes = await fileRouter.getRouter();

app.route("/", fileRoutes);
app.get("/", (c) => {
  return renderComponent(c, <Home />);
});

app.get("/ping", async () => {
  return new Response("pong", { status: 200 });
});

app.route("/", authRoutes);

export default app;
