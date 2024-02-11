import { RequestVariables } from "@/requestVariables";
import {
  generateSessionId,
  getSessionCookie,
  setSessionCookie,
} from "@/services/session.service";
import { MiddlewareHandler } from "hono";

export const anonSessions = (): MiddlewareHandler<{
  Variables: RequestVariables;
}> => {
  return async (c, next) => {
    if (c.get("isAuthed")) {
      return next();
    }

    const sessionId = getSessionCookie(c);
    if (sessionId !== undefined) {
      c.set("sessionId", sessionId);

      return next();
    }

    // assign an anonymous sessionId
    const anonSessionId = generateSessionId();
    setSessionCookie(c, anonSessionId);
    c.set("sessionId", anonSessionId);

    return c.redirect("/login");
  };
};
