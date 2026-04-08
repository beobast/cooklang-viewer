import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecipeCard = ({ data }: { data: any }) => {
  const onClick = () => {};

  console.log(data);

  return (
    <a href={`recipes/${data.id}`}>
      <Card onClick={onClick}>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};

export default RecipeCard;
