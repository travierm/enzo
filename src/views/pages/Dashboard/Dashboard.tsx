import { AlertMessage } from "enzo/core";
import { CoreHeading } from "../../components/core/CoreHeading";
import { Layout } from "../Layout";
import { Expense, ExpensesTable } from "./ExpensesTable";
import { Income, IncomeTable } from "./IncomeTable";

type Props = {
  alertMessage?: AlertMessage;
};

const expenses: Expense[] = [
  { name: "Rent", amount: 1000 },
  { name: "Car", amount: 500 },
  { name: "Food", amount: 300 },
];

const income: Income[] = [
  { name: "Job", amount: 7000 },
  { name: "Side Hustle", amount: 500 },
];

export function Dashboard(props: Props) {
  return (
    <Layout>
      <div class="flex items-center">
        <CoreHeading size="2xl">Dashboard</CoreHeading>
      </div>

      <div class="grid grid-cols-4 gap-4 mx-4">
        {/* Expenses */}
        <div>
          <h1>Expenses</h1>

          <ExpensesTable expenses={expenses} />
        </div>

        <div>
          <h1>Income</h1>

          <IncomeTable income={income} />
        </div>
      </div>
    </Layout>
  );
}
