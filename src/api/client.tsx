import { hc } from "hono/client";
import { ApiRoute } from "./server";

export const apiClient = hc<ApiRoute>("/api");
