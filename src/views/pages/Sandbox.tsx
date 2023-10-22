import { Counter } from "../components/Counter";
import { Layout } from "../components/Layout";

export function Sandbox() {
    return (
      <Layout>
        <h1 class="text-2xl">Sandbox</h1>
        <Counter initCount={5} incrementor={(num) => num + 5}  />
      </Layout>
    );
}

