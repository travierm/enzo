import { VNode } from "preact";
import { ErrorBag } from "enzo/core";

type Props = {
  errorBag: ErrorBag;
};

export function CoreFormErrors({ errorBag }: Props) {
  return (
    <div
      class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
      <span class="sr-only">Danger</span>
      <div>
        <span class="font-medium">{errorBag.message}</span>
        {errorBag.inputErrors && (
          <ul class="mt-1.5 list-disc list-inside">
            {errorBag &&
              Object.keys(errorBag.inputErrors).map((key) => {
                return <li>{errorBag.inputErrors[key]}</li>;
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
