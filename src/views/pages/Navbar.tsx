type Props = {
  isAuthed: boolean;
};

export function Navbar(props: Props) {
  const { isAuthed = false } = props;

  const loginButton = isAuthed ? (
    <a href="/logout">Logout</a>
  ) : (
    <a href="/login">Login</a>
  );

  return (
    <nav class="bg-blue-700 flex p-2 text-white text-xl">
      <div class="mr-4">Bun+Preact</div>

      {isAuthed && (
        <div class="flex gap-2 mr-2">
          <a href="/transaction/create">New</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
        </div>
      )}

      <div class="flex ml-auto">{loginButton}</div>
    </nav>
  );
}
