import chalk from "chalk";
import { Command } from "commander";
import { input } from "@inquirer/prompts";
import { userFactory } from "@/database/models/user/user.factory.drizzle";
import { userRepo } from "@/database/models/user/user.repo.drizzle";

const log = console.log;

const program = new Command();

program
  .name("Enzo CLI")
  .description("CLI for interacting with your Enzo app.")
  .version("0.0.1");

program
  .command("user:create")
  .description("Create a new user account")
  .action(async () => {
    log(chalk.green("Creating new user account..."));

    const email = await input({ message: "Email: " });
    const username = await input({ message: "Username: " });
    const password = await input({ message: "Password: " });

    try {
      await userFactory.createUser({
        email,
        username,
        password,
      });
    } catch (error) {
      log(chalk.red("Error creating user account: ", error));
      process.exit();
    }

    log(chalk.green("User account created successfully!"));
    process.exit();
  });

program
  .command("user:list")
  .description("List user accounts")
  .action(async () => {
    const users = await userRepo.listUsers();

    if (!users.length) {
      log(chalk.yellow("No users found"));
    } else {
      console.table(users);
    }

    process.exit();
  });

program.parse(process.argv);
