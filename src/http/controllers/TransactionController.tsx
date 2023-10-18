import { Context } from "hono";

import { renderComponent } from "../../framework/renderer/renderComponent";

export class TransactionController {
  public getCreate(c: Context) {
    return renderComponent(c, <h1>Hi</h1>);
  }
}
