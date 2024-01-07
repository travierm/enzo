import { Record } from "@/database/models/record/record.model";
type Props = {
  currentBalance: number;
  income: Record[];
  expenses: Record[];
};

export function Stats(props: Props) {
  let totalIncome = 0;
  for (let i = 0; i < props.income.length; i++) {
    totalIncome += Number(props.income[i].amount);
  }

  let totalExpense = 0;
  for (let k = 0; k < props.expenses.length; k++) {
    totalExpense += Number(props.expenses[k].amount);
  }

  const incomeRatio = Math.round((totalExpense / totalIncome) * 100);
  const monthyNetProfit = totalIncome - totalExpense;

  let monthlyProjections: number[] = [];

  let previousProjection;
  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      previousProjection = props.currentBalance;
    } else {
      previousProjection = monthlyProjections[i - 1];
    }

    monthlyProjections.push(previousProjection + monthyNetProfit);
  }

  return (
    <div
      class="relative overflow-x-auto shadow-md sm:rounded"
      hx-get="/dashboard/stats"
      hx-swap="outerHTML"
      hx-trigger="incomeUpdated from:body, expenseUpdated from:body"
    >
      <ul class="w-full text-sm text-left text-gray-500 p-2">
        <li>Total Income: {totalIncome}</li>
        <li>Total Expenses: {totalExpense}</li>
        <li>Monthly Net Profit: {monthyNetProfit}</li>
        <li>Expense to Income Ration: {incomeRatio}%</li>
        {monthlyProjections.map((projection, index) => (
          <li>
            {index + 1} Month Projection: {projection}
          </li>
        ))}
      </ul>
    </div>
  );
}
