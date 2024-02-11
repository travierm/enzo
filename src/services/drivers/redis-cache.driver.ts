import { $redis } from "../redis.service";
import { ICacheService } from "./driver-interfaces";

export class RedisCache<T> implements ICacheService<T> {
  async get(id: string) {
    const value = await $redis.get(id);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  async set(key: string, value: T, ttl: number = 0) {
    $redis.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  }

  async delete(id: string) {
    $redis.del(id);

    return true;
  }
}
