import ReactDOM from "react-dom/client";
import { Root } from "./client/root";
import "./style.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Root />);
}
