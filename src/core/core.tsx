import { Context, Env } from "hono";
import { ZodError, ZodSchema } from "zod";
import { ComponentType, VNode, createContext } from "preact";

import renderToString from "preact-render-to-string";
import { Index } from "../index";

export type ErrorBag = {
  message: string;
  inputErrors: {
    [key: string]: string;
  };
};

export type AlertMessage = {
  type: "error" | "success" | "warning" | "info";
  message: string;
  listItems: string[];
};

export function createAlertMessage(
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

export const RequestContext = createContext<Context | null>(null);

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
  const isHxRequest = c.req.header("Hx-Request");

  // apply reqest context to component
  const componentWithContext = applyContext(c, component);

  // append component to index.html unless hx request header is present
  const stringComponent = isHxRequest
    ? renderToString(componentWithContext)
    : renderToString(<Index>{componentWithContext}</Index>);

  return c.html(stringComponent);
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

export async function validateForm<T extends ZodSchema>(c: Context, schema: T) {
  const body = await c.req.parseBody();
  return await schema.safeParseAsync(body);
}
