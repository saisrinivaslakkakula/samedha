import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { saveMemorySchema, saveMemoryHandler } from "./tools/saveMemory.js";
import { searchMemorySchema, searchMemoryHandler } from "./tools/searchMemory.js";
import { getRecentContextSchema, getRecentContextHandler } from "./tools/getRecentContext.js";
import { updateMemorySchema, updateMemoryHandler } from "./tools/updateMemory.js";
import { deleteMemorySchema, deleteMemoryHandler } from "./tools/deleteMemory.js";

const server = new McpServer({ name: "second-brain", version: "1.0.0" });

server.tool(
  "save_memory",
  "Save a valuable insight, decision, or piece of knowledge to the Second Brain.",
  saveMemorySchema,
  saveMemoryHandler,
);

server.tool(
  "search_memory",
  "Semantically search the Second Brain for memories relevant to a natural language query.",
  searchMemorySchema,
  searchMemoryHandler,
);

server.tool(
  "get_recent_context",
  "Retrieve the most recent memories to bootstrap context at the start of a session.",
  getRecentContextSchema,
  getRecentContextHandler,
);

server.tool(
  "update_memory",
  "Update an existing memory by ID — refine content, tags, importance, or domain.",
  updateMemorySchema,
  updateMemoryHandler,
);

server.tool(
  "delete_memory",
  "Permanently delete a memory by ID.",
  deleteMemorySchema,
  deleteMemoryHandler,
);

const transport = new StdioServerTransport();
await server.connect(transport);
