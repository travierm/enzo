import { RequestContext } from "@/core";
import { Layout } from "../components/Layout";
import { useContext } from "preact/hooks";

export default function Home() {
  const context = useContext(RequestContext);
  const id = context?.req.param("id") ?? "";

  return (
    <Layout>
      <div class="flex items-center justify-center">
        <h1 class="text-2xl mt-4">Home Page</h1>
      </div>
    </Layout>
  );
}
