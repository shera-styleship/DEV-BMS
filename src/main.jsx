import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

console.log(
  "%cStyleship Business Management System",
  "color: rgb(255,255,255); background: rgb(255,69,0); font-size: 30px; font-weight: bold; padding: 4px 8px; border-radius: 5px;"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

