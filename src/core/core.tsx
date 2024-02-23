import prettier from "prettier";
import type { Context } from "hono";
import { ZodSchema, z } from "zod";
import { VNode, createContext } from "preact";
import renderToString from "preact-render-to-string";
import { BodyData } from "hono/utils/body";
import { htmlParser } from "./htmlParser";
import { AlertMessage } from "./alertMessage";
import { RequestVariables } from "@/requestVariables";
import { getAlertMessages } from "@/services/alertMessages.service";
import { useContext } from "preact/hooks";

export async function setIndexHTML(filePath: string) {
  htmlParser.parse(filePath);
}

export const AlertMessagesContext = createContext<AlertMessage[]>([]);
export const RequestContext = createContext<Context | null>(null);

export function applyContext(c: Context, component: VNode) {
  return (
    <RequestContext.Provider value={c}>{component}</RequestContext.Provider>
  );
}

export function applyAlertMessages(
  alertMessages: AlertMessage[],
  component: VNode
) {
  return (
    <AlertMessagesContext.Provider value={alertMessages}>
      {component}
    </AlertMessagesContext.Provider>
  );
}

export async function renderComponent(
  c: Context<{ Variables: RequestVariables }>,
  component: VNode,
  loader?: <T>() => Promise<T>
) {
  const isHxRequest = c.req.header("Hx-Request");

  // apply reqest context to component
  let componentWithContext = applyContext(c, component);
  const alertMessages = await getAlertMessages(c.get("sessionId") ?? "");
  componentWithContext = applyAlertMessages(
    alertMessages,
    componentWithContext
  );

  if (loader) {
    const loaderData = await loader();
    componentWithContext = applyLoaderContext(loaderData, componentWithContext);
  }

  // append component to index.html unless hx request header is present
  const stringComponent = isHxRequest
    ? renderToString(componentWithContext)
    : htmlParser.injectContent(renderToString(componentWithContext));

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

export const LoaderContext = createContext<any | null>(null);

export function applyLoaderContext<T>(loaderData: T, component: VNode) {
  return (
    <LoaderContext.Provider value={loaderData}>
      {component}
    </LoaderContext.Provider>
  );
}

export function useLoaderData<T extends () => Promise<any>>() {
  const data = useContext(LoaderContext);
  if (data === null) {
    throw new Error("useLoader must be used within a LoaderContext.Provider");
  }
  return data as Awaited<ReturnType<T>>;
}
