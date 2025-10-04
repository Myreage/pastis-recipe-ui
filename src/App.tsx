import { Outlet } from "react-router";

export const App = () => {
  return (
    <div>
      <h1>Pastis Recipe</h1>
      <Outlet />
    </div>
  );
};
