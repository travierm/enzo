import { Layout } from "@/components/Layout";
import { Button } from "@/components/core/Button";
import { FormInput } from "@/components/core/FormInput";
import { Heading } from "@/components/core/Heading";

type Props = {};

export default function CreateUser(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <Heading size="2xl">User Index</Heading>
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
