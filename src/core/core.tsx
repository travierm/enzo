import prettier from "prettier";
import type { Context } from "hono";
import { ZodSchema, z } from "zod";
import { VNode, createContext } from "preact";
import renderToString, { renderToStaticMarkup } from "preact-render-to-string";
import { BodyData } from "hono/utils/body";
import { htmlParser } from "./htmlParser";

// let indexFunction: (children: VNode) => VNode = (children) => {
//   return <div>{children}</div>;
// };

// export function setIndexComponent(func: (children: VNode) => VNode) {
//   indexFunction = func;
// }

export async function setIndexHTML(filePath: string) {
  htmlParser.parse(filePath);
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
    : htmlParser.injectContent(renderToString(componentWithContext));

  // pretty print html in development
  if (process.env.PRETTIER_HTML === "true") {
    return prettier
      .format(stringComponent, { parser: "html" })
      .then((formatted) => {
        return c.html(formatted);
      });
  }

  Bun.gzipSync(stringComponent);

  return c.html(stringComponent);
}

export async function validateForm<T extends ZodSchema>(
  c: Context,
  schema: T
): Promise<z.SafeParseReturnType<BodyData, z.infer<T>>> {
  const body = await c.req.parseBody();

  return schema.safeParseAsync(body);
}
