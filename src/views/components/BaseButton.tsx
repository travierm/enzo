import { VNode } from "preact";

type Props = {
  children: VNode|string;
  onClick?: (event: MouseEvent) => void;
};

export function BaseButton(props: Props) {
  return (
    <button onClick={props.onClick} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      {props.children}
    </button>
  );
}
