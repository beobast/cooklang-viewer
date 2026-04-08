import type { RecipeProp, Amount, Ingredient } from "@/lib/Recipedata";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Title = ({ title }: { title: string }) => {
  return <h1 className="text-[#FD5523]">{title}</h1>;
};

const Description = ({ description }: { description: string | null }) => {
  return description ? <p className="text-[#356859]">{description}</p> : null;
};

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-2">
      {tags.map((t) => (
        <Badge variant="secondary">{t}</Badge>
      ))}
    </div>
  );
};

const Yields = ({ yields }: { yields: Amount[] }) => {
  return (
    <ul>
      {yields.map((t) => (
        <p>
          {t.factor} {t.unit}
        </p>
      ))}
    </ul>
  );
};

const Instructions = ({ instructions }: { instructions: string | null }) => {
  if (!instructions) return null;
  return (
    <ol>
      {instructions
        .split("\n\n")
        .filter((x) => x)
        .map((l) => (
          <li>{l}</li>
        ))}
    </ol>
  );
};

const Ingredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <Card className="min-w-fit h-fit mt-8 bg-[#e7efd8]">
      <CardHeader>
        <CardTitle className="text-[#356859] font-semibold">
          INGREDIENTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
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
    <div className="prose mx-auto bg-[#FFFBE6]">
      <Title title={data.title} />
      <Description description={data.description} />
      <Tags tags={data.tags} />
      <Yields yields={data.yields} />
      <div className="flex gap-8 flex-col md:flex-row">
        <Ingredients ingredients={data.ingredients} />
        <Instructions instructions={data.instructions} />
      </div>
    </div>
  );
};

export default Recipe;
