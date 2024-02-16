import { setIndexHTML } from "@/core";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { compress } from "hono/compress";
import { secureHeaders } from "hono/secure-headers";
import "./core/compressionStream";
import { requestTimingLogger } from "./core/requestTimingLogger";
import { logger } from "./logger";
import { anonSessions } from "./middleware/anonSessions";
import { authGuard } from "./middleware/authGuard";
import { fileRouter } from "./middleware/fileRouter";
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

app.use(secureHeaders());
app.use(anonSessions());
app.use(authGuard());
app.use(compress());

app.use("/public/*", (c, next) => {
  c.res.headers.set("Cache-Control", "public, max-age=31536000");
  return next();
});
app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));
app.use("/public/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

// register routers/index
app.route("/", router);
app.use("*", fileRouter());

app.onError((err, c) => {
  if (process.env.NODE_ENV === "development") {
    throw err;
  }

  return c.redirect("/error");
});

export default app;
