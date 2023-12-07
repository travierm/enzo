import { Context, Env } from "hono";
import { ZodError } from "zod";
import { ErrorBag } from "../globalProps";
import { ComponentType } from "preact";
import { renderComponent } from "../renderer/renderComponent";


export function createErrorBag(keyMap: { [key: string]: string }, message: string = "Validation failed") {
  let errorBag: ErrorBag = {
    message: message,
    inputErrors: {},
  };

  for (const key in keyMap) {
    errorBag.inputErrors[key] = keyMap[key];
  }

  return errorBag;
}

export function createErrorBagFromResult<T>(
  result:
    | { success: true; data: T }
    | { success: false; error: ZodError; data: T }
) {

  if(Object.hasOwn(result, 'success')) {
      if (!result.success) {
        let errorBag: ErrorBag = {
          message: "Validation failed",
          inputErrors: {},
        };

        for (const err of result.error.errors) {
          errorBag.inputErrors[err.path.join(".")] = err.message;
        }

        return errorBag;
      }
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
  const errorBag = createErrorBagFromResult(result);

  if (errorBag) {
    return renderComponent(
      context,
      <Component errorBag={errorBag} />
    );
  }

  return;
}
