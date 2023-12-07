import { Context, Env } from "hono";
import { ZodError } from "zod";
import { ErrorBag, TemplateMessage } from "../globalProps";
import { ComponentType } from "preact";
import { renderComponent } from "../renderer/renderComponent";

export function createTemplateMessage(type: 'error' | 'success' | 'warning' | 'info' = 'info', message: string, listItems: string[] = []) {
  return {
    type,
    message,
    listItems,
  } as TemplateMessage
}

export function createTemplateMessageFromResult<T>(
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T }
) {
  if (Object.hasOwn(result, "success")) {
    if (!result.success) {
      const templateMessage: TemplateMessage = {
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

export function handleErrorBag<T, E extends Env, P extends string, O = {}>(
  context: Context<E, P>,
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T },
  Component: ComponentType<{ templateMessage: TemplateMessage }>
) {
  const templateMessage = createTemplateMessageFromResult(result);

  if (templateMessage) {
    return renderComponent(
      context,
      <Component templateMessage={templateMessage} />
    );
  }

  return;
}
