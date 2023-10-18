import { h, render } from 'preact';

import { Counter } from '../views/components/Counter';

document.querySelectorAll("[data-hydrate]").forEach((el) => {
  const componentName = el.getAttribute("data-hydrate");
  const props = JSON.parse(el.getAttribute("data-props") || "{}");

  let Component;
  switch (componentName) {
    case "Counter":
      Component = Counter;
      break;
    // Add more cases as needed
    default:
      console.warn(`Component ${componentName} not found for hydration.`);
      return;
  }

  render(h(Component, props), el, el.firstChild);
});
