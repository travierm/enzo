import type { Context } from "hono";
import { ZodSchema, z } from "zod";
import { VNode, createContext } from "preact";
import renderToString from "preact-render-to-string";
import { BodyData } from "hono/utils/body";

let indexFunction: (children: VNode) => VNode = (children) => {
  return <div>{children}</div>;
};

export function setIndexComponent(func: (children: VNode) => VNode) {
  indexFunction = func;
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

export function renderComponent(c: Context, component: VNode) {
  const isHxRequest = c.req.header("Hx-Request");

  // apply reqest context to component
  const componentWithContext = applyContext(c, component);

  // append component to index.html unless hx request header is present
  const stringComponent = isHxRequest
    ? renderToString(componentWithContext)
    : renderToString(indexFunction(componentWithContext));

  return c.html(stringComponent);
}

export async function validateForm<T extends ZodSchema>(
  c: Context,
  schema: T
): Promise<z.SafeParseReturnType<BodyData, z.infer<T>>> {
  const body = await c.req.parseBody();

  return schema.safeParseAsync(body);
}
