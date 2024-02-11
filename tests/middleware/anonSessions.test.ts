import { expect, test } from "bun:test";

import app from "@/main";

test("Can set sessionId for anonymous users", async () => {
  const res = await app.request("/");

  expect(res.headers.get("location")).toBe("/login");

  const cookies = res.headers.getSetCookie();
  const authSessionIdMatch = cookies[0].match(/auth_session_id=([^;]+);/);

  expect(authSessionIdMatch).not.toBeNull();
});
