import { Attributes, FunctionalComponent, h, render, VNode } from "preact";

function isClientSide(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof globalThis.window !== "undefined"
  );
}

export function hydrateComponent<T>(component: FunctionalComponent<T>) {
  const formatName = component.name.replace(/([a-z])([A-Z])/g, "$1-$2");
  const root = document?.querySelectorAll(formatName);

  root.forEach((el) => {
    let propData = {};
    const jsonScriptElement = el.querySelector(
      'script[type="application/json"]'
    );

    if (jsonScriptElement) {
      propData = JSON.parse(jsonScriptElement.innerHTML);
      jsonScriptElement.remove();
    }

    el.innerHTML = "";
    render(h(component, propData as Attributes & T), el);
  });
}

export function applyHydration<T>(component: (props: T) => VNode) {
  const formatName = component.name.replace(/([a-z])([A-Z])/g, "$1-$2");

  if (isClientSide()) {
    return component;
  }

  // A wrapper component that handles both server-side and client-side logic
  return (props: T) => {
    return h(formatName, {}, [
      h("script", {
        type: "application/json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, props as Attributes & T),
    ]);
  };
}
