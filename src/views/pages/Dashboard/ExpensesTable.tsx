type Props = {
  expenses: Expense[];
};

export type Expense = {
  name: string;
  amount: number;
};

export function ExpensesTable(props: Props) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-orange-500">
          <tr>
            <th class="pl-2">Expense</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {props.expenses.map((expense) => (
            <tr>
              <td class="pl-2">{expense.name}</td>
              <td>{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
