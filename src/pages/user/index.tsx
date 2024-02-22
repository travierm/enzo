import { Layout } from "@/components/Layout";
import { Heading } from "@/components/core/Heading";
import { useLoader } from "@/core";
import { userRepo } from "@/database/models/user/user.repo.drizzle";

export async function loader() {
  const users = await userRepo.listUsers();

  return {
    users,
  };
}

export function Index() {
  let data = useLoader<typeof loader>();

  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {data.users.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
