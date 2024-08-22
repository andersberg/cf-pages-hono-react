import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/client";
import { queryClient } from "../../root";
import { messageQueryOptions } from "./DisplayMessage";
const MESSAGE_INPUT_ID = "message-input";

async function updateMessage(text: string) {
  return await apiClient.message
    .$put({ json: { text } })
    .then((res) => res.json());
}

export function EditMessage() {
  const message = useQuery(messageQueryOptions);
  const mutate = useMutation({
    mutationFn: updateMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(messageQueryOptions);
    },
  });

  if (message.isLoading) {
    return <p>Loading...</p>;
  }

  if (message.isError) {
    return <p>Error: {message.error.message}</p>;
  }

  const text = message.data;

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit", event);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const input = formData.get(MESSAGE_INPUT_ID);
        console.log({ input });

        if (typeof input === "string") {
          mutate.mutate(input);
        }
      }}
    >
      <input
        id={MESSAGE_INPUT_ID}
        type="text"
        defaultValue={text}
        placeholder={text}
      />
      <button type="submit">Update Message</button>
    </form>
  );
}
