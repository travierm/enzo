import { UserTableSafe } from "@/database/models/user/user.model.drizzle";
import { userRepo } from "@/database/models/user/user.repo.drizzle";
import { Context } from "hono";
import {
  $sessionStore,
  createSession,
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "./session.service";

export async function handleLogout(c: Context) {
  const sessionId = getSessionCookie(c);

  if (sessionId) {
    await $sessionStore.delete(sessionId);
    deleteSessionCookie(c);
  }
}

export async function handleAuth(c: Context, email: string, password: string) {
  const user = await verifyAuh(email, password);
  if (!user) {
    throw new Error("Could not verify auth");
  }

  const session = await createSession(user);
  setSessionCookie(c, session.id);

  c.set("user", user);
  c.set("isAuthed", true);
}

export async function verifyAuh(
  email: string,
  password: string
): Promise<UserTableSafe | null> {
  const user = await userRepo.getDangerousUser(email);

  if (!user) {
    return null;
  }

  const passwordMatch = await Bun.password.verify(
    password,
    user.password,
    "argon2id"
  );

  return !passwordMatch
    ? null
    : {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
}
