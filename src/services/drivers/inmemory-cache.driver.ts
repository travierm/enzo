import { ICacheService } from "./driver-interfaces";

export class InMemoryCache<T> implements ICacheService<T> {
  private store: Map<string, T> = new Map();
  private ttl: Map<string, number> = new Map();

  async get(id: string) {
    const ttl = this.ttl.get(id);
    if (ttl && Date.now() > ttl) {
      this.store.delete(id);
      this.ttl.delete(id);

      return null;
    }

    return this.store.get(id) || null;
  }

  async set(key: string, session: T, ttl: number = 0) {
    this.store.set(key, session);

    if (ttl) {
      this.ttl.set(key, Date.now() + ttl * 1000);
    }
  }

  async delete(id: string) {
    return this.store.delete(id);
  }
}
