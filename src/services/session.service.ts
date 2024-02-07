import { UserTableSafe } from "@/database/models/user/user.model.drizzle";
import { logger } from "@/logger";

interface ISessionStore {
  get(id: string): Promise<Session | null>;
  set(session: Session): Promise<void>;
  delete(id: string): Promise<void>;
  garbageCollect(): Promise<number>;
}

export class SessionStore implements ISessionStore {
  private sessions: Map<string, Session> = new Map();

  async get(id: string) {
    return this.sessions.get(id) || null;
  }

  async set(session: Session) {
    this.sessions.set(session.id, session);
  }

  async delete(id: string) {
    this.sessions.delete(id);
  }

  async garbageCollect() {
    let count = 0;
    for (const [id, session] of this.sessions.entries()) {
      if (session.isExpired()) {
        this.sessions.delete(id);
        count++;
      }
    }

    return count;
  }
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
  const expiresAt = new Date(+now + 120 * 1000);

  return new Session(user, expiresAt);
}

export const sessionStore = new SessionStore();

setInterval(() => {
  logger.info("Garbage collecting sessions");
  sessionStore.garbageCollect();
}, 60 * 1000);
