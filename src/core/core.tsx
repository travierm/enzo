import prettier from "prettier";
import type { Context } from "hono";
import { ZodSchema, z } from "zod";
import { BodyData } from "hono/utils/body";
import { htmlParser } from "./htmlParser";
import { AlertMessage } from "./alertMessage";
import { RequestVariables } from "@/requestVariables";
import { getAlertMessages } from "@/services/alertMessages.service";
import { Child, FC, createContext } from "hono/jsx";
import { raw } from "hono/html";

// let indexFunction: (children: VNode) => VNode = (children) => {
//   return <div>{children}</div>;
// };

// let indexFunction: (children: VNode) => VNode | null = null;

// export function setIndexComponent(func: (children: VNode) => VNode) {
//   indexFunction = func;
// }

export async function setIndexHTML(filePath: string) {
  htmlParser.parse(filePath);
}

export const AlertMessagesContext = createContext<AlertMessage[]>([]);
export const RequestContext = createContext<Context | null>(null);

function AlertMessagesProvider({
  data,
  children,
}: {
  data: AlertMessage[];
  children: Child;
}) {
  return (
    <AlertMessagesContext.Provider value={data}>
      {children}
    </AlertMessagesContext.Provider>
  );
}

function RequestProvider({
  data,
  children,
}: {
  data: Context;
  children: Child;
}) {
  return (
    <RequestContext.Provider value={data}>{children}</RequestContext.Provider>
  );
}

export function applyContext(c: Context, component: Child) {
  return <RequestProvider data={c}>{component}</RequestProvider>;
}

export function applyAlertMessages(
  alertMessages: AlertMessage[],
  component: FC
) {
  return (
    <AlertMessagesProvider data={alertMessages}>
      {component}
    </AlertMessagesProvider>
  );
}

export async function renderComponent(
  c: Context<{ Variables: RequestVariables }>,
  component: FC | Child
) {
  const isHxRequest = c.req.header("Hx-Request");

  // apply reqest context to component
  let componentWithContext = applyContext(c, component);
  const alertMessages = await getAlertMessages(c.get("sessionId") ?? "");
  componentWithContext = applyAlertMessages(
    alertMessages,
    componentWithContext
  );

  // append component to index.html unless hx request header is present
  const stringComponent = isHxRequest
    ? raw(componentWithContext)
    : htmlParser.injectContent(raw(componentWithContext));

  // pretty print html in development
  if (process.env.PRETTIER_HTML === "true") {
    return prettier
      .format(stringComponent, { parser: "html" })
      .then((formatted) => {
        return c.html(formatted);
      });
  }

  return c.html(stringComponent);
}

export async function validateForm<T extends ZodSchema>(
  c: Context,
  schema: T
): Promise<z.SafeParseReturnType<BodyData, z.infer<T>>> {
  const body = await c.req.parseBody();

  return schema.safeParseAsync(body);
}
