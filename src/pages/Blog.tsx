import { Counter } from "@/client/Counter";
import { Layout } from "../components/Layout";

export default function Blog() {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <h1 class="text-2xl mt-4">Blog Page</h1>

        <Counter name="My Counter" />
        <Counter name="My Counter2" />
      </div>
    </Layout>
  );
}
