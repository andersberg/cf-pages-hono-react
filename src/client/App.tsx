import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { DisplayMessage } from "./components/Message/DisplayMessage";
import { EditMessage } from "./components/Message/EditMessage";

async function fetchData() {
  return await apiClient.data.$get().then((res) => res.json());
}

export function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Record<string, any>>();

  useEffect(() => {
    if (!data) {
      fetchData().then((data) => setData(data));
    }
  }, [data]);

  return (
    <div>
      <DisplayMessage />
      <EditMessage />

      <button onClick={() => setCount(count + 1)}>
        <span>You clicked {count} times.</span>
      </button>

      {data && <pre>Data: {JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
