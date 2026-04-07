/**
 * Category definitions for grouping recipes.
 * Each category has an id (used in URLs and frontmatter), a display label,
 * an emoji icon, and a short description.
 */

export const CATEGORIES = [
  {
    id: "text",
    label: "Text",
    icon: "📝",
    description: "Summarization, classification, extraction, and other text tasks.",
  },
  {
    id: "vision",
    label: "Vision",
    icon: "🖼️",
    description: "Image description, analysis, and visual understanding.",
  },
  {
    id: "code",
    label: "Code",
    icon: "💻",
    description: "Code generation, review, explanation, and transformation.",
  },
  {
    id: "data",
    label: "Data",
    icon: "📊",
    description: "Structured extraction, JSON output, and data processing.",
  },
  {
    id: "audio",
    label: "Audio",
    icon: "🎧",
    description: "Transcription, speech-to-text, and audio analysis.",
  },
  {
    id: "agents",
    label: "Agents",
    icon: "🤖",
    description: "Autonomous agents, tool use, and multi-step reasoning.",
  },
];

/**
 * Look up a category by its id.
 * Returns undefined if not found.
 */
export function getCategoryById(id) {
  return CATEGORIES.find((cat) => cat.id === id);
}

/**
 * Get all valid category ids.
 */
export function getCategoryIds() {
  return CATEGORIES.map((cat) => cat.id);
}
