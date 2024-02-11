import { AlertMessage } from "@/core/alertMessage";
import { logger } from "@/logger";
import { RequestVariables } from "@/requestVariables";
import { Context } from "hono";
import { ICacheService } from "./drivers/driver-interfaces";
import { RedisCache } from "./drivers/redis-cache.driver";

function cacheKey(sessionId: string) {
  return `alertMessages:${sessionId}`;
}

export const $alertMessageStore: ICacheService<AlertMessage[]> =
  new RedisCache();

export async function getAlertMessages(sessionId: string) {
  const alertMessages = await $alertMessageStore.get(cacheKey(sessionId));

  if (alertMessages) {
    $alertMessageStore.delete(cacheKey(sessionId));
    return alertMessages;
  }

  return [];
}

export function pushAlertMessage(
  sessionId: string,
  alertMessage: AlertMessage
) {
  return $alertMessageStore.get(sessionId).then((messages) => {
    if (!messages) {
      messages = [];
    }

    messages.push(alertMessage);
    return $alertMessageStore.set(cacheKey(sessionId), messages, 10 * 60); // 10 minutes
  });
}

export function createAlert(
  c: Context<{ Variables: RequestVariables }>,
  alertMessage: AlertMessage
) {
  const sessionId = c.get("sessionId");
  if (!sessionId) {
    logger.warn("tried to create alert without a session id");
    return;
  }

  return pushAlertMessage(sessionId, alertMessage);
}
