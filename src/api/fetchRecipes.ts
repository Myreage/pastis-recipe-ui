import * as z from "zod";

export const fetchRecipes = async () => {
  const url = "http://localhost:3000/recipes";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = await response.json();

  const schema = z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      difficulty: z.number(),
      tags: z.array(z.string()),
      timeInMinutes: z.number(),
    })
  );

  return schema.parse(data);
};
