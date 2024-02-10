import { setIndexHTML } from "@/core";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { compress } from "hono/compress";
import { secureHeaders } from "hono/secure-headers";
import "./core/compressionStream";
import { requestTimingLogger } from "./core/requestTimingLogger";
import { logger } from "./logger";
import { authGuard } from "./middleware/authGuard";
import { RequestVariables } from "./requestVariables";
import router from "./routers";

// Used to wrap around pages
setIndexHTML("./public/index.html");

const app = new Hono<{ Variables: RequestVariables }>();

app.use(
  "*",
  requestTimingLogger({
    logFn: (msg) => logger.info(msg),
  })
);

app.use("*", secureHeaders());
app.use("*", authGuard());
app.use("*", compress());
app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

// register routers/index
app.route("/", router);

app.onError((err, c) => {
  if (process.env.NODE_ENV === "development") {
    throw err;
  }

  return c.redirect("/error");
});

export default app;
