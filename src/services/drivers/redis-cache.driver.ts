import { $redis } from "../redis.service";
import { ICacheService } from "./driver-interfaces";

export class RedisCache<T> implements ICacheService<T> {
  async get(id: string) {
    const session = await $redis.get(id);

    if (!session) {
      return null;
    }

    return JSON.parse(session);
  }

  async set(key: string, session: T, ttl: number = 0) {
    $redis.set(key, JSON.stringify(session), {
      EX: ttl,
    });
  }

  async delete(id: string) {
    $redis.del(id);

    return true;
  }
}
