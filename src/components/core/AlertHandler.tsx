import { AlertMessagesContext } from "@/main";
import { Alert } from "./Alert";
import { useContext } from "preact/hooks";
import { VNode } from "preact";

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
