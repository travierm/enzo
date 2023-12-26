import { CoreButton } from "../../components/core/CoreButton";
import { CoreFormInput } from "../../components/core/CoreFormInput";

type Props = {
  currentBalance: number;
};

export function AccountBalance(props: Props) {
  return (
    <div id="accountBalance" class="shadow-md sm:rounded max-w-xl">
      <div>Account Balance: {props.currentBalance}</div>
      <form
        hx-post="/dashboard/account-balance"
        hx-target="#accountBalance"
        hx-swap="outerHTML"
        class="p-2"
      >
        <CoreFormInput
          label="Account Balance"
          name="balance"
          type="number"
          placeholder="$"
        />

        <CoreButton>Update</CoreButton>
      </form>
    </div>
  );
}
