import { Hono } from "hono";

import router from "./routers";
import { showRoutes } from "hono/dev";
import { renderComponent } from "@/core";
import { secureHeaders } from "hono/secure-headers";
import { FileRouter } from "./services/fileRouter";
import { serveStatic } from "hono/bun";
import Home from "./pages/Home";
import { compress } from "hono/compress";
import "./bootstrap";

const app = new Hono();

app.use("*", async (c, next) => {
  const startTime = process.hrtime();
  await next();

  const endTime = process.hrtime(startTime);
  const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;
  console.log(`Route ${c.req.routePath} execution time: ${elapsedTimeInMs} ms`);
});

app.use("*", secureHeaders());
app.use("*", compress());
app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

app.get("/", (c) => {
  return renderComponent(c, <Home />);
});

app.route("/", router);
const fileRouter = new FileRouter();
const fileRoutes = await fileRouter.getRouter();
app.route("/", fileRoutes);

showRoutes(app);

export default app;
