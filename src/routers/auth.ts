import { validateForm } from "@/core";
import { RequestVariables } from "@/requestVariables";
import { authenticate } from "@/services/auth.service";
import { createSession } from "@/services/session.service";
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

  const session = await createSession(user);
  setCookie(c, "auth_session_id", session.id, {
    expires: session.expiresAt,
    httpOnly: true,
  });

  c.set("user", user);
  c.set("isAuthed", true);

  console.log("redirect to / after login");
  return c.redirect("/");
});

export default app;
