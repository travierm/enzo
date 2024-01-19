import { RecordWithAmountUSD } from "@/database/models/record/record.repo.drizzle";

type Props = {
  expenses: RecordWithAmountUSD[];
};

export function ExpensesTable(props: Props) {
  return (
    <div
      id="expenseTable"
      class="relative overflow-x-auto shadow-md sm:rounded"
    >
      <form
        id="expenseTableForm"
        hx-post="/dashboard/expense"
        hx-target="#dashboard-root"
        hx-swap="outerHTML"
      >
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-orange-500">
            <tr>
              <th class="pl-2">expense</th>
              <th>Cost</th>
              <th class="pr-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {props.expenses.map((expense) => (
              <tr>
                <td class="pl-2">{expense.name}</td>
                <td>{expense.amountUSD}</td>
                <td>
                  <a
                    hx-delete={`/dashboard/expense/${expense.id}`}
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
                  placeholder="Add Expense"
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
