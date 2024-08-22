import { Counter } from "./components/Counter";
import { AddMessage } from "./components/Message/AddMessage";
import { DisplayMessages } from "./components/Message/DisplayMessage";

export function App() {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-2xl p-6 min-h-svh bg-sky-200 text-neutral-900">
      <DisplayMessages />

      <AddMessage />
    </div>
  );
}
