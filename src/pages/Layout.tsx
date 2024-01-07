import { Navbar } from "./Navbar";
import { VNode } from "preact";
import { RequestContext } from "enzo/core";

type Props = {
  children: VNode | VNode[];
};

export function Layout(props: Props) {
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
