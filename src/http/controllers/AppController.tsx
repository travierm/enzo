import { Context } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { Navbar } from "../../views/pages/Navbar";
import { Sandbox } from "../../views/pages/Sandbox";

export class AppController {
  public async getIndex(c: Context) {
    

    return renderComponent(c, <Navbar isAuthed={true} />);
  }

  public async getSandbox(c: Context) {
    return renderComponent(c, <Sandbox />)
  }
}
