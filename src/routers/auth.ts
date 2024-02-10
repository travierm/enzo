import { validateForm } from "@/core";
import { RequestVariables } from "@/requestVariables";
import { handleAuth, handleLogout } from "@/services/auth.service";
import { Hono } from "hono";
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
    return c.redirect("/login");
  }

  return c.redirect("/");
});

export default app;
