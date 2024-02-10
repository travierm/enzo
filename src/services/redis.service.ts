import { createClient } from "redis";

const client = createClient();
await client.connect();

export const $redis = client;
