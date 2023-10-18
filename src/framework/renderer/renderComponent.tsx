import { Context } from 'hono';
import { VNode } from 'preact';
import renderToString from 'preact-render-to-string';

import { Index } from '../../index';

//import { htmlParser } from "./parseHtml";
//await htmlParser.parse("./public/index.html");

// needs to stay in this file to work
// export const RequestContext = React.createContext<Context | undefined>(
//   undefined
// );

// function RequestProvider({
//   data,
//   children,
// }: {
//   data: Context;
//   children: React.ReactNode;
// }) {
//   console.log("RequestProvider", data.req.path);
//   return (
//     <RequestContext.Provider value={data}>{children}</RequestContext.Provider>
//   );
// }

// export function applyContext(c: Context, component: React.ReactElement) {
//   console.log("applyContext", c.req.path);
//   return <RequestProvider data={c}>{component}</RequestProvider>;
// }

export async function renderComponent(c: Context, component: VNode) {
  const stringComponent = renderToString(<Index>{component}</Index>);

  return new Response(stringComponent, {
    headers: { "Content-Type": "text/html" },
  });
}
