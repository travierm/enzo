import { Context, Hono } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { CreateUser } from "../../views/pages/User/CreateUser";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ErrorBag } from "../../framework/globalProps";
import { handleErrorBag } from "../../framework/validators/handleErrors";
import { CoreButton } from "../../views/components/core/CoreButton";

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
      password: z.string().max(1),
    }),
    (result, c) => {
      return handleErrorBag(c, result, CreateUser)
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
