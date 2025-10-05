import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Router } from "./Router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </QueryClientProvider>,
);
