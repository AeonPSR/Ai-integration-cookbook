import { getAllRecipes } from "./mdx";

/**
 * Get all recipes, optionally filtered by category.
 * Metadata is read from MDX frontmatter at build time.
 */
export function getRecipes(categoryId = null) {
  const recipes = getAllRecipes();

  if (!categoryId) return recipes;
  return recipes.filter((recipe) => recipe.category === categoryId);
}
