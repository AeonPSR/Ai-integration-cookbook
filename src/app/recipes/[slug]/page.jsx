import { getRecipes } from "@/lib/recipes";
import { getCategoryById } from "@/lib/categories";
import { getRecipeBySlug } from "@/lib/mdx";
import CodeBlockEnhancer from "@/components/CodeBlockEnhancer";

export function generateStaticParams() {
  return getRecipes().map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = getRecipes().find((item) => item.slug === slug);
  const mdx = await getRecipeBySlug(slug);

  if (!recipe || !mdx) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Recette introuvable</h1>
        <p className="text-gray-500">Le slug "{slug}" ne correspond a aucun fichier MDX.</p>
        <a href="/" className="mt-4 block text-blue-500 underline">
          Retour a l'accueil
        </a>
      </div>
    );
  }

  const category = getCategoryById(recipe.category);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <nav className="mb-8 text-sm text-gray-500">
        <a href="/" className="transition-colors hover:text-gray-900">
          Home
        </a>
        {category && (
          <>
            <span className="mx-2 text-gray-300">/</span>
            <a
              href={`/categories/${category.id}`}
              className="transition-colors hover:text-gray-900"
            >
              {category.label}
            </a>
          </>
        )}
        <span className="mx-2 text-gray-300">/</span>
        <span className="font-medium text-gray-900">{mdx.frontmatter.title}</span>
      </nav>

      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {mdx.frontmatter.title}
        </h1>
        <p className="text-xl leading-relaxed text-gray-600">
          {mdx.frontmatter.description}
        </p>
      </header>

      <article
        data-recipe-content
        className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600 prose-code:before:content-none prose-code:after:content-none hover:prose-a:text-blue-500 prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: mdx.html }}
      />
      <CodeBlockEnhancer />
    </div>
  );
}
