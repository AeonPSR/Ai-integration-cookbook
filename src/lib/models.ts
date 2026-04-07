import { ModelDefinition } from "@/types";

/** Supported models with pricing (USD per 1K tokens, as of 2024). */
export const MODELS: ModelDefinition[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "openai",
    inputPricePer1kTokens: 0.03,
    outputPricePer1kTokens: 0.06,
    maxContextTokens: 8192,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    inputPricePer1kTokens: 0.003,
    outputPricePer1kTokens: 0.015,
    maxContextTokens: 200000,
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "mistral",
    inputPricePer1kTokens: 0.008,
    outputPricePer1kTokens: 0.024,
    maxContextTokens: 32000,
  },
];
