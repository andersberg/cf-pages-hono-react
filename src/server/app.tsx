import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { items } from "../db/schema";
import { renderer } from "../renderer";

interface Bindings {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

// app.use(renderer);

app.get("/api", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.get("/api/data", async (c) => {
  const { DB } = c.env;
  const db = drizzle(c.env.DB);

  const result = await db.select().from(items).all();

  return c.json(result);
});

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
            <script type="module" src="/src/client.tsx"></script>
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
