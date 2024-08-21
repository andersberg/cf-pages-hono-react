import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { Bindings } from "..";
import { items } from "../db/schema";
import { messageRoute } from "./message";

const api = new Hono<{ Bindings: Bindings }>();

export const apiRoute = api
  .get("/", (c) => {
    return c.json({ message: "Hello, World!" });
  })
  .route("/message", messageRoute)
  .get("/data", async (c) => {
    const db = drizzle(c.env.DB);

    const result = await db.select().from(items).all();

    return c.json(result);
  });

export type ApiRoute = typeof apiRoute;
