import { Navbar } from "./Navbar";
import { RequestContext } from "@/core";
import { PropsWithChildren, useContext } from "hono/jsx";

type Props = {
  id?: string;
};

export function Layout({ children }: PropsWithChildren<Props>) {
  const context = useContext(RequestContext);

  const isAuthed = context?.get("isAuthed");

  return (
    <div class="h-full">
      <Navbar isAuthed={isAuthed} />

      {children}
    </div>
  );
}
