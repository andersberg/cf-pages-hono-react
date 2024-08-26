import { AddMessage } from "./components/Message/AddMessage";
import { DisplayMessages } from "./components/Message/DisplayMessage";

export function App() {
  return (
    <div className="flex flex-col gap-4 p-6 min-h-svh bg-sky-200 text-neutral-900">
      <main className="w-full max-w-screen-md mx-auto space-y-6">
        <DisplayMessages />

        <AddMessage />
      </main>
    </div>
  );
}
