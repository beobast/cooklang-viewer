import markdownit from "markdown-it";

const md = markdownit();

const parseRecipe = (markdown: string | undefined) => {
  let title = null;
  let description = "";
  let ingredients = [];
  let instructions = [];
  let notes = "";
  let currentSection = null; // ingredients, steps, notes
  const tokens = md.parse(markdown ?? "", {});

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    // Title
    if (t.type === "heading_open" && t.tag === "h1") {
      if (title === null) title = tokens[i + 1].content;
      else throw new Error("Multiple titles found");
    }

    // Description
    else if (t.type === "paragraph_open" && !currentSection) {
      description = description.concat(tokens[i + 1].content, "\r\n\r\n");
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
      ingredients.push(t.content);
    }

    // Steps
    else if (currentSection === "steps" && t.type === "inline") {
      instructions.push(t.content);
    }

    // Notes
    else if (currentSection === "notes" && t.type === "paragraph_open") {
      notes = notes.concat(tokens[i + 1].content, "\r\n\r\n");
    }
  }

  ingredients.shift();
  instructions.shift();

  return {
    title,
    description,
    ingredients,
    instructions,
    notes,
  };
};

export default parseRecipe;
