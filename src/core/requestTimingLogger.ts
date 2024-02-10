import { MiddlewareHandler } from "hono";

type RequestTimingLoggerOptions = {
  logFn: (message: string) => void;
};

export function requestTimingLogger(
  options: RequestTimingLoggerOptions = {
    logFn: console.log,
  }
): MiddlewareHandler {
  return async (ctx, next) => {
    const startTime = process.hrtime();
    await next();
    const endTime = process.hrtime(startTime);
    const elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;
    options.logFn(
      `Route ${ctx.req.routePath} execution time: ${elapsedTimeInMs} ms`
    );
  };
}