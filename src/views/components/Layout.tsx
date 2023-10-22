import { JSX } from "solid-js";

import { Navbar } from "../pages/Navbar";
import { VNode } from "preact";

type Props = {
  children: VNode|VNode[];
};

export function Layout(props: Props) {
  // const context = React.useContext(RequestContext);
  // const authUser = context?.get("user");

  return (
    <div class="h-full">
      <Navbar isAuthed={true} />

      {props.children}
    </div>
  );
}
