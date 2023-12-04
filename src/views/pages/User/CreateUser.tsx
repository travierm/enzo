import { CoreButton } from "../../components/core/CoreButton";
import { CoreHeading } from "../../components/core/CoreHeading";
import { CoreInputBlock } from "../../components/core/CoreInputBlock";
import { Layout } from "../Layout";

export function CreateUser() {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <CoreHeading size="2xl">Create User</CoreHeading>
      </div>

      <div class="flex items-center justify-center">
        <form action="/user/create" method="POST">
          <CoreInputBlock label="Email" name="email" />
          <CoreInputBlock label="Password" name="password" type="password" />

          <CoreButton className="mt-2">Create User</CoreButton>
        </form>
      </div>
    </Layout>
  );
}
