# Enzo

### Features
- JSX templating
- Preact component hydration
- MVC folder structure

### Tech Stack
- Hono for routing
- Preact as a JSX templating engine
- HTMX for frontend interactivity
- Tailwind for styling
- Running on Bun

### How to use
Install deps:

```bash
bun install
```

To run:

```bash
bun dev
```


## Framework Documentation

### Request Validation

```ts
import { Context, Hono } from "hono";

const app = new Hono();

app.post(
  "/user/create",
  zValidator(
    "form", // set the data type to validate
    z.object({ // define the Zod type contraints
      email: z.string().min(100),
      password: z.string().max(1),
    }),
    // hook to handle when validation fails
    (result, c) => {
      // let page component display errors to the user
      return handleZodErrors(c, result, CreateUser)
    }
  ),
  async (c) => {
    const body  = c.req.valid('form')

    return renderComponent(c, <CreateUser />);
  }
);
```


```jsx
type Props = {
  alertMessage?: AlertMessage;
};

export function CreateUser(props: Props) {
  return (
    <Layout>
      <div class="flex items-center justify-center">
        <CoreHeading size="2xl">Create User</CoreHeading>
      </div>

      <div class="flex flex-col items-center justify-center">
         { props.templateMessage && <CoreTemplateMessage templateMessage={props.templateMessage} /> }

        <form action="/user/create" method="POST">
          <CoreInputBlock label="Email" name="email" />
          <CoreInputBlock label="Password" name="password" type="password" />

          <CoreButton className="mt-2">Create User</CoreButton>
        </form>
      </div>
    </Layout>
  );
}
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