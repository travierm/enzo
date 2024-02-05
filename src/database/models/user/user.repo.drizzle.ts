import { db } from "@/database/drizzle.config";
import { UpdateUserSchema, UserTable, userTable } from "./user.model.drizzle";
import { and, eq } from "drizzle-orm";

export function createUser(user: UserTable) {
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

export async function getUserByAuthCheck(email: string, password: string) {
  const result = await db
    .select({
      id: userTable.id,
      email: userTable.email,
      password: userTable.password,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,
    })
    .from(userTable)
    .where(and(eq(userTable.email, email), eq(userTable.password, password)))
    .limit(1);

  if (!result.length) {
    return null;
  }

  const user = result[0];
  return Bun.password.verify(password, user.password).then(() => {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  });
}

export function deleteRecord(id: UpdateUserSchema["id"]) {
  return db.delete(userTable).where(eq(userTable.id, id));
}
