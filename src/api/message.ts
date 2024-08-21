import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { Bindings } from "..";

const message = new Hono<{ Bindings: Bindings }>();

let text = "Hello, World!";

export const messageRoute = message
  .get("/", (c) => {
    return c.text(text);
  })
  .put(
    "/",
    zValidator(
      "json",
      z.object({
        text: z.string(),
      })
    ),
    async (c) => {
      const data = c.req.valid("json");
      text = data.text;

      return c.json({ text, success: true }, 201);
    }
  );

export type MessageRoute = typeof messageRoute;
