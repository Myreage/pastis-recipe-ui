import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { fetchRecipe } from "../api/fetchRecipe";
import { deleteRecipe } from "../api/deleteRecipe";

export const Recipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    throw new Error("Missing id");
  }

  const recipe = useQuery("recipe", () => fetchRecipe(id));

  const deleteRecipeMutation = useMutation("deleteRecipe", {
    mutationFn: () => deleteRecipe(id),
    onSettled: () => {
      navigate("/my-recipes");
    },
  });

  const recipeData = recipe.data;

  if (!recipeData) {
    return;
  }

  const {
    description,
    difficulty,
    ingredients,
    name,
    steps,
    tags,
    timeInMinutes,
  } = recipeData;

  return (
    <div>
      <div className="flex gap-5">
        <p className="text-2xl">{name}</p>
        <button
          title="Delete"
          className="hover:cursor-pointer"
          onClick={() => deleteRecipeMutation.mutate()}
        >
          🗑️
        </button>
      </div>
      <img
        className="h-100 w-full mt-2 mb-2 object-cover rounded"
        src={
          "https://media.istockphoto.com/id/177413384/fr/photo/p%C3%A2tes-alla-carbonara.jpg?s=612x612&w=0&k=20&c=2kua_mU_IWUrcEaU1MMBCwx-JdCNzzL1m4MtZsnl_L8="
        }
      />
      <div className="flex justify-between px-3 w-1/2">
        <p>🔪 {difficulty}/5</p>
        <p>🕛 {timeInMinutes}mn</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <div className="rounded-xl px-2 bg-gray-200">{tag}</div>
          ))}
        </div>
      </div>

      <p className="mt-10 mb-10">{description}</p>
      <p className="text-lg">Ingredients</p>
      {ingredients.map((ingredient) => (
        <div>
          <p>
            - {ingredient.name}: {ingredient.quantity}
            {ingredient.unit}
          </p>
        </div>
      ))}
      <p className="text-lg mt-10">Etapes</p>
      {steps.map((step, index) => (
        <p>
          {index + 1} - {step.description}
        </p>
      ))}
    </div>
  );
};
