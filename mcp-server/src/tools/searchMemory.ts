import { z } from "zod";
import { apiCall } from "../api.js";

export const searchMemorySchema = {
  q: z.string().describe("Natural language search query"),
  limit: z.number().default(10).describe("Number of results to return"),
  domain: z.string().optional().describe("Filter by domain"),
  source: z.string().optional().describe("Filter by source"),
  min_importance: z.number().min(1).max(5).optional().describe("Minimum importance level"),
};

export async function searchMemoryHandler(args: z.infer<z.ZodObject<typeof searchMemorySchema>>) {
  const params: Record<string, string> = { q: args.q, limit: String(args.limit ?? 10) };
  if (args.domain) params.domain = args.domain;
  if (args.source) params.source = args.source;
  if (args.min_importance) params.min_importance = String(args.min_importance);
  const result = await apiCall("GET", "/memories/search", undefined, params);
  return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
}
