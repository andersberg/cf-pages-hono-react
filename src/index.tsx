import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { Fragment } from "react/jsx-runtime";
import { apiRoute } from "./api/server";

export interface Bindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

export default app.route("/api", apiRoute).get("/", (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/static/global.css" rel="stylesheet" />
          {import.meta.env.PROD ? (
            <Fragment>
              <link href="/client.css" rel="stylesheet" />
              <script type="module" src="/client.entry.js" defer />
            </Fragment>
          ) : (
            <script type="module" src="/src/client.entry.tsx" />
          )}
        </head>
        <body>
          <div id="root" />
        </body>
      </html>
    )
  );
});
