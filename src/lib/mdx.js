import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

const recipesDir = path.join(process.cwd(), "src", "content", "recipes");

function getMdxFileNames() {
  if (!fs.existsSync(recipesDir)) return [];
  return fs
    .readdirSync(recipesDir)
    .filter((fileName) => fileName.endsWith(".mdx"));
}

function normalizeRecipeMetadata(frontmatter, fileName) {
  const slugFromFile = fileName.replace(/\.mdx$/, "");

  return {
    slug: frontmatter.slug || slugFromFile,
    title: frontmatter.title || slugFromFile,
    description: frontmatter.description || "",
    category: frontmatter.category || "",
    difficulty: frontmatter.difficulty || "",
    models: frontmatter.models || [],
    tags: frontmatter.tags || [],
    estimatedCostPer1kTokens: frontmatter.estimatedCostPer1kTokens,
  };
}

function parseRecipeMetadataFromFile(fileName) {
  const filePath = path.join(recipesDir, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return normalizeRecipeMetadata(data, fileName);
}

/**
 * All recipe slugs derived from MDX files in content/recipes.
 */
export function getRecipeSlugs() {
  return getMdxFileNames().map((fileName) => fileName.replace(/\.mdx$/, ""));
}

/**
 * Recipe index built from MDX frontmatter (no HTML rendering).
 */
export function getAllRecipes() {
  return getMdxFileNames()
    .map(parseRecipeMetadataFromFile)
    .sort((left, right) => left.title.localeCompare(right.title));
}

/**
 * Load a recipe MDX file by slug.
 * Returns { frontmatter, html } where html is the rendered content.
 */
export async function getRecipeBySlug(slug) {
  const filePath = path.join(recipesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = normalizeRecipeMetadata(data, `${slug}.mdx`);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return { frontmatter, html: String(result) };
}
