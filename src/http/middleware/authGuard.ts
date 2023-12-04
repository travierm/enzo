import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

import { UserService } from "../../services/userService";
import { resolve } from "../../framework/serviceContainer";

const userService = resolve<UserService>("UserService");

export type User = {
  id: number;
  username: string;
};

const unAuthedPaths = ["/login", "/ping", "/public/app.css"];

export const authGuard = (): MiddlewareHandler => {
  return async (c, next) => {
    // Unauthed route we should let the request continue without changes
    if (c.req.path && unAuthedPaths.includes(c.req.path)) {
      return next();
    }

    const token = getCookie(c, "token");
    if (!token) {
      // no token on authed router
      return c.redirect("/login");
    }

    const user = userService.getUserByToken(token);
    if (!user) {
      // no token data in-memory
      return c.redirect("/login");
    }

    c.set("user", user);

    return next();
  };
};
