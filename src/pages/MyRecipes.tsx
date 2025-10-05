import { useQuery } from "react-query";
import { RecipeCard } from "../components/RecipeCard";
import { Link } from "react-router";
import { fetchRecipes } from "../api/fetchRecipes";

export const MyRecipes = () => {
  const recipes = useQuery("recipes", fetchRecipes);

  return (
    <div>
      <Link to="/new-recipe">
        <button className="bg-orange-600 rounded-full text-xl w-10 h-10 text-white hover:bg-orange-700 hover:cursor-pointer">
          +
        </button>
      </Link>
      <div className="flex gap-5 mt-5">
        <select name="maxDifficulty">
          <option value="">-- Max difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select name="minDifficulty">
          <option value="">-- Min difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select name="maxTime">
          <option value="">-- Max time</option>
          <option value="15">15mn</option>
          <option value="30">30mn</option>
          <option value="60">1h</option>
        </select>
        <select name="minTime">
          <option value="">-- Min time</option>
          <option value="15">15mn</option>
          <option value="30">30mn</option>
          <option value="60">1h</option>
        </select>
      </div>
      <div className="grid grid-cols-3 mt-5 gap-5">
        {recipes.data?.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`}>
            <RecipeCard
              key={recipe.id}
              difficulty={recipe.difficulty}
              name={recipe.name}
              tags={recipe.tags}
              timeInMinutes={recipe.timeInMinutes}
              imageUrl="https://media.istockphoto.com/id/177413384/fr/photo/p%C3%A2tes-alla-carbonara.jpg?s=612x612&w=0&k=20&c=2kua_mU_IWUrcEaU1MMBCwx-JdCNzzL1m4MtZsnl_L8="
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
