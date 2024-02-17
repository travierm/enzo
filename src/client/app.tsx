import { Counter } from "./Counter";
import { hydrateComponent } from "@/core/applyHydration";

hydrateComponent("Counter", Counter);

document.addEventListener("htmx:afterSwap", () => {
  initFlowbite();
});
