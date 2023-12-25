import { useContext } from "preact/hooks";
import { Navbar } from "./Navbar";
import { VNode } from "preact";
import { RequestContext } from "enzo/core";

type Props = {
  children: VNode | VNode[];
};

export function Layout(props: Props) {
  const context = useContext(RequestContext);
  const authUser = context?.get("user");

  return (
    <div class="h-full">
      <Navbar isAuthed={authUser !== undefined} />

      {props.children}
    </div>
  );
}
