import { CoreButton } from "@/components/core/CoreButton";
import { CoreFormInput } from "@/components/core/CoreFormInput";
import { formatNumberToUSD } from "@/database/utils/formatter";

type Props = {
  currentBalance: number;
};

export function AccountBalance(props: Props) {
  const currentBalance = formatNumberToUSD(props.currentBalance);

  return (
    <div id="accountBalance" class="shadow-md sm:rounded max-w-xl">
      <div>Current Balance: {currentBalance}</div>
      <form
        hx-post="/dashboard/account-balance"
        hx-target="#dashboard-root"
        hx-swap="outerHTML"
        class="p-2"
      >
        <CoreFormInput
          label="Current Balance"
          name="balance"
          type="text"
          placeholder="$"
          className="mask-usd"
          value={currentBalance}
        />

        <CoreButton>Update</CoreButton>
      </form>
    </div>
  );
}
