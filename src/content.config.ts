import { defineCollection } from "astro:content";
import type { MarkdownInstance } from "astro";
import slugify from "@sindresorhus/slugify";
import parseRecipe from "@/lib/RecipeParser";

// Fetch from github repo
/*
const githubRepo = "beobast/recettes";
const githubBranch = "main";

const recipes = defineCollection({
  loader: async () => {
    const response = await fetch(
      `https://api.github.com/repos/${githubRepo}/git/trees/${githubBranch}?recursive=1`,
    );
    const repo = await response.json();

    const recipeList = repo.tree.filter(
      (node: any) =>
        node.type == "blob" &&
        node.path.endsWith(".md") &&
        node.path !== "README.md",
    );

    const myrecipes: any[] = [];
    const root = `https://raw.githubusercontent.com/${githubRepo}/${githubBranch}/`;

    for (const element of recipeList) {
      const recipeURL = new URL(element.path, root).href;
      const recipe = await fetch(recipeURL, { cache: "force-cache" }).then(
        (raw) => raw.text(),
      );
      myrecipes.push({
        id: element.sha,
        ...JSON.parse(JSON.stringify(Recipe.parse(recipe))),
      });
    }

    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return myrecipes;
  },
});
*/

const recipes = defineCollection({
  loader: () => {
    // https://docs.astro.build/en/guides/markdown-content/#importing-markdown
    const recipes = Object.values(
      import.meta.glob<MarkdownInstance<Record<string, any>>>(
        "/recipes/**/*.md",
        { eager: true },
      ),
    );

    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return recipes.map((recipe) => {
      const parsedRecipe = parseRecipe(recipe.rawContent());
      return {
        id: slugify(parsedRecipe.title),
        filePath: recipe.file,
        ...parsedRecipe,
      };
    });
  },
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { recipes };
