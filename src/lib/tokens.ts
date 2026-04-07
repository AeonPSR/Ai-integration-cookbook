/**
 * Rough token count estimator.
 * Uses the ~4 chars per token heuristic. For production, use tiktoken.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Estimate cost in USD for a given token count and price per 1K tokens.
 */
export function estimateCost(
  tokens: number,
  pricePer1kTokens: number
): number {
  return (tokens / 1000) * pricePer1kTokens;
}
