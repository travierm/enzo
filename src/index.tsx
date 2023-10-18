import { VNode } from 'preact';

type Props = {
  children: VNode;
};

export function Index(props: Props) {
  return (
    <html lang="en">
      <head>
        <title>Test</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/public/app.css" rel="stylesheet" />
      </head>
      <body>
        <div id="root"></div>
        {props.children}

        <script src="/public/index.js"></script>
      </body>
    </html>
  );
}
