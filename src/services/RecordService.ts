import {
  createRecord,
  getFirstRecordByType,
  getRecordsByType,
} from "@/database/models/record/record.repo.drizzle";
import { Service } from "typedi";

@Service()
export class RecordService {
  async getDashboardProps() {
    const expenses = await getRecordsByType("expense");
    const income = await getRecordsByType("income");
    const currentBalance =
      (await getFirstRecordByType("currentBalance"))?.amount || 0;

    return {
      expenses,
      income,
      currentBalance,
    };
  }

  async updateAccountBalance(amount: number) {
    amount = amount < 0 ? Math.ceil(amount) : Math.floor(amount);

    await createRecord({
      name: "Account Balance",
      amount: amount,
      type: "currentBalance",
    });
  }
}
