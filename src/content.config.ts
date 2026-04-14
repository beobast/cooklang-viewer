// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";
//import { Recipe } from "@tmlmt/cooklang-parser";
import { Recipe } from "recipemd";

// 2. Import loader(s)
//import { glob } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

/*const githubRepo = "tstehr/recipes";
const githubBranch = "master";*/

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
  /*schema: z.object({
    title: z.string(),
  }),*/
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { recipes };
