const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatNumberToUSD(num: number) {
  return USDollar.format(num);
}

export function formatGetComponentName(component: string) {
  const matches = component.match(/\[Function: (\w+)\]/);

  return matches ? matches[1] : component;
}
