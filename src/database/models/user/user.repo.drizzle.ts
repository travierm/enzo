import { db } from "@/database/drizzle.config";
import { desc, eq } from "drizzle-orm";
import { UpdateUserSchema, userTable } from "./user.model.drizzle";

class UserRepo {
  getDangerousUser(email: string) {
    return db
      .select({
        id: userTable.id,
        username: userTable.username,
        email: userTable.email,
        password: userTable.password,
        createdAt: userTable.createdAt,
        updatedAt: userTable.updatedAt,
      })
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1)
      .then((records) => records[0]);
  }

  deleteUser(id: UpdateUserSchema["id"]) {
    return db.delete(userTable).where(eq(userTable.id, id));
  }

  listUsers() {
    return db
      .select({
        id: userTable.id,
        username: userTable.username,
        email: userTable.email,
        createdAt: userTable.createdAt,
        updatedAt: userTable.updatedAt,
      })
      .from(userTable)
      .orderBy(desc(userTable.createdAt));
  }
}

export const userRepo = new UserRepo();
