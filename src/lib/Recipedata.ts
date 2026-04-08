interface Amount {
  factor: number | null;
  unit: string | null;
}

interface Ingredient {
  name: string;
  amount: Amount | null;
  link: string | null;
}

interface IngredientGroup {
  title: string | null;
  ingredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
}

interface Recipe {
  title: string;
  description: string | null;
  tags: string[];
  yields: Amount[];
  ingredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
  instructions: string | null;
}

interface RecipeProp extends Recipe {
  id: string;
}

export type { Amount, Ingredient, IngredientGroup, Recipe, RecipeProp };
