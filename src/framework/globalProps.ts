import { Context } from "hono";

export type ErrorBag = {
  message: string;
  inputErrors: {
    [key: string]: string;
  };
};

export type TemplateMessage = {
  type: "error" | "success" | "warning" | "info";
  message: string;
  listItems: string[];
};
