import { validateForm } from "@/core";
import { RequestVariables } from "@/requestVariables";
import { authenticate } from "@/services/auth.service";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { z } from "zod";

const app = new Hono<{ Variables: RequestVariables }>();

app.post("/login", async (c) => {
  const body = await validateForm(
    c,
    z.object({
      email: z.string(),
      password: z.string(),
    })
  );

  if (!body.success) {
    return c.redirect("/login");
  }

  const user = await authenticate(body.data.email, body.data.password);
  if (!user) {
    return c.redirect("/login");
  }

  setCookie(c, "user", user.id.toString());
  return c.redirect("/");
});

export default app;
