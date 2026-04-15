import parseRecipe from "@/lib/RecipeParser";
import ReactJsonView from "@microlink/react-json-view";

const MyRecipeCard = ({ data }: { data: any }) => {
  const tree = parseRecipe(data);
  console.log(tree);

  return <ReactJsonView src={tree} />;
};

export default MyRecipeCard;
