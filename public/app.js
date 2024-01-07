const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatValueToUSD(e) {
  var rawValue = e.value.replace(/[\D\s\._\-]+/g, "");

  // Convert the cleaned string to an integer
  var numericValue = rawValue ? parseInt(rawValue, 10) : 0;

  // Format the value as a currency for display
  e.value = numericValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // to avoid fractions in USD
  });
}

function main() {
  const elements = document.querySelectorAll(".mask-usd");

  elements.forEach((element) => {
    element.addEventListener("input", function (e) {
      formatValueToUSD(e.target);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
