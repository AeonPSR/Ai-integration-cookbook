/** Shared TypeScript types for the AI Integration Cookbook. */

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  models: string[];
  tags: string[];
  estimatedCostPer1kTokens: number;
}

export interface ModelDefinition {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "mistral";
  inputPricePer1kTokens: number;
  outputPricePer1kTokens: number;
  maxContextTokens: number;
}
