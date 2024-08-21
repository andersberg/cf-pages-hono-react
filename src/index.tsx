import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { apiRoute } from "./api/server";

export interface Bindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api", apiRoute);

app.get("/", (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/static/style.css" rel="stylesheet" />
          {import.meta.env.PROD ? (
            <script type="module" src="/client.js"></script>
          ) : (
            <script type="module" src="/src/client.entry.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

export default app;
