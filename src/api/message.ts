import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { z } from "zod";
import { Bindings } from "..";
import { messageSchema } from "../db/schema";

const message = new Hono<{ Bindings: Bindings }>();

const addMessageSchema = z.object({ message: z.string() });

export const messageRoute = message
  .get("/", async (c) => {
    const db = drizzle(c.env.DB);

    const result = await db.select().from(messageSchema).all();

    return c.json(result);
  })
  .post("/", zValidator("json", addMessageSchema), async (c) => {
    const data = c.req.valid("json");

    const db = drizzle(c.env.DB);

    const result = await db
      .insert(messageSchema)
      .values({ message: data.message })
      .returning();

    return c.json(
      {
        ...result,
        success: true,
      },
      201
    );
  });

export type MessageRoute = typeof messageRoute;
