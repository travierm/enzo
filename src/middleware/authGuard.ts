import { RequestVariables } from "@/requestVariables";
import { $sessionStore } from "@/services/session.service";
import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

const unAuthedPaths = ["/login", "/ping", "/public/app.css"];

export const authGuard = (): MiddlewareHandler<{
  Variables: RequestVariables;
}> => {
  return async (c, next) => {
    // Unauthed route we should let the request continue without changes
    if (c.req.path && unAuthedPaths.includes(c.req.path)) {
      return next();
    }

    if (c.get("isAuthed")) {
      return next();
    }

    const sessionId = getCookie(c, "auth_session_id");
    if (sessionId === undefined) {
      // no token on authed router
      return c.redirect("/login");
    }

    const session = await $sessionStore.get(sessionId);
    if (!session) {
      return c.redirect("/login");
    }

    c.set("user", session.user);
    c.set("isAuthed", true);

    return next();
  };
};
