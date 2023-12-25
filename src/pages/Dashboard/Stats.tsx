import { Income } from "./IncomeTable";

type Props = {
  income: Income[];
};

export function Stats(props: Props) {
  let totalIncome = 0;
  for (let i = 0; i < props.income.length; i++) {
    totalIncome += props.income[i].amount;
  }

  return (
    <div
      class="relative overflow-x-auto shadow-md sm:rounded"
      hx-get="/dashboard/stats"
      hx-swap="outerHTML"
      hx-trigger="incomeUpdated from:body"
    >
      <ul class="w-full text-sm text-left text-gray-500">
        <li>
          <strong>Total Income: {totalIncome}</strong>
        </li>
      </ul>
    </div>
  );
}
