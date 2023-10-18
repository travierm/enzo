import { RadixTree } from "./radixTree";
import { RouterMiddlewareMixin } from "./routerMiddlewareMixin";

type RequestHandler = (req: Request) => Promise<Response>;

export default class Router extends RouterMiddlewareMixin(class {}) {
  routerTree = new RadixTree();
  routeMap: Map<string, RequestHandler> = new Map();

  get(path: string, handler: RequestHandler) {
    const key = `GET|${path}`;
    this.registerRoute(key, handler);
  }

  post(path: string, handler: RequestHandler) {
    const key = `POST|${path}`;
    this.registerRoute(key, handler);
  }

  put(path: string, handler: RequestHandler) {
    const key = `PUT|${path}`;
    this.registerRoute(key, handler);
  }

  patch(path: string, handler: RequestHandler) {
    const key = `PATCH|${path}`;
    this.registerRoute(key, handler);
  }

  delete(path: string, handler: RequestHandler) {
    const key = `DELETE|${path}`;
    this.registerRoute(key, handler);
  }

  getRoutes() {
    return this.routeMap;
  }

  addExternalRouter(router: Router, prefixPath?: string) {
    const routerRoutes = router.getRoutes();
    const currentRouterRoutes = this.routerTree;
    const path = prefixPath || "";

    // Add route to the current router's routes with the specified prefix path
    routerRoutes.forEach((handler, key) => {
      this.routeMap.set(`${path + key}`, handler);
      currentRouterRoutes.insert(`${path + key}`, handler);
    });
  }

  private registerRoute(key: string, handler: RequestHandler) {
    this.routeMap.set(key, handler);
    this.routerTree.insert(key, handler);

    // Register middleware to a route if pending middleware exists
    this.registerRouteMiddleware(key);
  }

  /**
   * Matches the incoming request to a route based on the request method and url pathname.
   * @private
   */
  private matchRoute(req: Request) {
    const routeKey = req.method.toUpperCase() + "|" + req.path.pathname;
    const route = this.routerTree.search(routeKey);

    if (!route) {
      console.error("Could not find route by key " + routeKey);
      return null;
    }

    return {
      ...route,
      routeKey,
    };
  }

  /**
   * Handles the incoming request by matching it to a route and executing the associated handler.
   */
  async serve(req: Request) {
    req.path = new URL(req.url);
    const matchedRoute = this.matchRoute(req);

    if (!matchedRoute?.handler) {
      return Promise.resolve(
        new Response("Not Found", {
          status: 404,
        })
      );
    }
    req.params = matchedRoute.params;

    const context = await this.applyMiddleware(matchedRoute.routeKey, req);
    return matchedRoute.handler(context.req);
  }
}
