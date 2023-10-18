import { Context } from "hono";

export type ErrorBag = {
  [key: string]: string;
};

export interface ComponentProps {
  children?: React.ReactNode;
  context?: Context;
}
