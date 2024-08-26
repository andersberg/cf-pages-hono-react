import { apiClient } from "@/api/client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queries";
import { Button } from "../Button";
import { Input } from "../Input";
import { messageQueryOptions } from "./DisplayMessage";

const MESSAGE_INPUT_ID = "message-input";

async function updateMessage(text: string) {
  return await apiClient.message
    .$post({ json: { message: text } })
    .then((res) => res.json());
}

export function AddMessage() {
  const mutate = useMutation({
    mutationFn: updateMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(messageQueryOptions);
    },
  });

  return (
    <form
      className="flex w-full max-w-xl gap-2"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const input = formData.get(MESSAGE_INPUT_ID);

        if (typeof input === "string") {
          mutate.mutate(input);
        }

        event.currentTarget.reset();
      }}
    >
      <Input
        id={MESSAGE_INPUT_ID}
        name={MESSAGE_INPUT_ID}
        type="text"
        placeholder="Enter a message"
        className="grow"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
