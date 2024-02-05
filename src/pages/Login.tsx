import { Button } from "../components/core/Button";
import { FormInput } from "../components/core/FormInput";
import { CoreHeading } from "../components/core/CoreHeading";
import { Layout } from "../components/Layout";

type Props = {};

export function Login(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <form method="POST">
          <CoreHeading>Login</CoreHeading>

          <FormInput name="email" label="Email" />
          <FormInput name="password" label="Password" type="password" />

          <div class="flex justify-end">
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
