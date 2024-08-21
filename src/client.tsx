import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

async function fetchData(): Promise<Record<string, string>> {
  return await fetch("/api/data").then((res) => res.json());
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Record<string, string>>();

  useEffect(() => {
    fetchData().then((data) => setData(data));
  });

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {data && <pre>Data: {JSON.stringify(data)}</pre>}
    </div>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
