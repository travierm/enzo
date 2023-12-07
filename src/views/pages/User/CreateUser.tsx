import { ErrorBag } from "../../../framework/globalProps";
import { CoreButton } from "../../components/core/CoreButton";
import { CoreFormErrors } from "../../components/core/CoreFormErrors";
import { CoreHeading } from "../../components/core/CoreHeading";
import { CoreInputBlock } from "../../components/core/CoreInputBlock";
import { Layout } from "../Layout";

type Props = {
  errorBag?: ErrorBag;
};

export function CreateUser(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <CoreHeading size="2xl">Create User</CoreHeading>
      </div>

      <div class="flex flex-col items-center justify-center">
        <CoreFormErrors errorBag={props.errorBag} />

        <form action="/user/create" method="POST">
          <CoreInputBlock label="Email" name="email" />
          <CoreInputBlock label="Password" name="password" type="password" />

          <CoreButton className="mt-2">Create User</CoreButton>
        </form>
      </div>
    </Layout>
  );
}
