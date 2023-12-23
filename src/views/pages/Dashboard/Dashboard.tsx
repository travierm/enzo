import { TemplateMessage } from "enzo/core";
import { CoreButton } from "../../components/core/CoreButton";
import { CoreHeading } from "../../components/core/CoreHeading";
import { CoreFormInput } from "../../components/core/CoreFormInput";
import { CoreTemplateMessage } from "../../components/core/CoreTemplateMessages";
import { Layout } from "../Layout";

type Props = {
  templateMessage?: TemplateMessage;
};

export function Dashboard(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <CoreHeading size="2xl">Dashboard</CoreHeading>
      </div>

      <div class="flex flex-col items-center justify-center">
        {props.templateMessage && (
          <CoreTemplateMessage templateMessage={props.templateMessage} />
        )}

        <form action="/user/create" method="POST">
          <CoreFormInput label="Email" name="email" />
          <CoreFormInput label="Password" name="password" type="password" />

          <CoreButton className="mt-2">Create User</CoreButton>
        </form>
      </div>
    </Layout>
  );
}
