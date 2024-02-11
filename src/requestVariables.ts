import { AlertMessage } from "./core/alertMessage";
import { SelectUserSchema } from "./database/models/user/user.model.drizzle";

export type RequestVariables = {
  sessionId?: string;
  user?: SelectUserSchema;
  isAuthed?: boolean;
  alertMessages?: AlertMessage[];
};
