import parseRecipe from "@/lib/RecipeParser";
import slugify from "@sindresorhus/slugify";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const MyRecipeCard = ({
  data,
  markdown,
}: {
  data: any;
  markdown: string | undefined;
}) => {
  console.log(data);
  const tree = parseRecipe(markdown);
  //console.log(tree);
  return (
    <a href={`recipes/${data.id}`}>
      <Card className="bg-[#B9E4C9]/20">
        <CardHeader>
          <CardTitle className="text-[#356859] font-bold">
            {tree.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </a>
  );
};

export default MyRecipeCard;
