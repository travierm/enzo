import { Context, Hono } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { CreateUser } from "../../views/pages/User/CreateUser";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.get("/user/create", (c: Context) => {
  return renderComponent(c, <CreateUser />);
});

app.post(
  "/user/create",
  zValidator(
    "form",
    z.object({
      email: z.string().min(100),
      password: z.string(),
    }),
    (result, c) => {
      if(!result.success) {
        const errorMessage = result.error.errors.map((e) => e.message).join(", ");
        return renderComponent(c, <CreateUser error={errorMessage} />);
      }
    }
  ),
  async (c) => {
    const body  = c.req.valid('form')

    return renderComponent(c, <CreateUser />);
  }
);

app.get("/users", (c: Context) => {
  return renderComponent(c, <CreateUser />);
});

export const userRouter = app;
