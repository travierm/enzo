import { Context } from "hono";

export type ErrorBag = {
  message: string;
  inputErrors: {
    [key: string]: string;
  };
};
