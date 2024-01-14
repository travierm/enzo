import { RecordWithAmountUSD } from "@/database/models/record/record.repo.drizzle";

type Props = {
  income: RecordWithAmountUSD[];
};

export type Income = {
  id: number;
  name: string;
  amount: number;
};

export function IncomeTable(props: Props) {
  return (
    <div id="incomeTable" class="relative overflow-x-auto shadow-md sm:rounded">
      <form
        id="incomeTableForm"
        hx-post="/dashboard/income"
        hx-target="#dashboard-root"
        hx-swap="outerHTML"
      >
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-green-500">
            <tr>
              <th class="pl-2">Income</th>
              <th>Cost</th>
              <th class="pr-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {props.income.map((income) => (
              <tr>
                <td class="pl-2">{income.name}</td>
                <td>{income.amountUSD}</td>
                <td>
                  <a
                    hx-delete={`/dashboard/income/${income.id}`}
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}

            <tr>
              <td class="whitespace-nowrap">
                <input
                  name="name"
                  type="text"
                  class="pl-2 mt-1 block w-full"
                  placeholder="Add Income"
                />
              </td>
              <td class="whitespace-nowrap">
                <input
                  name="amount"
                  type="text"
                  class="form-input mt-1 block w-full"
                  placeholder="Cost"
                />
              </td>
              <td>
                <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
