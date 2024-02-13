import { AlertMessage } from "@/core/alertMessage";
import {
  getAlertMessages,
  pushAlertMessage,
} from "@/services/alertMessages.service";
import { generateSessionId } from "@/services/session.service";
import { describe, expect, test } from "bun:test";

describe("Alert Messages", () => {
  test("can push and pull messages", async () => {
    const alertMessage: AlertMessage = {
      type: "error",
      message: "test",
    };

    const sessionId = generateSessionId();
    await pushAlertMessage(sessionId, alertMessage);
    const firstPull = await getAlertMessages(sessionId);
    const secondPull = await getAlertMessages(sessionId);

    expect(firstPull).toEqual([alertMessage]);
    expect(secondPull).toEqual([]);
  });
});
