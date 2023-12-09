import { TemplateMessage } from "../../framework/globalProps";
import { CoreButton } from "../components/core/CoreButton";
import { CoreFormInput } from "../components/core/CoreFormInput";
import { CoreHeading } from "../components/core/CoreHeading";
import { CoreTemplateMessage } from "../components/core/CoreTemplateMessages";
import { Layout } from "./Layout";

type Props = {
  templateMessage?: TemplateMessage;
};

export function Login(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <form method="POST">
          <CoreHeading>Login</CoreHeading>

          {props.templateMessage && (
            <CoreTemplateMessage templateMessage={props.templateMessage} />
          )}

          <CoreFormInput name="email" label="Email" />
          <CoreFormInput name="password" label="Password" type="password" />

          <div class="flex justify-end">
            <CoreButton>Login</CoreButton>
          </div>
        </form>
      </div>
    </Layout>
  );
}
