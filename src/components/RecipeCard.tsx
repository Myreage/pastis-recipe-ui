type Props = {
  name: string;
  difficulty: number;
  timeInMinutes: number;
  tags: string[];
  imageUrl: string;
};

export const RecipeCard = ({
  difficulty,
  name,
  tags,
  timeInMinutes,
  imageUrl,
}: Props) => {
  return (
    <div className="rounded-2xl w-96 py-2 shadow-2xl bg-white hover:bg-gray-100 hover:cursor-pointer">
      <p className="text-xl px-3">{name}</p>
      <img className="h-50 w-full mt-2 mb-2 object-cover" src={imageUrl} />
      <div className="flex justify-between px-3">
        <p>🔪 {difficulty}/5</p>
        <p>🕛 {timeInMinutes}mn</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <div className="rounded-xl px-2 bg-gray-200">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
