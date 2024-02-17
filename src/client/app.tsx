import { Counter } from "./Counter";
import { hydrateComponent } from "@/core/applyHydration";

hydrateComponent(Counter);

document.addEventListener("htmx:afterSwap", () => {
  // @ts-ignore
  initFlowbite();

  hydrateComponent(Counter);
});
