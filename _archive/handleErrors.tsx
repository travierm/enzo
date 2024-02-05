import { Context, Env } from "hono";
import { ZodError } from "zod";
import { ErrorBag, AlertMessage } from "@/core";
import { ComponentType } from "preact";
import { render } from "../renderer/renderComponent";

export function createTemplateMessage(
  type: "error" | "success" | "warning" | "info" = "info",
  message: string,
  listItems: string[] = []
) {
  return {
    type,
    message,
    listItems,
  } as AlertMessage;
}

export function createTemplateMessageFromResult<T>(
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T }
) {
  if (Object.hasOwn(result, "success")) {
    if (!result.success) {
      const templateMessage: AlertMessage = {
        type: "error",
        message: "Validation failed",
        listItems: [],
      };

      for (const err of result.error.errors) {
        templateMessage.listItems.push(`${err.path.join(".")} ${err.message}`);
      }

      return templateMessage;
    }
  }

  return;
}

export function handleZodErrors<T, E extends Env, P extends string, O = {}>(
  context: Context<E, P>,
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T },
  Component: ComponentType<{ templateMessage: AlertMessage }>
) {
  const templateMessage = createTemplateMessageFromResult(result);

  if (templateMessage) {
    return render(context, <Component templateMessage={templateMessage} />);
  }

  return;
}
