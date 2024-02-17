import { h, ComponentFactory, render } from "preact";

function isClientSide(): boolean {
  return typeof window !== "undefined";
}

export function hydrateComponent(
  uniqueName: string,
  component: ComponentFactory
) {
  const formatName = uniqueName.replace(/([a-z])([A-Z])/g, "$1-$2");
  const elementName = `component-${formatName.toLowerCase()}`;

  const root = document?.querySelectorAll(elementName);

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

    const newElement = h(component, propData);
    render(newElement, el);
  });

  //return hydrate(h(component, JSON.parse(data?.innerHTML ?? "")), root);
}

export function applyHydration(
  uniqueName: string,
  component: ComponentFactory
) {
  const formatName = uniqueName.replace(/([a-z])([A-Z])/g, "$1-$2");
  const elementName = `component-${formatName.toLowerCase()}`;

  if (isClientSide()) {
    return component;
  }

  return (props: any) =>
    h(elementName, {}, [
      h("script", {
        type: "application/json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(props) },
      }),
      h(component, {}),
    ]);
}
