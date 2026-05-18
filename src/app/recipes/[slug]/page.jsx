import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/categories";
import { getRecipeBySlug, getRecipeSlugs } from "@/lib/mdx";

export function generateStaticParams() {
  return getRecipeSlugs().map((slug) => ({ slug }));
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const { frontmatter, html } = recipe;
  const category = getCategoryById(frontmatter.category);

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
        <span>{frontmatter.title}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold">{frontmatter.title}</h1>
      {frontmatter.description && (
        <p className="mb-6 text-gray-500">{frontmatter.description}</p>
      )}

      <article
        className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
