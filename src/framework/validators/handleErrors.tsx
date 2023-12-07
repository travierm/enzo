import { Hook } from "@hono/zod-validator";
import { Context, Env } from "hono";
import { P } from "pino";
import { ZodError, ZodSchema, z } from "zod";
import { ErrorBag } from "../globalProps";
import { ComponentType, VNode } from "preact";
import { renderComponent } from "../renderer/renderComponent";

export function handleErrors<T, E extends Env, P extends string, O = {}>(
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T },
  c: Context<E, P>,
  fallbackComponent: VNode
) {
  if (!result.success) {
    let errorBag: ErrorBag = {};
    for (const err of result.error.errors) {
      errorBag[err.path.join(".")] = err.message;
    }
  }
}

// export function handleErrorBag(
//   callback: (errorBag: ErrorBag) => Promise<Response>
// ) {
//   return handleErrors;
//   //  return handleErrors((result, c) => {});
// }

export function handleErrorBag<
  T,
  E extends Env,
  P extends string,
  O = {}
>(
  context: Context<E, P>,
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T },
  Component: ComponentType<{ errorBag: ErrorBag }>,
) {
  if (!result.success) {
    let errorBag: ErrorBag = {};
    for (const err of result.error.errors) {
      errorBag[err.path.join(".")] = err.message;
    }

    return renderComponent(
      context,
      <Component errorBag={errorBag} {...(context as O)} />
    );
  }

  return;
}
