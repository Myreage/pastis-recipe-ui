import { NavLink, Outlet } from "react-router";

export const App = () => {
  const linkStyle = (isActive: boolean) => {
    const baseStyle = "text-xl";

    if (isActive) {
      return baseStyle + " text-orange-600";
    }
    return baseStyle;
  };
  return (
    <div>
      <div className="flex p-3 gap-5 items-center">
        <div className="w-10 h-10 border-1 rounded-full text-center flex items-center justify-center">
          PR
        </div>
        <NavLink to="/" className={({ isActive }) => linkStyle(isActive)}>
          Home
        </NavLink>
        <NavLink
          to="/my-recipes"
          className={({ isActive }) => linkStyle(isActive)}
        >
          My Recipes
        </NavLink>
        <NavLink
          to="/discover"
          className={({ isActive }) => linkStyle(isActive)}
        >
          Discover
        </NavLink>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
