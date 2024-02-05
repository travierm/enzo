type Props = {
  isAuthed: boolean;
};

export function Navbar(props: Props) {
  // const { isAuthed = true } = props;

  return (
    <nav class="bg-blue-700 flex p-3 text-white text-2xl">
      <div class="mr-4">Enzo</div>

      <div hx-boost="true">
        <a href="/" class="mr-4">
          Home
        </a>
        <a href="/blog" class="mr-4">
          Blog
        </a>
      </div>
    </nav>
  );
}
