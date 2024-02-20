import { Layout } from "@/components/Layout";
import { RequestContext } from "@/core";
import { FC, useContext } from "hono/jsx";

export const UserById: FC = () => {
  const context = useContext(RequestContext);
  const id = context?.req.param("id") ?? "";

  return (
    <Layout>
      <div class="flex items-center justify-center">
        <div class="mt-4 text-2xl">User #{id}</div>
      </div>
    </Layout>
  );
};
