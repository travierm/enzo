import { RequestVariables } from "@/requestVariables";
import { Context } from "hono";

export type AlertMessage = {
  type: "error" | "success" | "warning" | "info";
  message?: string;
  listItems?: string[];
};

export function createAlert(
  c: Context<{ Variables: RequestVariables }>,
  alertMessage: AlertMessage
) {
  let messages = c.get("alertMessages");
  if (messages === undefined) {
    messages = [];
  }

  messages.push(alertMessage);
  c.set("alertMessages", messages);
}

export function createAlertMessage(
  type: "error" | "success" | "warning" | "info" = "info",
  message: string,
  listItems: string[] = []
): AlertMessage {
  return {
    type,
    message,
    listItems,
  };
}
