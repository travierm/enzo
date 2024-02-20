import { AlertMessagesContext } from "@/core";
import { Alert } from "./Alert";
import { VNode } from "preact";
import { useContext } from "hono/jsx";

export function AlertHandler({ children }: { children?: VNode }) {
  const alertMessages = useContext(AlertMessagesContext);

  return (
    <div>
      {alertMessages.map((alertMessage) => {
        return <Alert alertMessage={alertMessage} />;
      })}
      {children}
    </div>
  );
}
