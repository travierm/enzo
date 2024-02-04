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
import { requestTimingLogger } from "./core/requestTimingLogger";

const app = new Hono();
const fileRouter = new FileRouter();
const fileRoutes = await fileRouter.getRouter();

app.use("*", requestTimingLogger());
app.use("*", secureHeaders());
app.use("*", compress());
app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

app.route("/", router);
app.route("/", fileRoutes);
app.get("/", (c) => {
  return renderComponent(c, <Home />);
});

showRoutes(app);

export default app;
