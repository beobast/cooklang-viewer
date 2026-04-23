import markdownit from "markdown-it";
import type { Servings, Recipe } from "@/lib/RecipeTypes";

const md = markdownit();

// "Pour 4 personnes" --> { amount: 4, unit: "personnes" }
const parseServings = (line: string): Servings => {
  const splitLine = line.split(" ");
  return {
    amount: parseFloat(splitLine[1]),
    unit: splitLine[2],
  };
};

// "Préparation : 15 minutes" --> "15 minutes"
const parseTime = (line: string): string => {
  return line.split(":")[1].trim();
};

const parseRecipe = (markdown: string | undefined): Recipe => {
  if (markdown === undefined) throw new Error("Recipe is undefined");

  let title = null;
  let description = null;
  let ingredients = [];
  let instructions = [];
  let notes = null;
  let currentSection = null; // info, ingredients, steps, notes
  let servings = null;
  let prepTime = null;
  let cookTime = null;

  const tokens = md.parse(markdown, {});

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    // Title
    if (t.type === "heading_open" && t.tag === "h1") {
      if (title === null) title = tokens[i + 1].content;
      else throw new Error("Multiple titles found");
    }

    // Description
    else if (t.type === "paragraph_open" && !currentSection) {
      if (description === null)
        description = tokens[i + 1].content + "\r\n\r\n";
      else description = description.concat(tokens[i + 1].content, "\r\n\r\n");
    }

    // Sections
    else if (t.type === "heading_open" && t.tag === "h2") {
      const section = tokens[i + 1].content.toLowerCase();
      if (section.includes("pour ")) currentSection = "info";
      else if (section.includes("ingrédients")) currentSection = "ingredients";
      else if (section.includes("préparation")) currentSection = "steps";
      else currentSection = "notes";
    }

    // Info
    else if (currentSection === "info" && t.type === "inline") {
      if (servings === null) servings = parseServings(t.content);
      else if (prepTime === null) prepTime = parseTime(t.content);
      else if (cookTime === null) cookTime = parseTime(t.content);
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
      if (notes === null) notes = tokens[i + 1].content + "\r\n\r\n";
      else notes = notes.concat(tokens[i + 1].content, "\r\n\r\n");
    }
  }

  ingredients.shift();
  instructions.shift();

  if (title === null) throw new Error("No title found");

  return {
    title,
    description,
    servings,
    prepTime,
    cookTime,
    ingredients,
    instructions,
    notes,
  };
};

export default parseRecipe;
