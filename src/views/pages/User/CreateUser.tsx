import { CoreButton } from "../../components/core/CoreButton";
import { CoreInputBlock } from "../../components/core/CoreInputBlock";
import { Layout } from "../Layout";

export function CreateUser() {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <h1 class="text-2xl mt-4">Create User</h1>
      </div>

      <div class="flex items-center justify-center">
        <form>
          <CoreInputBlock label="Email" name="email" />
          <CoreInputBlock label="Password" name="password" type="password" />

          <CoreButton className="mt-2">Create User</CoreButton>
        </form>
      </div>
    </Layout>
  );
}
