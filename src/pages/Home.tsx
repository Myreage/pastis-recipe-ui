import { RecipeCard } from "../components/RecipeCard";

export const Home = () => {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("fr-FR", {
    hour: "numeric",
    minute: "2-digit",
  });

  const formattedDate = now.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
  });
  return (
    <div>
      <p>
        🍂 On est le {formattedDate}, il est {formattedTime}
      </p>
      <p className="text-2xl">On mange quoi ?</p>
      <div className="grid grid-cols-3 mt-5">
        <RecipeCard
          difficulty={1}
          name="Carbo franchouillarde"
          tags={["vitef", "confort"]}
          timeInMinutes={20}
          imageUrl="https://media.istockphoto.com/id/177413384/fr/photo/p%C3%A2tes-alla-carbonara.jpg?s=612x612&w=0&k=20&c=2kua_mU_IWUrcEaU1MMBCwx-JdCNzzL1m4MtZsnl_L8="
        />
        <RecipeCard
          difficulty={2}
          name="Soupe de butternut"
          tags={["light", "confort"]}
          timeInMinutes={45}
          imageUrl="https://www.cookomix.com/wp-content/uploads/2017/01/veloute-butternut-thermomix-800x600.jpg"
        />
        <RecipeCard
          difficulty={5}
          name="Boeuf wellington"
          imageUrl="https://kissmychef.com/wp-content/uploads/2024/10/boeuf-2.png"
          tags={["fancy"]}
          timeInMinutes={50}
        />
      </div>
    </div>
  );
};
