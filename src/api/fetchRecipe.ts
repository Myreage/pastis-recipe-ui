import * as z from "zod";

export const fetchRecipe = async (id: string) => {
  const response = await fetch(`http://localhost:3000/recipes/${id}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = await response.json();

  const schema = z.object({
    id: z.string(),
    name: z.string(),
    difficulty: z.number(),
    tags: z.array(z.string()),
    timeInMinutes: z.number(),
    description: z.string(),
    steps: z.array(
      z.object({
        description: z.string(),
        number: z.number(),
      })
    ),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
      })
    ),
  });

  return schema.parse(data);
};
