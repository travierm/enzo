import { CONFIG } from "@/config";
import { UserTableSafe } from "@/database/models/user/user.model.drizzle";
import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { ICacheService } from "./drivers/driver-interfaces";
import { RedisCache } from "./drivers/redis-cache.driver";

export class Session {
  public readonly id: string;
  public readonly user: UserTableSafe;

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
    CONFIG.session.sessionExpiresAfterHours * 3600
  );

  return session;
}

export function generateSessionId() {
  return crypto.randomUUID();
}

export function deleteSessionCookie(c: Context) {
  deleteCookie(c, CONFIG.session.cookieName);
}

export function getSessionCookie(c: Context) {
  return getCookie(c, CONFIG.session.cookieName);
}

export function setSessionCookie(c: Context, sessionId: string) {
  return setCookie(c, CONFIG.session.cookieName, sessionId, {
    httpOnly: true,
  });
}

export const $sessionStore: ICacheService<Session> = new RedisCache();
