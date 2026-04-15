import markdownit from "markdown-it";

const md = markdownit();

const parseRecipe = (markdown: string | undefined) => {
  let title = null;
  let description = "";
  let ingredients = [];
  let instructions = [];
  let currentSection = null; // ingredients, steps, notes
  const tokens = md.parse(markdown ?? "", {});
  console.log(tokens);

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    // Title
    if (t.type === "heading_open" && t.tag === "h1") {
      if (title === null) title = tokens[i + 1].content;
      else throw new Error("Multiple titles found");
    }

    // Description
    else if (t.type === "paragraph_open" && !currentSection) {
      description = tokens[i + 1].content; // TODO push
    }

    // Sections
    else if (t.type === "heading_open" && t.tag === "h2") {
      const section = tokens[i + 1].content.toLowerCase();

      if (section.includes("ingrédient")) currentSection = "ingredients";
      else if (section.includes("préparation")) currentSection = "steps";
      else currentSection = "notes";
    }

    // Ingredients
    else if (currentSection === "ingredients" && t.type === "inline") {
      const text = t.content.trim();
      if (text) ingredients.push(text);
    }

    // Steps
    else if (currentSection === "steps" && t.type === "inline") {
      const text = t.content.trim();
      if (text) instructions.push(text);
    }
  }

  return {
    title,
    description,
    ingredients,
    instructions,
  };
};

export default parseRecipe;
