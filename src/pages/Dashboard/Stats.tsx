import { RecordTable } from "@/database/models/record/record.model.drizzle";
import { formatNumberToUSD } from "@/database/utils/formatter";

const safePercentage = (numerator: number, denominator: number) => {
  if (denominator === 0) {
    return 0;
  }

  return Math.round((numerator / denominator) * 100);
}

type Props = {
  currentBalance: number;
  income: RecordTable[];
  expenses: RecordTable[];
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

  const incomeRatio = safePercentage(totalExpense, totalIncome);
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
    <div class="relative overflow-x-auto shadow-md sm:rounded">
      <ul class="w-full text-sm text-left text-gray-500 p-2">
        <li>Total Income: {formatNumberToUSD(totalIncome)}</li>
        <li>Total Expenses: {formatNumberToUSD(totalExpense)}</li>
        <li>Monthly Net Profit: {formatNumberToUSD(monthyNetProfit)}</li>
        <li>Expense to Income Ration: {incomeRatio}%</li>
        {monthlyProjections.map((projection, index) => (
          <li>
            {index + 1} Month Projection: {formatNumberToUSD(projection)}
          </li>
        ))}
      </ul>
    </div>
  );
}
