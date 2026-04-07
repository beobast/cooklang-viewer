// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { Recipe } from "@tmlmt/cooklang-parser";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

const recipesFiles = Object.keys(import.meta.glob("../recipes/**/*.cook"));

const recipes = defineCollection({
  loader: async () => {
    const response = await fetch(
      `https://api.github.com/repos/beobast/recettes/git/trees/main?recursive=1`,
    );
    const repo = await response.json();

    const recipeList = repo.tree.filter(
      (node: any) => node.path.endsWith(".cook") && node.path !== "README.md",
    );

    const myrecipes = [];

    for (const element of recipeList) {
      const root = `https://raw.githubusercontent.com/beobast/recettes/main/`;
      const recipeURL = new URL(element.path, root).href;
      const recipe = await fetch(recipeURL, { cache: "force-cache" }).then(
        (raw) => raw.text(),
      );
      //const parsed = parseRecipe(element.path, recipe, repository);
      const parsed = new Recipe(recipe);
      myrecipes.push(parsed);
    }

    console.log(myrecipes);

    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return recipeList.map((d: any) => ({
      id: d.path,
      ...d,
    }));
  },
  /*schema: z.object({
    title: z.string(),
  }),*/
});

// 4. Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { recipes };
