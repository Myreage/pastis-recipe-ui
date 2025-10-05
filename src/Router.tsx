import { Route, Routes } from "react-router";
import { App } from "./App";
import { Home } from "./pages/Home";
import { MyRecipes } from "./pages/MyRecipes";
import { Discover } from "./pages/Discover";
import { NewRecipe } from "./pages/NewRecipe";

export const Router = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="my-recipes" element={<MyRecipes />} />
        <Route path="discover" element={<Discover />} />
        <Route path="new-recipe" element={<NewRecipe />} />
      </Route>
    </Routes>
  );
};
