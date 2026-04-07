/**
 * Preview card for a single recipe in the grid view.
 */

import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <a
      href={`/recipes/${recipe.slug}`}
      className="block rounded-lg border p-4 transition hover:shadow-md"
    >
      <h3 className="font-semibold">{recipe.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{recipe.description}</p>
      <div className="mt-2 flex gap-2">
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
          {recipe.difficulty}
        </span>
      </div>
    </a>
  );
}
