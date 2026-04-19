import markdownit from "markdown-it";
import type { Recipe } from "@/lib/RecipeTypes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const md = markdownit({ linkify: true });

const Title = ({ title }: { title: string | null }) => {
  return <h1 className="text-[#FD5523]">{title}</h1>;
};

const Description = ({ description }: { description: string | null }) => {
  return description ? (
    <div
      className="text-[#356859]"
      dangerouslySetInnerHTML={{ __html: md.render(description) }}
    ></div>
  ) : null;
};

const Tags = ({ tags }: { tags: string[] }) => {
  return tags.length ? (
    <p>
      {tags.map((t) => (
        <Badge variant="secondary" className="mr-2">
          {t}
        </Badge>
      ))}
    </p>
  ) : null;
};

const Instructions = ({ instructions }: { instructions: string[] }) => {
  return (
    <ol className="text-[#356859] text-base list-none px-0 my-0">
      {instructions.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ol>
  );
};

const Ingredients = ({ ingredients }: { ingredients: string[] }) => {
  return (
    <Card className="min-w-38 w-fit h-fit mt-2 bg-[#e7efd8]">
      <CardHeader>
        <CardTitle className="text-[#356859] font-semibold text-center">
          INGREDIENTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-base list-none px-0 my-0">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const RecipeView = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="prose mx-auto">
      <Title title={recipe.title} />
      <Description description={recipe.description} />
      <div className="flex gap-4 flex-col">
        <Ingredients ingredients={recipe.ingredients} />
        <Instructions instructions={recipe.instructions} />
      </div>
    </div>
  );
};

export default RecipeView;
