import { renderComponent, validateForm } from "@/core";
import { Login } from "@/pages/Login";
import { RequestVariables } from "@/requestVariables";
import { createAlert } from "@/services/alertMessages.service";
import { handleAuth, handleLogout } from "@/services/auth.service";
import { Hono } from "hono";
import { render } from "preact";
import { z } from "zod";

const app = new Hono<{ Variables: RequestVariables }>();

app.get("/logout", async (c) => {
  await handleLogout(c);

  return c.redirect("/login");
});

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

  try {
    await handleAuth(c, body.data.email, body.data.password);
  } catch (e) {
    await createAlert(c, {
      type: "error",
      message: "Invalid email or password",
    });

    return c.redirect("/login");
  }

  return c.redirect("/");
});

export default app;
