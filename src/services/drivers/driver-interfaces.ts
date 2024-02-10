export interface ICacheService<T> {
  set(key: string, value: T, ttl: number): Promise<void>;
  get(id: string): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
