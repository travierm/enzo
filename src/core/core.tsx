import prettier from "prettier";
import type { Context } from "hono";
import { ZodSchema, z } from "zod";
import { VNode, createContext, Context as PreactContext } from "preact";
import renderToString from "preact-render-to-string";
import { BodyData } from "hono/utils/body";
import { htmlParser } from "./htmlParser";
import { RequestVariables } from "@/requestVariables";
import { useContext } from "preact/hooks";

export async function setIndexHTML(filePath: string) {
  htmlParser.parse(filePath);
}

export const RequestContext = createContext<Context | null>(null);
export const LoaderContext = createContext<any | null>(null);

type ComponentMiddlewareFunc = (
  arg0: VNode,
  arg1: Context
) => VNode | Promise<VNode>;

let componentMiddlware: ComponentMiddlewareFunc[] = [];
export function renderComponentMiddleware(func: ComponentMiddlewareFunc) {
  componentMiddlware.push(func);
}

export function applyContext<T>(
  context: PreactContext<T>,
  contextData: T,
  component: VNode
) {
  return <context.Provider value={contextData}>{component}</context.Provider>;
}

export async function renderComponent(
  c: Context<{ Variables: RequestVariables }>,
  component: VNode,
  loader?: <T>() => Promise<T>
) {
  const isHxRequest = c.req.header("Hx-Request");

  // apply reqest context to component
  let componentWithContext = applyContext(RequestContext, c, component);

  // apply component middleware
  for (const middleware of componentMiddlware) {
    componentWithContext = await middleware(componentWithContext, c);
  }

  if (loader) {
    const loaderData = await loader();
    componentWithContext = applyContext(
      LoaderContext,
      loaderData,
      componentWithContext
    );
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

export function useLoaderData<T extends () => Promise<any>>() {
  const data = useContext(LoaderContext);
  if (data === null) {
    throw new Error("useLoader must be used within a LoaderContext.Provider");
  }
  return data as Awaited<ReturnType<T>>;
}
