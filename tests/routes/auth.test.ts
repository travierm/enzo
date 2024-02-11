import { describe, expect, test } from "bun:test";

import { db } from "@/database/drizzle.config";
import { userFactory } from "@/database/models/user/user.factory.drizzle";
import app from "@/main";

describe("Auth", () => {
  test("Auth: Can login", async () => {
    db.transaction(async () => {
      const user = {
        username: "test",
        email: "test@test.com",
        password: "test",
      };

      await userFactory.createUser(user);

      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("password", user.password);

      const res = await app.request("/login", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(302);
      expect(res.headers.get("location")).toBe("/");
    });
  });
});
