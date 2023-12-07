import { Context, Env } from "hono";
import { ZodError } from "zod";
import { ErrorBag } from "../globalProps";
import { ComponentType } from "preact";
import { renderComponent } from "../renderer/renderComponent";

export function createErrorBag<T>(
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T }
) {
  if (!result.success) {
    let errorBag: ErrorBag = {};
    for (const err of result.error.errors) {
      errorBag[err.path.join(".")] = err.message;
    }

    return errorBag;
  }

  return;
}

export function handleErrorBag<T, E extends Env, P extends string, O = {}>(
  context: Context<E, P>,
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T },
  Component: ComponentType<{ errorBag: ErrorBag }>
) {
  const errorBag = createErrorBag(result);

  if (errorBag) {
    return renderComponent(
      context,
      <Component errorBag={errorBag} />
    );
  }

  return;
}
