import { userRepo } from "@/database/models/user/user.repo.drizzle";

export async function authenticate(email: string, password: string) {
  const user = await userRepo.getDangerousUser(email);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await Bun.password.verify(user.password, password);

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
