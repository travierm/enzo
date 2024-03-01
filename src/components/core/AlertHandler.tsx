import { Alert } from "./Alert";
import { useContext } from "preact/hooks";
import { VNode } from "preact";
import { AlertMessagesContext } from "@/services/alertMessages.service";

export function AlertHandler({ children }: { children?: VNode }) {
  const alertMessages = useContext(AlertMessagesContext);

  return (
    <div>
      {alertMessages.map((alertMessage, index) => {
        return <Alert alertMessage={alertMessage} key={index} />;
      })}
      {children}
    </div>
  );
}
