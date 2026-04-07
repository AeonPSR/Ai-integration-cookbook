import { CATEGORIES } from "@/lib/categories";
import { RECIPES } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Recipes</h2>
      <p className="mb-8 text-gray-600">
        Browse copy-paste AI recipes. Pick a category or scroll through all recipes.
      </p>

      {/* Category grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="block rounded-lg border p-5 transition hover:shadow-md"
          >
            <span className="text-3xl">{cat.icon}</span>
            <h3 className="mt-2 font-semibold">{cat.label}</h3>
            <p className="mt-1 text-sm text-gray-600">{cat.description}</p>
          </a>
        ))}
      </div>

      {/* All recipes */}
      <h2 className="mb-4 text-xl font-semibold">All Recipes</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RECIPES.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
