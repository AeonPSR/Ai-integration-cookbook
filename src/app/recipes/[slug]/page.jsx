import { RECIPES } from "@/lib/recipes";
import { getCategoryById } from "@/lib/categories";

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);
  const category = recipe ? getCategoryById(recipe.category) : null;

  return (
    <div>
      <nav className="mb-4 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-900">Home</a>
        {category && (
          <>
            <span className="mx-1">/</span>
            <a href={`/categories/${category.id}`} className="hover:text-gray-900">{category.label}</a>
          </>
        )}
        <span className="mx-1">/</span>
        <span>{recipe ? recipe.title : slug}</span>
      </nav>

      <h2 className="mb-4 text-2xl font-semibold">{recipe ? recipe.title : slug}</h2>
      {/* TODO: load recipe MDX, render CodeBlock, CostEstimator */}
    </div>
  );
}
