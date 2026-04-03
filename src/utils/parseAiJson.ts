/**
 * Extracts and parses the first JSON object found in an AI text response.
 * The model may wrap JSON in markdown fences or add extra prose; this strips that.
 */
export function parseAiJson<T = Record<string, unknown>>(text: string): T | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as T;
  } catch {
    return null;
  }
}
