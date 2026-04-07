/**
 * Static recipe index.
 * Hardcoded metadata extracted from MDX frontmatter.
 * Will be replaced by dynamic MDX parsing once the MDX pipeline (task #7) is done.
 */

export const RECIPES = [
  {
    slug: "text-summarization",
    title: "Text Summarization",
    description: "Condense long text into key points using an LLM.",
    category: "text",
    difficulty: "beginner",
    models: ["gpt-4", "claude-3", "mistral-large"],
    tags: ["text", "summarization", "nlp"],
  },
  {
    slug: "text-classification",
    title: "Text Classification",
    description: "Classify text into predefined categories using an LLM.",
    category: "text",
    difficulty: "beginner",
    models: ["gpt-4", "claude-3", "mistral-large"],
    tags: ["text", "classification", "labeling"],
  },
  {
    slug: "entity-extraction",
    title: "Entity Extraction (NER)",
    description: "Extract named entities like people, places, and dates from text.",
    category: "text",
    difficulty: "intermediate",
    models: ["gpt-4", "claude-3"],
    tags: ["text", "ner", "extraction", "entities"],
  },
  {
    slug: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Detect the emotional tone of text — positive, negative, or neutral.",
    category: "text",
    difficulty: "beginner",
    models: ["gpt-4", "claude-3", "mistral-large"],
    tags: ["text", "sentiment", "analysis"],
  },
  {
    slug: "image-description",
    title: "Image Description",
    description: "Generate a text description of an image using a vision model.",
    category: "vision",
    difficulty: "intermediate",
    models: ["gpt-4"],
    tags: ["vision", "image", "description", "multimodal"],
  },
  {
    slug: "code-generation",
    title: "Code Generation",
    description: "Generate working code from a natural language description.",
    category: "code",
    difficulty: "intermediate",
    models: ["gpt-4", "claude-3"],
    tags: ["code", "generation", "programming"],
  },
  {
    slug: "structured-data-extraction",
    title: "Structured Data Extraction",
    description: "Extract structured JSON data from unstructured text like invoices or emails.",
    category: "data",
    difficulty: "intermediate",
    models: ["gpt-4", "claude-3"],
    tags: ["data", "json", "extraction", "parsing"],
  },
  {
    slug: "translation",
    title: "Translation",
    description: "Translate text between languages while preserving tone and context.",
    category: "text",
    difficulty: "beginner",
    models: ["gpt-4", "claude-3", "mistral-large"],
    tags: ["text", "translation", "language", "i18n"],
  },
];

/**
 * Get all recipes, optionally filtered by category.
 */
export function getRecipes(categoryId = null) {
  if (!categoryId) return RECIPES;
  return RECIPES.filter((r) => r.category === categoryId);
}
