# Enzo
Enzo is a cutting-edge web application framework designed to blend the best of both worlds: server-side rendering and the developer-friendly JSX templating. By shifting the majority of your application logic to the server-side, Enzo simplifies development workflows, reducing the complexity often introduced by client-side libraries such as React. Our goal is to retain the simplicity and component-based architecture of JSX, enhancing server-side development without sacrificing the power of modern web applications.

## The Power of HTMX for Interactivity
One of the hallmarks of modern web applications is their interactive and dynamic user interfaces. While React excels in managing UI updates through state changes, it encapsulates a complexity that can be daunting. Enzo introduces HTMX as the linchpin for interactivity, simplifying the way dynamic content is delivered and updated.

HTMX operates on a straightforward principle: it makes requests to the server in response to user interactions and swaps out the returned HTML into the current page's DOM. This approach not only simplifies development but also maintains the interactivity and responsiveness users expect, all without the overhead of traditional client-side frameworks.

## Ultra-Fast Performance with Bun
Speed is of the essence in web application performance. Enzo leverages Bun, a modern JavaScript runtime, to ensure your server-side logic executes swiftly. Bun optimizes request handling and provides an efficient TypeScript compilation process, making your development cycle faster and more productive. With Bun, Enzo offers a robust solution that meets the demands of high-performance web applications.

### Current Features
- File Router for components in `/src/pages`
- Form Alert Message system driven by the session
- Automatic Wrapping/Unwrapping of page components from the index.html

### Tech Stack
- [Hono](https://hono.dev) for routing
- [Preact](https://preactjs.com/guide/v10/server-side-rendering/) as a JSX templating engine
- [HTMX](https://htmx.org/) for frontend interactivity
- [Tailwind](https://tailwindcss.com/docs/utility-first) for styling
- [Zod](https://zod.dev/) for form validation
- Running on [Bun](https://bun.sh/)

### How to use

Clone repo
```bash
git clone https://github.com/travierm/enzo.git enzo
```

Install deps:
```bash
cd enzo/ && bun install
```

Clone .env.example
```bash
cp ./.env.example .env
```

To development server on localhost:3000:
```bash
bun dev
```

## Example Code

```ts
app.post("/login", async (c) => {
  const body = await validateForm(
    c,
    z.object({
      email: z.string(),
      password: z.string(),
    })
  );

  if (!body.success) {
    return c.redirect("/login");
  }

  try {
    await handleAuth(c, body.data.email, body.data.password);
  } catch (e) {
    await createAlert(c, {
      type: "error",
      message: "Invalid email or password",
    });

    return c.redirect("/login");
  }

  return c.redirect("/");
});
```

### Cavets

You must fully write out tailwind classes in order for Tailwind to pick them up on scan
```ts
// this works
export function Example() {
  const colorMap = {
    info: "bg-blue-600",
  };

  const color = colorMap["info"];

  return <div class={`${color}`}></div>
}

// this will fail to have classes generated for it
const color = 'blue';
return <div class={`bg-${color}-500`}> 
```