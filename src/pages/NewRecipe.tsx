import { useState } from "react";
import * as z from "zod";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

const createRecipeApi = async (input: {
  name: string;
  description: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  steps: {
    number: number;
    description: string;
  }[];
  difficulty: number;
  timeInMinutes: number;
  tags: string[];
}) => {
  const response = await fetch("http://localhost:3000/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const NewRecipe = () => {
  const navigate = useNavigate();

  const createRecipeMutation = useMutation({
    mutationFn: createRecipeApi,
    onSuccess: () => {
      navigate("/my-recipes");
    },
  });

  const [name, setName] = useState<string | undefined>();
  const [difficulty, setDifficulty] = useState<number | undefined>();
  const [timeInMinutes, setTimeInMinutes] = useState<number | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState<
    {
      id: number;
      name: string | undefined;
      quantity: number | undefined;
      unit: string | undefined;
    }[]
  >([]);
  const [steps, setSteps] = useState<
    { number: number; description: string | undefined }[]
  >([]);

  const handleSubmit = () => {
    const inputSchema = z.object({
      description: z.string(),
      difficulty: z.number(),
      name: z.string(),
      tags: z.array(z.string()),
      timeInMinutes: z.number(),
      ingredients: z.array(
        z.object({
          name: z.string(),
          quantity: z.number(),
          unit: z.string(),
        })
      ),
      steps: z.array(
        z.object({
          number: z.number(),
          description: z.string(),
        })
      ),
    });

    const parsedInput = inputSchema.parse({
      description,
      difficulty,
      ingredients,
      name,
      steps,
      tags,
      timeInMinutes,
    });
    createRecipeMutation.mutate(parsedInput);
  };

  return (
    <div className="w-1/2">
      <p className="text-2xl mb-5">New Recipe</p>
      <form>
        <div className="flex flex-col mb-5">
          <label className="text-lg">Name</label>
          <input
            className="rounded p-1 bg-white shadow-neutral-500 shadow-sm"
            type="text"
            required
            placeholder="Super spaghetti"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col mb-5">
            <label className="text-lg">Time (mn)</label>
            <input
              className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
              type="number"
              required
              onChange={(e) => setTimeInMinutes(e.target.valueAsNumber)}
              value={timeInMinutes}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-lg">Difficulty</label>
            <select
              className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
              required
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              value={difficulty}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mb-5">
          <label className="text-lg">Tags</label>
          <input
            className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
            type="text"
            required
            onChange={(e) => setTags(e.target.value.split(","))}
            value={tags.join(",")}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label className="text-lg">Description</label>
          <textarea
            placeholder="miam miam miam"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className="text-lg">Ingredients</label>
          {ingredients.map((ingredient, index) => {
            return (
              <div key={ingredient.id} className="flex mb-2 gap-2">
                <input
                  required
                  type="text"
                  placeholder="Ingredient"
                  className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  value={ingredient.name}
                />
                <input
                  required
                  type="number"
                  placeholder="Quantity"
                  className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].quantity = e.target.valueAsNumber;
                    setIngredients(newIngredients);
                  }}
                  value={ingredient.quantity}
                />
                <input
                  required
                  placeholder="Unit"
                  className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
                  type="text"
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unit = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  value={ingredient.unit}
                />
                <button
                  type="button"
                  className="bg-orange-500 rounded p-1 text-white text-sm"
                  onClick={() =>
                    setIngredients((prev) => {
                      const newIngredients = [...prev];
                      newIngredients.splice(index, 1);

                      return newIngredients;
                    })
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-orange-500 w-10 h-10 text-lg rounded-full text-white"
              onClick={() =>
                setIngredients((prev) => [
                  ...prev,
                  {
                    id: prev.length
                      ? Math.max(...prev.map((p) => p.id)) + 1
                      : 1,
                    quantity: undefined,
                    name: undefined,
                    unit: undefined,
                  },
                ])
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <label className="text-lg">Etapes</label>
          {steps.map((step, index) => {
            return (
              <div key={step.number} className="mb-5">
                <p>Etape {index + 1}</p>
                <textarea
                  placeholder="Faire bouillir le nanani avec le nanana"
                  onChange={(e) =>
                    setSteps((prev) => {
                      const newSteps = [...prev];
                      newSteps[index].description = e.target.value;
                      return newSteps;
                    })
                  }
                  value={step.description}
                  className="shadow-neutral-500 shadow-sm bg-white rounded p-1 w-full"
                />
                <button
                  type="button"
                  className="bg-orange-500 rounded p-1 text-white text-sm"
                  onClick={() =>
                    setSteps((prev) => {
                      const newSteps = [...prev];
                      newSteps.splice(index, 1);

                      return newSteps;
                    })
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-orange-500 w-10 h-10 text-lg rounded-full text-white"
              onClick={() =>
                setSteps((prev) => [
                  ...prev,
                  {
                    number: prev.length
                      ? Math.max(...prev.map((p) => p.number)) + 1
                      : 1,
                    description: undefined,
                  },
                ])
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-orange-500 rounded p-1 text-white text-lg"
            onClick={() => handleSubmit()}
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};
