export const deleteRecipe = async (id: string) => {
  const response = await fetch(`http://localhost:3000/recipes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
