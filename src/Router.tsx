import { Route, Routes } from "react-router";
import { About } from "./pages/About";
import { App } from "./App";
import { Home } from "./pages/Home";

export const Router = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};
