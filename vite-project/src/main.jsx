import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContextWrapper } from "./ContextWrapper.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </StrictMode>
);
