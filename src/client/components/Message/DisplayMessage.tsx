import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";

async function fetchMessage() {
  return await apiClient.message.$get().then((res) => res.text());
}

export const messageQueryOptions = queryOptions({
  queryKey: ["message"],
  queryFn: fetchMessage,
});

export function DisplayMessage() {
  const message = useQuery(messageQueryOptions);

  if (message.isLoading) {
    return <p>Loading...</p>;
  }

  if (message.isError) {
    return <p>Error: {message.error.message}</p>;
  }

  return (
    <h1 className="text-2xl font-bold uppercase my-4">
      Message: {message.data}
    </h1>
  );
}
