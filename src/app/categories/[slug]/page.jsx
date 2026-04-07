import { getCategoryById, CATEGORIES } from "@/lib/categories";
import { getRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

/**
 * /categories/[slug] — lists all recipes belonging to a category.
 */

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.id }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    return <p>Category not found.</p>;
  }

  const recipes = getRecipes(slug);

  return (
    <div>
      <nav className="mb-4 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-900">Home</a>
        <span className="mx-1">/</span>
        <span>{category.label}</span>
      </nav>

      <div className="mb-6">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="mt-2 text-2xl font-semibold">{category.label}</h2>
        <p className="text-gray-600">{category.description}</p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No recipes in this category yet.
        </p>
      )}
    </div>
  );
}
