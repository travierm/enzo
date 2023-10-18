import { JSX } from "solid-js";

import { Navbar } from "../pages/Navbar";

type Props = {
  children: JSX.Element;
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
