import parseRecipe from "@/lib/RecipeParser";

const MyRecipeCard = ({ markdown }: { markdown: string | undefined }) => {
  const tree = parseRecipe(markdown);
  console.log(tree);
  return <p>lol</p>;
};

export default MyRecipeCard;
