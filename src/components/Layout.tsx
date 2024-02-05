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

  return (
    <RequestContext.Consumer>
      {(context) => {
        return (
          <div class="h-full">
            <Navbar isAuthed={context?.get("user") !== undefined} />

            {props.children}
          </div>
        );
      }}
    </RequestContext.Consumer>
  );
}
