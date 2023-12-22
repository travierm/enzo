import { Context, Env } from "hono";
import { ZodError } from "zod";
import { ComponentType, VNode, createContext } from "preact";

import renderToString from "preact-render-to-string";
import { Index } from "../index";

export type ErrorBag = {
  message: string;
  inputErrors: {
    [key: string]: string;
  };
};

export type TemplateMessage = {
  type: "error" | "success" | "warning" | "info";
  message: string;
  listItems: string[];
};

export function createTemplateMessage(
  type: "error" | "success" | "warning" | "info" = "info",
  message: string,
  listItems: string[] = []
) {
  return {
    type,
    message,
    listItems,
  } as TemplateMessage;
}

export const RequestContext = createContext<Context | undefined>(undefined);

function RequestProvider({
  data,
  children,
}: {
  data: Context;
  children: VNode;
}) {
  return (
    <RequestContext.Provider value={data}>{children}</RequestContext.Provider>
  );
}

export function applyContext(c: Context, component: VNode) {
  return <RequestProvider data={c}>{component}</RequestProvider>;
}

export async function render(c: Context, component: VNode) {
  const stringComponent = renderToString(<Index>{component}</Index>);

  return new Response(stringComponent, {
    headers: { "Content-Type": "text/html" },
  });
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

export function handleZodErrors<T, E extends Env, P extends string, O = {}>(
  context: Context<E, P>,
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T },
  Component: ComponentType<{ templateMessage: TemplateMessage }>
) {
  const templateMessage = createTemplateMessageFromResult(result);

  if (templateMessage) {
    return render(context, <Component templateMessage={templateMessage} />);
  }

  return;
}
