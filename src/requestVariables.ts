import { SelectUserSchema } from "./database/models/user/user.model.drizzle";

export type RequestVariables = {
  user?: SelectUserSchema;
  isAuthed?: boolean;
};
