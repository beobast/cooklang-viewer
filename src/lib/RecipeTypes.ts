interface Recipe {
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string[];
  notes: string | null;
}

export type { Recipe };
