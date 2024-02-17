import { Attributes, FunctionalComponent, h, render, VNode } from "preact";

function isClientSide(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof globalThis.window !== "undefined"
  );
}

export function hydrateComponent<T>(component: FunctionalComponent<T>) {
  const roots = document?.querySelectorAll(`[data-props]`);

  roots.forEach((el) => {
    // Assume the component's root has the required data-props attribute
    const propsJson = el.getAttribute("data-props");
    let propData = {};

    if (propsJson) {
      propData = JSON.parse(propsJson);

      //el.removeAttribute("data-props");
    }

    render(h(component, propData as Attributes & T), el);
  });
}

export function applyHydration<T>(component: (props: T) => VNode) {
  const formatName = component.name.replace(/([a-z])([A-Z])/g, "$1-$2");

  if (isClientSide()) {
    return component;
  }

  // A wrapper component for server-side logic
  return (props: T) => {
    const propsJson = JSON.stringify(props);
    const escapedPropsJson = propsJson.replace(/</g, "\\u003c");

    return h(
      formatName as any,
      {
        "data-props": escapedPropsJson,
      },
      [h(component, props as Attributes & T)]
    );
  };
}
