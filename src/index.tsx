import { VNode } from "preact";

type Props = {
  children: VNode;
};

export function Index(props: Props) {
  return (
    <html lang="en">
      <head>
        <title>Enzo</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/public/app.css" rel="stylesheet" />
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        ></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/debug.js"></script>
        <script src="/public/app.js"></script>
      </head>
      <body>
        <div id="root"></div>
        {props.children}
      </body>
    </html>
  );
}
