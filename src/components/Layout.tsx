import { Navbar } from "./Navbar";
import { VNode } from "preact";
import { RequestContext } from "enzo-core";

type Props = {
  id?: string;
  children: VNode | VNode[];
};

export function Layout({ id = "", ...props }: Props) {
  return (
    <RequestContext.Consumer>
      {(context) => {
        return (
          <div class="h-full" id={id}>
            <Navbar isAuthed={context?.get("user") !== undefined} />

            {props.children}
          </div>
        );
      }}
    </RequestContext.Consumer>
  );
}
