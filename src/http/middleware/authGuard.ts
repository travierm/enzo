import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

import { serviceContainer } from "../../services";
import { UserService } from "../services/UserService";

export type User = {
  id: number;
  username: string;
};

// declare global {
//   interface Request {
//     user: User | null;
//   }
// }

const unAuthedPaths = ["/login", "/ping", "/public/app.css"];

export const authGuard = (): MiddlewareHandler => {
  return async (c, next) => {
    return next();

    // Unauthed route we should let the request continue without changes
    if (c.req.path && unAuthedPaths.includes(c.req.path)) {
      return next();
    }

    const token = getCookie(c, "token");
    if (!token) {
      // no token on authed router
      return c.redirect("/login");
    }

    const userService = serviceContainer.resolve(UserService);
    const user = userService.getUserByToken(token);
    if (!user) {
      // no token data in-memory
      return c.redirect("/login");
    }

    c.set("user", user);

    return next();
  };
};
