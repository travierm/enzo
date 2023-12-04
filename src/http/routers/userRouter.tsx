import { Context, Hono } from "hono";

import { serveStatic } from "hono/bun";
import { renderComponent } from "../../framework/renderer/renderComponent";
import { Login } from "../../views/pages/Login";
import { Home } from "../../views/pages/Home";
import { CreateUser } from "../../views/pages/User/CreateUser";

const app = new Hono();

app.get("/user/create", (c: Context) => {
  return renderComponent(c, <CreateUser />);
});

app.get("/users", (c: Context) => {
  return renderComponent(c, <CreateUser />);
});

export const userRouter = app;
