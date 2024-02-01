import { Dashboard } from "./Dashboard";
import { Context } from "hono";
import { render } from "enzo-core";
import Container from "typedi";
import { RecordService } from "@/services/RecordService";

const recordService = Container.get(RecordService);

export async function getDashboard(c: Context) {
  const props = await recordService.getDashboardProps();

  return render(c, <Dashboard {...props} />);
}
