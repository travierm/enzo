import { ServiceContainer } from "./framework/serviceContainer";
import { UserService } from "./http/services/UserService";

const serviceContainer = new ServiceContainer();

const userService = new UserService();

serviceContainer.register(UserService.name, () => {
  return userService;
});

await userService.createUser("admin", "admin");

export { serviceContainer };
