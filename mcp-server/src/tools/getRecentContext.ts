import { z } from "zod";
import { apiCall } from "../api.js";

export const getRecentContextSchema = {
  limit: z.number().default(20).describe("Number of recent memories to return"),
  domain: z.string().optional().describe("Filter by domain"),
  source: z.string().optional().describe("Filter by source"),
};

export async function getRecentContextHandler(
  args: z.infer<z.ZodObject<typeof getRecentContextSchema>>,
) {
  const params: Record<string, string> = { limit: String(args.limit ?? 20) };
  if (args.domain) params.domain = args.domain;
  if (args.source) params.source = args.source;
  const result = await apiCall("GET", "/memories/recent", undefined, params);
  return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
}
