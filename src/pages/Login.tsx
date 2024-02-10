import { Button } from "../components/core/Button";
import { FormInput } from "../components/core/FormInput";
import { Heading } from "../components/core/Heading";
import { Layout } from "../components/Layout";
import { AlertHandler } from "@/components/core/AlertHandler";

export function Login() {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <form method="POST">
          <Heading>Login</Heading>

          <AlertHandler />

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
