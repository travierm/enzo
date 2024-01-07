const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatNumberToUSD(num: number) {
  return USDollar.format(num);
}
