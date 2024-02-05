import "./polyfills/compressionStream";
import { Hono } from "hono";
import router from "./routers";
import { secureHeaders } from "hono/secure-headers";
import { serveStatic } from "hono/bun";
import { compress } from "hono/compress";
import { requestTimingLogger } from "./core/requestTimingLogger";
import { logger } from "./logger";
import { setIndexHTML } from "@/core";

// Used to wrap around pages
setIndexHTML("./public/index.html");

const app = new Hono();

app.use(
  "*",
  requestTimingLogger({
    logFn: (msg) => logger.info(msg),
  })
);

app.use("*", secureHeaders());
app.use("*", compress());
app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

// register routers/index
app.route("/", router);

export default app;
