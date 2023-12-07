import { Context, Hono } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { CreateUser } from "../../views/pages/User/CreateUser";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ErrorBag, TemplateMessage } from "../../framework/globalProps";
import { createTemplateMessage, handleZodErrors } from "../../framework/validators/handleErrors";
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
      email: z.string(),
      password: z.string(),
    }),
    (result, c) => {
      return handleZodErrors(c, result, CreateUser)
    }
  ),
  (c) => {
    const body  = c.req.valid('form')

    if(body.email === 'admin') {
      return renderComponent(
        c,
        <CreateUser
          templateMessage={createTemplateMessage(
            "info",
            "Admin can not be used as email"
          )}
        />
      );  
    }

    return renderComponent(c, <CreateUser />);
  }
);

app.get("/users", (c: Context) => {
  return renderComponent(c, <CreateUser />);
});

export const userRouter = app;
