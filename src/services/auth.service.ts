import { UserTableSafe } from "@/database/models/user/user.model.drizzle";
import { userRepo } from "@/database/models/user/user.repo.drizzle";

export async function authenticate(
  email: string,
  password: string
): Promise<UserTableSafe | null> {
  const user = await userRepo.getDangerousUser(email);

  if (!user) {
    throw new Error("User not found");
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
