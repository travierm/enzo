import { db } from "@/database/drizzle.config";
import { UserTable, userTable } from "./user.model.drizzle";

class UserFactory {
  createUser(user: UserTable) {
    return Bun.password
      .hash(user.password, {
        algorithm: "argon2id",
        memoryCost: 4,
        timeCost: 3,
      })
      .then((hash) => {
        user.password = hash;
        return db.insert(userTable).values(user);
      });
  }
}

export const userFactory = new UserFactory();
