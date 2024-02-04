import { Hono } from "hono";
import router from "./routers";
import { showRoutes } from "hono/dev";
import { setIndexComponent, renderComponent, setIndexHTML } from "@/core";
import { secureHeaders } from "hono/secure-headers";
import { Index } from ".";
import { FileRouter } from "./services/fileRouter";
import { serveStatic } from "hono/bun";
import Home from "./pages/Home";

setIndexHTML("./public/index.html");

const app = new Hono();

app.use("*", secureHeaders());
app.use("/public/app.css", serveStatic({ path: "./public/app.css" }));
app.use("/public/app.js", serveStatic({ path: "./public/app.js" }));

// app.use("/pages/*", async (c, next) => {
//   c.setRenderer((content) => {
//     return renderComponent(c, content);
//   });
//   await next();
// });

app.get("/", (c) => {
  return renderComponent(c, <Home />);
});

app.route("/", router);

const fileRouter = new FileRouter();
const fileRoutes = await fileRouter.getRouter();

app.route("/", fileRoutes);

showRoutes(app);

export default app;
