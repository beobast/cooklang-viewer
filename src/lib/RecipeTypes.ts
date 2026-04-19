interface Recipe {
  title: string | null;
  description: string | null;
  ingredients: string[];
  instructions: string[];
  notes: string | null;
}

export type { Recipe };
