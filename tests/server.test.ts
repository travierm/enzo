import { expect, test } from "bun:test";

import app from "../src/main";

test("GET /posts", async () => {
  const res = await app.request("/ping");
  expect(res.status).toBe(200);
  expect(await res.text()).toBe("pong");
});
