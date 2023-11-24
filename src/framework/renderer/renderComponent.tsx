import { Context } from "hono";
import { VNode, createContext } from "preact";
import renderToString from "preact-render-to-string";

import { Index } from "../../index";

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

export async function renderComponent(c: Context, component: VNode) {
  const stringComponent = renderToString(<Index>{component}</Index>);

  return new Response(stringComponent, {
    headers: { "Content-Type": "text/html" },
  });
}
