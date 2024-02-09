import { Navbar } from "./Navbar";
import { VNode } from "preact";
import { RequestContext } from "@/core";
import { useContext } from "preact/hooks";

type Props = {
  id?: string;
  children: VNode | VNode[];
};

export function Layout({ id = "", ...props }: Props) {
  const context = useContext(RequestContext);

  const isAuthed = context?.get("isAuthed");

  return (
    <RequestContext.Consumer>
      {(context) => {
        return (
          <div class="h-full">
            <Navbar isAuthed={isAuthed} />

            {props.children}
          </div>
        );
      }}
    </RequestContext.Consumer>
  );
}
