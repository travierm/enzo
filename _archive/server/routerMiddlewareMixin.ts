type Constructor<T = {}> = new (...args: any[]) => T;

export type Middleware = (req: Request) => void;
export type RouterMiddleware = {};

let pendingMiddleware: Array<Middleware> = [];
let globalMiddleware: Array<Middleware> = [];
let middlewareMap: Map<string, Array<Middleware>> = new Map();

export function RouterMiddlewareMixin<T extends Constructor>(Base: T) {
  return class extends Base {
    use(middleware: Middleware) {
      globalMiddleware.push(middleware);
    }

    group(middleware: Array<Middleware>, callback: () => void) {
      pendingMiddleware = middleware;
      callback();
      pendingMiddleware = [];
    }

    registerRouteMiddleware(key: string) {
      if (pendingMiddleware.length > 0) {
        middlewareMap.set(key, pendingMiddleware);
      }
    }

    async applyMiddleware(key: string, req: Request) {
      const middleware = middlewareMap.get(key) || [];

      for (const fn of globalMiddleware) {
        await fn(req);
      }

      for (const fn of middleware) {
        await fn(req);
      }

      return { req };
    }
  };
}
