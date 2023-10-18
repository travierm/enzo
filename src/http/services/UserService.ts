const { v4: uuidv4 } = require("uuid");
type User = {
  id: number;
  email: string;
  password: string;
  token: string;
  tokenExpiration?: Date;
};

const users: User[] = [];
const tokenStore = new Map<string, User>();

export class UserService {
  constructor() {}

  public clearToken(token: string | undefined): void {
    if (token) {
      tokenStore.delete(token);
    }
  }

  public getUserByToken(token: string): User | undefined {
    return tokenStore.get(token);
  }

  public async createUser(email: string, password: string): Promise<User> {
    password = await Bun.password.hash(password);

    const user = { email, password, token: uuidv4(), id: users.length + 1 };
    users.push(user);

    return user;
  }

  private getUser(email: string): User | undefined {
    return users.find((user) => user.email === email);
  }

  public async loginUser(email: string, password: string): Promise<User> {
    const user = this.getUser(email);
    if (!user) {
      throw new Error("Invalid email");
    }

    const verfied = await Bun.password.verify(password, user.password);
    if (!verfied) {
      throw new Error("Invalid password");
    }

    user.token = uuidv4();
    user.tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    tokenStore.set(user.token, user);

    return user;
  }
}
