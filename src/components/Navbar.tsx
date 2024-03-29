import { LinkDropdown } from "./core/LinkDropdown";

type Props = {
  isAuthed: boolean;
};

export function Navbar(props: Props) {
  const { isAuthed } = props;

  return (
    <nav class="bg-blue-700 flex p-3 text-white text-2xl">
      <div class="mr-4">Enzo</div>

      <div hx-boost="true" class="flex w-full">
        {isAuthed && <NavbarPageLinks />}

        <div class="ml-auto">
          <NavbarAuthLink isAuthed={isAuthed} />
        </div>
      </div>
    </nav>
  );
}

function NavbarAuthLink(props: Props) {
  if (props.isAuthed) {
    return <a href="/logout">Logout</a>;
  } else {
    return <a href="/login">Login</a>;
  }
}

function NavbarPageLinks() {
  const links = [
    { href: "/user", text: "All Users" },
    { href: "/user/create", text: "Create User" },
  ];

  return (
    <>
      <a href="/" class="mr-4">
        Home
      </a>
      <a href="/blog" class="mr-4">
        Blog
      </a>
      <LinkDropdown text="Users" links={links} />
    </>
  );
}
