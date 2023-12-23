type Props = {
  income: Income[];
};

export type Income = {
  name: string;
  amount: number;
};

export function IncomeTable(props: Props) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-green-500">
          <tr>
            <th class="pl-2">Name</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {props.income.map((income) => (
            <tr>
              <td class="pl-2">{income.name}</td>
              <td>{income.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
