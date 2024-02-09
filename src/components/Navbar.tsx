type Props = {
  isAuthed: boolean;
};

export function Navbar(props: Props) {
  const { isAuthed } = props;

  return (
    <nav class="bg-blue-700 flex p-3 text-white text-2xl">
      <div class="mr-4">Enzo</div>

      <div hx-boost="true">
        {isAuthed && (
          <div>
            <a href="/" class="mr-4">
              Home
            </a>
            <a href="/blog" class="mr-4">
              Blog
            </a>

            {isAuthed ? (
              <a href="/logout" class="mr-4">
                Logout
              </a>
            ) : (
              <a href="/login" class="mr-4">
                Login
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
