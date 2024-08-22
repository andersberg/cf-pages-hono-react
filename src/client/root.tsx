import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { App } from "./App";

export const queryClient = new QueryClient();

export function Root() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <ReactQueryDevtools client={queryClient} />
    </React.StrictMode>
  );
}
