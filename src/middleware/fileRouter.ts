import { renderComponent } from "@/core";
import { RequestVariables } from "@/requestVariables";
import { MiddlewareHandler } from "hono";

const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./src/pages",
  origin: "http://localhost:3000",
  assetPrefix: "_next/static/",
});

let pageCache: Record<string, any> = {};

async function fetchPageComponent(filePath: string) {
  if (pageCache[filePath]) {
    return pageCache[filePath];
  }

  const page = await import(filePath);
  return page.default;
}

export const fileRouter = (): MiddlewareHandler<{
  Variables: RequestVariables;
}> => {
  return async (c, next) => {
    if (c.req.method === "POST") {
      return next();
    }

    const routeMatch = router.match(c.req.path);

    // @ts-ignore
    c.req.param = function (key: string) {
      return routeMatch?.params[key];
    };

    if (routeMatch) {
      const pageComponent = await fetchPageComponent(routeMatch.filePath);

      return renderComponent(c, pageComponent());
    }

    return next();
  };
};
