import { VNode } from "preact";

type Props = {
  className?: string;
  children: VNode | string;
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
  onClick?: (event: MouseEvent) => void;
};

export function CoreHeading({
  className = "",
  children,
  size = "2xl",
  onClick,
}: Props) {
  return (
    <div onClick={onClick} class={`text-${size} ${className} p-4`}>
      {children}
    </div>
  );
}
