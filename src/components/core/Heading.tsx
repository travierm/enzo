import { FC } from "hono/jsx";

type Props = {
  className?: string;
  children: FC | string;
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
  onClick?: (event: MouseEvent) => void;
};

export function Heading({
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
