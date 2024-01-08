import { AlertMessage } from "enzo/core";
import { CoreHeading } from "../../components/core/CoreHeading";
import { Layout } from "../Layout";
import { ExpensesTable } from "./ExpensesTable";
import { IncomeTable } from "./IncomeTable";
import { Stats } from "./Stats";
import { AccountBalance } from "./AccountBalance";
import { TransformedRecord } from "@/database/models/record/record.model";

type Props = {
  alertMessage?: AlertMessage;
  income: TransformedRecord[];
  expenses: TransformedRecord[];
  currentBalance: number;
};

export function Dashboard(props: Props) {
  return (
    <Layout id="dashboard-root">
      <div class="flex items-center">
        <CoreHeading size="2xl">Dashboard</CoreHeading>
      </div>

      <div class="grid grid-cols-4 gap-4 mx-4">
        <div>
          <ExpensesTable expenses={props.expenses} />
        </div>

        <div>
          <IncomeTable income={props.income} />
        </div>

        <div>
          <AccountBalance currentBalance={props.currentBalance} />
          <Stats
            currentBalance={props.currentBalance}
            income={props.income}
            expenses={props.expenses}
          />
        </div>
      </div>
    </Layout>
  );
}
