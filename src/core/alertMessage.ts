export type AlertMessage = {
  type: "error" | "success" | "warning" | "info";
  message?: string;
  listItems?: string[];
};

export function createAlertMessage(
  type: "error" | "success" | "warning" | "info" = "info",
  message: string,
  listItems: string[] = []
): AlertMessage {
  return {
    type,
    message,
    listItems,
  };
}
