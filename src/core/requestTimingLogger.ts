import { MiddlewareHandler } from "hono";

export function requestTimingLogger(): MiddlewareHandler {
  return async (ctx, next) => {
    const startTime = process.hrtime();
    await next();
    const endTime = process.hrtime(startTime);
    const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;
    console.log(
      `Route ${ctx.req.routePath} execution time: ${elapsedTimeInMs} ms`
    );
  };
}
