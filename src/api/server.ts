import { Hono } from "hono";
import { Bindings } from "..";
import { messageRoute } from "./message";

const api = new Hono<{ Bindings: Bindings }>();

export const apiRoute = api
  .get("/", (c) => c.text("Hello World!"))
  .route("/message", messageRoute);

export type ApiRoute = typeof apiRoute;
