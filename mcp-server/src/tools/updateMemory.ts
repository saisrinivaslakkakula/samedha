import { z } from "zod";
import { apiCall } from "../api.js";

export const updateMemorySchema = {
  id: z.string().uuid().describe("UUID of the memory to update"),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  importance: z.number().min(1).max(5).optional(),
  domain: z.string().optional(),
  summary: z.string().optional(),
};

export async function updateMemoryHandler(args: z.infer<z.ZodObject<typeof updateMemorySchema>>) {
  const { id, ...body } = args;
  const result = await apiCall("PATCH", `/memories/${id}`, body);
  return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
}
