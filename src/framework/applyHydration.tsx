import { h, hydrate, ComponentFactory } from "preact";

function isClientSide(): boolean {
  return typeof window !== "undefined";
}

export function applyHydration<T>(
  uniqueName: string,
  component: ComponentFactory<T>
) {
  const formatName = uniqueName.replace(/([a-z])([A-Z])/g, "$1-$2");
  const elementName = `component-${formatName.toLowerCase()}`;

  if (isClientSide()) {
    const root = document?.querySelector(elementName);
    const data = root?.querySelector('[type="application/json"]');

    return hydrate(
      h(component, JSON.parse(data?.innerHTML)),
      root
    ) as unknown as ComponentFactory<T>;
  }

  return (props: T) =>
    h(elementName, {}, [
      h("script", {
        type: "application/json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, props),
    ]);
}
