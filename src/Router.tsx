import { Route, Routes } from "react-router";
import { App } from "./App";
import { Home } from "./pages/Home";
import { MyRecipes } from "./pages/MyRecipes";
import { Discover } from "./pages/Discover";
import { Recipe } from "./pages/Recipe";
import { NewRecipeContainer } from "./pages/NewRecipeContainer";

export const Router = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="my-recipes" element={<MyRecipes />} />
        <Route path="discover" element={<Discover />} />
        <Route path="new-recipe" element={<NewRecipeContainer />} />
        <Route path="recipe/:id" element={<Recipe />} />
      </Route>
    </Routes>
  );
};
