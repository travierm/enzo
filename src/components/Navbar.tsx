type Props = {
  isAuthed: boolean;
};

export function Navbar(props: Props) {
  // const { isAuthed = true } = props;
  let isAuthed = true;

  const loginButton = isAuthed ? (
    <a href="/logout">Logout</a>
  ) : (
    <a href="/login">Login</a>
  );

  return (
    <nav class="bg-blue-700 flex p-2 text-white text-xl">
      <div class="mr-4">Enzo</div>
    </nav>
  );
}
