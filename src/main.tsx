import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Router } from "./Router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
