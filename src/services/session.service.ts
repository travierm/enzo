import { CONFIG } from "@/config";
import { UserTableSafe } from "@/database/models/user/user.model.drizzle";
import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { ICacheService } from "./drivers/driver-interfaces";
import { RedisCache } from "./drivers/redis-cache.driver";

export class Session {
  public readonly user: UserTableSafe;
  public readonly id: string;

  constructor(user: UserTableSafe) {
    this.id = crypto.randomUUID();
    this.user = user;
  }
}

export async function createSession(user: UserTableSafe) {
  const session = new Session(user);
  await $sessionStore.set(
    session.id,
    session,
    CONFIG.sesssion.sessionExpiresAfterHours * 3600 * 1000
  );

  return session;
}

export function deleteSessionCookie(c: Context) {
  deleteCookie(c, CONFIG.sesssion.cookieName);
}

export function getSessionCookie(c: Context) {
  return getCookie(c, CONFIG.sesssion.cookieName);
}

export function setSessionCookie(c: Context, session: Session) {
  return setCookie(c, CONFIG.sesssion.cookieName, session.id, {
    httpOnly: true,
  });
}

export const $sessionStore: ICacheService<Session> = new RedisCache();
