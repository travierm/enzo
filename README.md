# Enzo
Enzo is a web application framework that focuses heavily on server side rendering through JSX templating. We use Preact as a server side JSX engine and also give you the ability to use Preact components on the frontend through Hydration.

To avoid page refreshes and add interactivity we lean on HTMX to handle updating the DOM as users interact with your application.

## Philosophy

Moving most of your logic from the frontend to the backend reduces a lot of complexity introduced by libraries like React. The problem is most server side templates engines can't match the developer friendliness of JSX and its clean way of seperating UI into components.

So we're taking the best parts of React and using them exclusively on the server. But what about all the great interactivity that React gives us? This is where HTMX comes in.

React at a high level updates the dom based on state changes. The dom updating can be a bit of a blackbox that works great but isn't easy to understand or optimize for. HTMX works on a much simpler idea. When user interactions happen that require DOM updates, we fetch HTML from the server and replace DOM on the frontend. No diffing, no shadow dom. A predicatable system for creating interactive UI's.

The last thing we need is an ultra fast runtime to make all this server side logic run as fast as possible. There is where Bun comes in. Bun will keep request times down and make working with and compiling typescript code a breeze.

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
```tsx
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

## Client Side Hydration

Create a component and let Enzo know you will need it hydrated
```tsx
import { applyHydration } from "@/core/applyHydration";
import { useState } from "preact/hooks";

type Props = {
  name: string;
};

const CounterComponent = (props: Props) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export const Counter = applyHydration(CounterComponent);
```

Add you client side component to your server side page

Note: You will be limited to passing props that can be parsed via JSON.parse on the client side.
Functions for instance can not be passed in as a prop.
```tsx
export default function Blog() {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <h1 class="text-2xl mt-4">Blog Page</h1>

        <Counter name="My Counter" />
        <Counter name="My Counter2" />
      </div>
    </Layout>
  );
}
```

Tell your client to hydrate the component
```ts
import { Counter } from "./Counter";
import { hydrateComponent } from "@/core/applyHydration";

hydrateComponent(Counter);

document.addEventListener("htmx:afterSwap", () => {
  // hydrate components after htmx swaps
  hydrateComponent(Counter);
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