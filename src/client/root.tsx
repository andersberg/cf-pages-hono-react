import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { App } from "./App";
import { queryClient } from "./queries";

export function Root() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      {import.meta.env.DEV && <ReactQueryDevtools client={queryClient} />}
    </React.StrictMode>
  );
}
