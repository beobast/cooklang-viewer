import markdownit from "markdown-it";
import type { Recipe } from "@/lib/RecipeTypes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const md = markdownit({ linkify: true });

const Title = ({ title }: { title: string | null }) => {
  return <h1 className="text-[#FD5523] text-3xl font-bold">{title}</h1>;
};

const Description = ({ description }: { description: string | null }) => {
  return description ? (
    <div
      className="text-[#356859] mt-2"
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
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
        Instructions
      </h2>

      <ol className="text-[#356859] text-base px-0 my-0 space-y-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="leading-relaxed">
            {instruction}
          </li>
        ))}
      </ol>
    </div>
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
        <ul className={`text-base px-4 my-0 list-["-"] space-y-2`}>
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
    <div className="prose max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
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
