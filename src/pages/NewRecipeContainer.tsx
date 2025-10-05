import { useState } from "react";
import * as z from "zod";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { createRecipe } from "../api/createRecipe";
import { NewRecipe } from "./NewRecipe";

export const NewRecipeContainer = () => {
  const navigate = useNavigate();

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
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

  const onChangeTags = (tagsString: string) => {
    setTags(tagsString.replace(" ", "").split(","));
  };

  const onChangeIngredientName = (index: number) => (name: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = name;
    setIngredients(newIngredients);
  };

  const onChangeIngredientQuantity = (index: number) => (quantity: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = quantity;
    setIngredients(newIngredients);
  };

  const onChangeIngredientUnit = (index: number) => (unit: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index].unit = unit;
    setIngredients(newIngredients);
  };

  const onAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        quantity: undefined,
        name: undefined,
        unit: undefined,
      },
    ]);
  };

  const onDeleteIngredient = (index: number) => {
    setIngredients((prev) => {
      const newIngredients = [...prev];
      newIngredients.splice(index, 1);

      return newIngredients;
    });
  };

  const onChangeStepDescription = (index: number) => (description: string) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index].description = description;
      return newSteps;
    });
  };

  const onDeleteStep = (index: number) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps.splice(index, 1);

      return newSteps;
    });
  };

  const onAddStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        number: prev.length ? Math.max(...prev.map((p) => p.number)) + 1 : 1,
        description: undefined,
      },
    ]);
  };

  return (
    <NewRecipe
      description={description}
      difficulty={difficulty}
      ingredients={ingredients}
      name={name}
      onAddIngredient={onAddIngredient}
      onAddStep={onAddStep}
      onChangeDescription={setDescription}
      onChangeDifficulty={setDifficulty}
      onChangeIngredientName={onChangeIngredientName}
      onChangeIngredientQuantity={onChangeIngredientQuantity}
      onChangeIngredientUnit={onChangeIngredientUnit}
      onChangeName={setName}
      onChangeStepDescription={onChangeStepDescription}
      onChangeTags={onChangeTags}
      onChangeTimeInMinutes={setTimeInMinutes}
      onDeleteIngredient={onDeleteIngredient}
      onDeleteStep={onDeleteStep}
      onSubmit={handleSubmit}
      steps={steps}
      tags={tags}
      timeInMinutes={timeInMinutes}
    />
  );
};
