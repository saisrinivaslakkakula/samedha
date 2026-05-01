import { z } from "zod";
import { apiCall } from "../api.js";

export const saveMemorySchema = {
  content: z.string().describe("The memory text to save"),
  source: z.enum(["claude", "chatgpt", "gemini", "manual"]).default("claude"),
  domain: z.enum(["career", "project", "research", "learning", "personal", "meta"]),
  tags: z.array(z.string()).optional().describe("Free-form tags"),
  importance: z.number().min(1).max(5).default(3).describe("1 (low) to 5 (critical)"),
  summary: z.string().optional().describe("Short 1-2 sentence summary"),
  session_id: z.string().optional(),
};

export async function saveMemoryHandler(args: z.infer<z.ZodObject<typeof saveMemorySchema>>) {
  const result = await apiCall("POST", "/memories", args);
  return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
}
