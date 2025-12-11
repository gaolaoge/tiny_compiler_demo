import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TinyCompilerDemo } from "tiny-compiler-demo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <TinyCompilerDemo />
  </StrictMode>
);
