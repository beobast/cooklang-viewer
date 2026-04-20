import markdownit from "markdown-it";
import type { Recipe } from "@/lib/RecipeTypes";

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
        <span>{t}</span>
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
          <li key={index} className="list-decimal ml-4">
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  );
};

const Ingredients = ({ ingredients }: { ingredients: string[] }) => {
  return (
    <div className="min-w-38 w-fit h-fit mt-2 bg-[#e7efd8]">
      <p className="text-[#356859] font-semibold text-center">INGREDIENTS</p>

      <ul
        className={`text-base px-4 my-0 list-["-"] space-y-2 columns-1 sm:columns-2 md:columns-3`}
      >
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

const RecipeView = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="max-w-3xl mx-auto shadow-lg rounded-2xl p-6 space-y-6">
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
