import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";

async function fetchMessage() {
  return await apiClient.message.$get().then((res) => res.json());
}

export const messageQueryOptions = queryOptions({
  queryKey: ["message"],
  queryFn: fetchMessage,
});

export function DisplayMessages() {
  const message = useQuery(messageQueryOptions);

  if (message.isLoading) {
    return <p>Loading...</p>;
  }

  if (message.isError) {
    return <p>Error: {message.error.message}</p>;
  }

  return (
    <div className="w-full">
      <h2 className="my-4 text-2xl font-bold uppercase">Messages</h2>

      <ul className="divide-y divide-neutral-500">
        {message.data?.map((item) => (
          <li key={item.id} className="py-2">
            <p>{item.message}</p>
            <p className="italic font-light">
              {new Date(item.timestamp).toLocaleString("sv-SE")}
            </p>
          </li>
        ))}
      </ul>

      <p>Number of messages: {message.data?.length}</p>
    </div>
  );
}
