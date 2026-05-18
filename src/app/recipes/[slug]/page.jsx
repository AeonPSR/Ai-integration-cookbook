import { getRecipes } from "@/lib/recipes";
import { getCategoryById } from "@/lib/categories";
import { getRecipeBySlug } from "@/lib/mdx";
import CodeBlockEnhancer from "@/components/CodeBlockEnhancer";

export function generateStaticParams() {
  return getRecipes().map((r) => ({ slug: r.slug }));
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = getRecipes().find((r) => r.slug === slug);
  const category = recipe ? getCategoryById(recipe.category) : null;
  const mdx = await getRecipeBySlug(slug);

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

      <h1 className="mb-2 text-3xl font-bold">{recipe ? recipe.title : slug}</h1>
      {recipe && (
        <p className="mb-6 text-gray-500">{recipe.description}</p>
      )}

      {mdx ? (
        <>
          <article
            data-recipe-content
            className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: mdx.html }}
          />
          <CodeBlockEnhancer />
        </>
      ) : (
        <p className="text-gray-400 italic">Recipe content coming soon.</p>
      )}
    </div>
  );
}
