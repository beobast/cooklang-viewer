import type { RecipeProp, Amount, Ingredient } from "@/lib/Recipedata";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Title = ({ title }: { title: string }) => {
  return <h1>{title}</h1>;
};

const Description = ({ description }: { description: string | null }) => {
  return description ? <p>{description}</p> : null;
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
    <Card className="dark">
      <CardHeader>
        <CardTitle>Ingrédients</CardTitle>
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
    <div className="prose">
      <Title title={data.title} />
      <Description description={data.description} />
      <Tags tags={data.tags} />
      <Yields yields={data.yields} />
      <Ingredients ingredients={data.ingredients} />
      <Instructions instructions={data.instructions} />
    </div>
  );
};

export default Recipe;
