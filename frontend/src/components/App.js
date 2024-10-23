import { createRoot } from "react-dom/client";
import HomePage from "./RoutePage";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import RoutePage from "./RoutePage";

const App = () => {
  return <RoutePage />;
};

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
