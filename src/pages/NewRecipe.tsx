type Props = {
  onChangeName: (name: string) => void;
  onChangeDescription: (description: string) => void;
  onChangeTimeInMinutes: (timeInMinutes: number) => void;
  onChangeDifficulty: (difficulty: number) => void;
  onChangeTags: (tagsString: string) => void;
  onChangeIngredientName: (ingredientIndex: number) => (name: string) => void;
  onChangeIngredientQuantity: (
    ingredientIndex: number
  ) => (quantity: number) => void;
  onChangeIngredientUnit: (ingredientIndex: number) => (unit: string) => void;
  onAddIngredient: () => void;
  onDeleteIngredient: (ingredientIndex: number) => void;
  onChangeStepDescription: (stepIndex: number) => (description: string) => void;
  onDeleteStep: (stepIndex: number) => void;
  onAddStep: () => void;
  steps: { number: number; description: string | undefined }[];
  ingredients: {
    id: number;
    name: string | undefined;
    quantity: number | undefined;
    unit: string | undefined;
  }[];
  name: string | undefined;
  description: string | undefined;
  timeInMinutes: number | undefined;
  difficulty: number | undefined;
  tags: string[];
  onSubmit: () => void;
};

export const NewRecipe = ({
  description,
  difficulty,
  name,
  onChangeDescription,
  onChangeDifficulty,
  onChangeName,
  onChangeTags,
  onChangeTimeInMinutes,
  tags,
  timeInMinutes,
  onSubmit,
  ingredients,
  onAddIngredient,
  onAddStep,
  onChangeIngredientName,
  onChangeIngredientQuantity,
  onChangeIngredientUnit,
  onChangeStepDescription,
  onDeleteIngredient,
  onDeleteStep,
  steps,
}: Props) => {
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
            onChange={(e) => onChangeName(e.target.value)}
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
              onChange={(e) => onChangeTimeInMinutes(e.target.valueAsNumber)}
              value={timeInMinutes}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-lg">Difficulty</label>
            <select
              className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
              required
              onChange={(e) => onChangeDifficulty(parseInt(e.target.value))}
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
            onChange={(e) => onChangeTags(e.target.value)}
            value={tags.join(",")}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label className="text-lg">Description</label>
          <textarea
            placeholder="miam miam miam"
            onChange={(e) => onChangeDescription(e.target.value)}
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
                  onChange={(e) =>
                    onChangeIngredientName(index)(e.target.value)
                  }
                  value={ingredient.name}
                />
                <input
                  required
                  type="number"
                  placeholder="Quantity"
                  className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
                  onChange={(e) =>
                    onChangeIngredientQuantity(index)(e.target.valueAsNumber)
                  }
                  value={ingredient.quantity}
                />
                <input
                  required
                  placeholder="Unit"
                  className="shadow-neutral-500 shadow-sm rounded p-1 bg-white"
                  type="text"
                  onChange={(e) =>
                    onChangeIngredientUnit(index)(e.target.value)
                  }
                  value={ingredient.unit}
                />
                <button
                  type="button"
                  className="bg-orange-500 rounded p-1 text-white text-sm"
                  onClick={() => onDeleteIngredient(index)}
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
              onClick={onAddIngredient}
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
                    onChangeStepDescription(index)(e.target.value)
                  }
                  value={step.description}
                  className="shadow-neutral-500 shadow-sm bg-white rounded p-1 w-full"
                />
                <button
                  type="button"
                  className="bg-orange-500 rounded p-1 text-white text-sm"
                  onClick={() => onDeleteStep(index)}
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
              onClick={onAddStep}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-orange-500 rounded p-1 text-white text-lg"
            onClick={onSubmit}
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};
