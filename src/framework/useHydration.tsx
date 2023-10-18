import { VNode } from 'preact';

export function useHydration(Component: VNode, props = {}) {
  return (
    <div data-hydrate={"Counter"} data-props={JSON.stringify(props)}>
      {Component}
    </div>
  );
}
