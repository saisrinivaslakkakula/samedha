import { z } from "zod";
import { apiCall } from "../api.js";

export const deleteMemorySchema = {
  id: z.string().uuid().describe("UUID of the memory to delete"),
};

export async function deleteMemoryHandler(args: z.infer<z.ZodObject<typeof deleteMemorySchema>>) {
  const result = await apiCall("DELETE", `/memories/${args.id}`);
  return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
}
