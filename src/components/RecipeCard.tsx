import type { CollectionEntry } from "astro:content";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import parseRecipe from "@/lib/RecipeParser";

const RecipeCard = ({ recipe }: { recipe: CollectionEntry<"recipes"> }) => {
  const parsedRecipe = parseRecipe(recipe.body);
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
