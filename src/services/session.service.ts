import { CONFIG } from "@/config";
import { UserTableSafe } from "@/database/models/user/user.model.drizzle";
import { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

interface ICacheService {
  get(id: string): Promise<Session | null>;
  set(session: Session): Promise<void>;
  delete(id: string): Promise<void>;
}

export class Session {
  public readonly user: UserTableSafe;
  public readonly expiresAt: Date;
  public readonly id: string;

  constructor(user: UserTableSafe, expiresAt: Date) {
    this.id = crypto.randomUUID();
    this.user = user;
    this.expiresAt = expiresAt;
  }

  isExpired() {
    return this.expiresAt < new Date();
  }
}

export async function createSession(user: UserTableSafe) {
  const now = new Date();
  const hoursUntilExpire = CONFIG.sesssion.sessionExpiresAfterHours; // Number of hours until the session should expire
  const millisecondsPerHour = 3600 * 1000; // Number of milliseconds in an hour
  const expiresAt = new Date(+now + hoursUntilExpire * millisecondsPerHour);

  const session = new Session(user, expiresAt);
  await $sessionStore.set(session);

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
    expires: session.expiresAt,
    httpOnly: true,
  });
}

export const $sessionStore: ICacheService = new SessionStore();
