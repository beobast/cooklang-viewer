import markdownit from "markdown-it";
import type { RecipeProp, Amount, Ingredient } from "@/lib/Recipedata";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const md = markdownit({ linkify: true });

const Title = ({ title }: { title: string }) => {
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

const Yields = ({ yields }: { yields: Amount[] }) => {
  return yields.length ? (
    <p>
      {yields.map((t) => (
        <Badge variant="default">
          {t.factor} {t.unit}
        </Badge>
      ))}
    </p>
  ) : null;
};

const Instructions = ({ instructions }: { instructions: string | null }) => {
  return instructions ? (
    <div
      className="text-[#356859]"
      dangerouslySetInnerHTML={{ __html: md.render(instructions) }}
    ></div>
  ) : null;
};

const Ingredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <Card className="min-w-38 w-fit h-fit mt-2 bg-[#e7efd8]">
      <CardHeader>
        <CardTitle className="text-[#356859] font-semibold text-center">
          INGREDIENTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-base list-none px-0 my-0">
          {ingredients.map((i) => (
            <li>
              {i.amount?.factor} {i.amount?.unit} {i.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Recipe = ({ data }: { data: RecipeProp }) => {
  return (
    <div className="prose mx-auto">
      <Title title={data.title} />
      <Description description={data.description} />
      <Tags tags={data.tags} />
      <Yields yields={data.yields} />
      <div className="flex gap-4 flex-col">
        <Ingredients ingredients={data.ingredients} />
        <Instructions instructions={data.instructions} />
      </div>
    </div>
  );
};

export default Recipe;
