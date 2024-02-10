import { CONFIG } from "@/config";
import { createClient } from "redis";

const client = createClient({
  url: CONFIG.redis.url,
});

await client.connect();

process.on("exit", () => {
  client.quit();
});

export const $redis = client;
