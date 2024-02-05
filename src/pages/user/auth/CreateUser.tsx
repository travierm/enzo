import { AlertMessage } from "@/core";
import { Button } from "../../../components/core/CoreButton";
import { CoreHeading } from "../../../components/core/CoreHeading";
import { FormInput } from "../../../components/core/CoreFormInput";
import { CoreAlertMessage } from "../../../components/core/CoreTemplateMessages";
import { Layout } from "../../../components/Layout";

type Props = {};

export function CreateUser(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <CoreHeading size="2xl">Create User</CoreHeading>
      </div>

      <div class="flex flex-col items-center justify-center">
        <form action="/user/create" method="POST">
          <FormInput label="Email" name="email" />
          <FormInput label="Password" name="password" type="password" />

          <Button className="mt-2">Create User</Button>
        </form>
      </div>
    </Layout>
  );
}
