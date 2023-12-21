import { ServeOptions, Server as BunServer } from "bun";

import Router from "./router";

export type ListenOptions = Omit<ServeOptions, "fetch">;
export type UseRouterParams = { prefixPath?: string; router: Router };

// Make TypeScript happy
declare global {
  var server: BunServer;

  interface Request {
    path: URL;
    params: Map<string, string>;
  }
}

export default class Server {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  stop() {
    globalThis.server.stop();
  }

  /**
   * Start the server and listening for incoming requests
   */
  listen(options: ListenOptions) {
    const router = this.router;

    // Override fetch method to use the router's serve method
    const serverOptions = {
      ...options,
      async fetch(req: Request): Promise<Response> {
        return await router.serve(req);
      },
    };

    // Support hot reloading using Bun's reload method
    if (!globalThis.server) {
      globalThis.server = Bun.serve(serverOptions);
    } else {
      globalThis.server.reload(serverOptions);
    }
  }

  /**
   * Add routes from another router instance
   */
  useRouter(opts: UseRouterParams) {
    this.router.addExternalRouter(opts.router, opts.prefixPath);
  }

  printRoutes() {
    const routes = this.router.getRoutes();
    const routesByPath = new Map<string, string[]>();

    // Group routes by path
    routes.forEach((_, key) => {
      const [method, path] = key.split("|");

      if (routesByPath.has(path)) {
        routesByPath.get(path)?.push(method);
      } else {
        routesByPath.set(path, [method]);
      }
    });

    console.group("Routes:");
    routesByPath.forEach((methods, path) => {
      const pathMethods = methods.join(",");
      console.log(`{${pathMethods}} -`, path);
    });
    console.groupEnd();
  }
}
