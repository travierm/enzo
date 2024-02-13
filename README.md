# Enzo
Enzo is a web application framework that mixes server side rendering with JSX templating. 

Moving most of your logic from the frontend to the backend reduces a lot of complexity introduced by libraries like React. The problem is most server side templates engines can't match the developer friendliness of JSX and its clean way of seperating UI into components.

So we're taking the best parts of React and using them exclusively on the server. But what about all the great interactivity that React gives us? This is where HTMX comes in.

React at a high level updates the dom based on state changes. The dom updating can be a bit of a blackbox that works great but isn't easy to understand or optimize for. HTMX works on a much simpler idea. When user interactions happen that require DOM updates, we fetch HTML from the server and replace DOM on the frontend. No diffing, no shadow dom. A predicatable system for creating interactive UI's. 

Using this new paradigm we're reducing complexity while keeping the developer friendliness of JSX and its clean way of seperating UI into components.

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