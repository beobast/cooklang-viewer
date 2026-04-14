import slugify from "@sindresorhus/slugify";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const RecipeCard = ({ data }: { data: any }) => {
  console.log(data);

  return (
    <a href={`recipes/${slugify(data.title)}`}>
      <Card className="bg-[#B9E4C9]/20">
        <CardHeader>
          <CardTitle className="text-[#356859] font-bold">
            {data.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </a>
  );
};

export default RecipeCard;
