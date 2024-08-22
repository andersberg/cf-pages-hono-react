import { useState } from "react";
import { Button } from "./Button";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold uppercase">Counter</h2>

      <Button onClick={() => setCount(count + 1)}>
        You clicked
        <span className="font-bold mx-[0.5ch]">{count}</span>
        times.
      </Button>
    </div>
  );
}
