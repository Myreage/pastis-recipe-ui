export const createRecipe = async (input: {
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
