import { Context, Hono } from "hono";

import { render } from "../../framework/renderer/renderComponent";
import { CreateUser } from "../../views/pages/User/CreateUser";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  createTemplateMessage,
  handleZodErrors,
} from "../../framework/validators/handleErrors";
import { UserService } from "../../services/userService";
import { resolve } from "../../framework/serviceContainer";
import Container from "typedi";

const userService = Container.get(UserService);

const app = new Hono();

app.get("/user/create", (c: Context) => {
  return render(c, <CreateUser />);
});

app.post(
  "/user/create",
  zValidator(
    "form",
    z.object({
      email: z.string().email(),
      password: z.string().min(5),
    }),
    (result, c) => {
      return handleZodErrors(c, result, CreateUser);
    }
  ),
  (c) => {
    const body = c.req.valid("form");

    if (body.email === "admin") {
      return render(
        c,
        <CreateUser
          templateMessage={createTemplateMessage(
            "info",
            "Admin can not be used as email"
          )}
        />
      );
    }

    return render(c, <CreateUser />);
  }
);

app.get("/users", (c: Context) => {
  return render(c, <CreateUser />);
});

export const userRouter = app;
