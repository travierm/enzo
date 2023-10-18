import { Context } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";
import { Navbar } from "../../views/pages/Navbar";

export class AppController {
  public async getIndex(c: Context) {
    return renderComponent(c, <Navbar isAuthed={false} />);
  }
}
