import { Hono } from "hono";

import { AppController } from "../controllers/AppController";
import { AuthController } from "../controllers/AuthController";
import { TransactionController } from "../controllers/TransactionController";

const controllers = {
  AppController: new AppController(),
  AuthController: new AuthController(),
  TransactionController: new TransactionController(),
};

//await htmlParser.parse("./public/index.html");

export function initControllerRoutes(app: Hono) {
  // app.use("*", async (c, next) => {
  //   await next();

  //   // disabled routes
  //   const disabledRoutes = ["/public", "/ping", "/public/app.css"];
  //   if (disabledRoutes.includes(c.req.path)) {
  //     return;
  //   }

  //   if (!c.req.headers.get("Hx-Boosted")) {
  //     if (c.res.body && c.res.status === 200) {
  //       const result = await c.res.text();
  //       if (result) {
  //         const content = htmlParser.injectContent(result);
  //         c.res = c.newResponse(content, 200);
  //       }
  //     }
  //   }
  // });

  app.get("/", controllers.AppController.getIndex);
  app.get("/transaction/create", controllers.TransactionController.getCreate);
  app.get("/login", controllers.AuthController.getLogin);
  app.post(
    "/login",
    controllers.AuthController.postLogin.bind(controllers.AuthController)
  );

  app.get(
    "/logout",
    controllers.AuthController.getLogout.bind(controllers.AuthController)
  );
  app.get("/ping", async (req) => {
    return new Response("pong", { status: 200 });
  });
}
