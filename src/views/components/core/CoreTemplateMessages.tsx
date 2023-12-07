import { VNode } from "preact";
import { TemplateMessage } from "../../../framework/globalProps";

type Props = {
  templateMessage: TemplateMessage;
};

export function CoreTemplateMessage({ templateMessage }: Props) {
  const { type, message, listItems } = templateMessage;

  const colorMap = {
    error: "bg-red-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  };

  const color = colorMap[type];

  return (
    <div
      class={`${color} flex p-4 mb-4 text-sm text-${color}-800 rounded-lg `}
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">{type.charAt(0).toUpperCase()}</span>
      <div>
        <span class="font-medium">{message}</span>
        {listItems && (
          <ul class="mt-1.5 list-disc list-inside">
            {listItems.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}