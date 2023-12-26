import { AlertMessage } from "enzo/core";
import { CoreHeading } from "../../components/core/CoreHeading";
import { Layout } from "../Layout";
import { Expense, ExpensesTable } from "./ExpensesTable";
import { Income, IncomeTable } from "./IncomeTable";
import { Stats } from "./Stats";

type Props = {
  alertMessage?: AlertMessage;
  income: Income[];
  expenses: Expense[];
};

const expenses: Expense[] = [
  { name: "Rent", amount: 1000 },
  { name: "Car", amount: 500 },
  { name: "Food", amount: 300 },
];

export function Dashboard(props: Props) {
  return (
    <Layout>
      <div class="flex items-center">
        <CoreHeading size="2xl">Dashboard</CoreHeading>
      </div>

      <div class="grid grid-cols-4 gap-4 mx-4">
        <div>
          <ExpensesTable expenses={expenses} />
        </div>

        <div>
          <IncomeTable income={props.income} />
        </div>

        <div>
          <Stats income={props.income} expenses={expenses} />
        </div>
      </div>
    </Layout>
  );
}
