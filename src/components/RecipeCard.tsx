import type { CollectionEntry } from "astro:content";

const RecipeCard = ({ recipe }: { recipe: CollectionEntry<"recipes"> }) => {
  return <a href={`recipes/${recipe.id}`}>{recipe.data.title}</a>;
};

export default RecipeCard;
