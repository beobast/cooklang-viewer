import type { CollectionEntry } from "astro:content";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const RecipeCard = ({ recipe }: { recipe: CollectionEntry<"recipes"> }) => {
  return (
    <a href={`recipes/${recipe.id}`}>
      <Card className="bg-[#B9E4C9]/20">
        <CardHeader>
          <CardTitle className="text-[#356859] font-bold">
            {recipe.data.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </a>
  );
};

export default RecipeCard;
