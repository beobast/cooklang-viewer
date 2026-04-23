interface Servings {
  amount: number;
  unit: string;
}

interface Recipe {
  title: string;
  description: string | null;
  servings: Servings | null;
  prepTime: string | null;
  cookTime: string | null;
  ingredients: string[];
  instructions: string[];
  notes: string | null;
}

export type { Servings, Recipe };
