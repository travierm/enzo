export class InMemoryCache implements ICacheService {
  private sessions: Map<string, Session> = new Map();

  get count() {
    return this.sessions.size;
  }

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
