import json
from typing import Optional
from mcp.server.fastmcp import FastMCP
from services.embeddings import generate_embedding
from services.search import semantic_search, get_recent
from db.supabase import get_client

# host="0.0.0.0" disables FastMCP's localhost-only DNS rebinding protection,
# which would otherwise reject requests from samedha.onrender.com with HTTP 421.
# streamable_http_path="/" so mounting at /mcp yields /mcp/ (not /mcp/mcp/).
mcp = FastMCP("second-brain", host="0.0.0.0", streamable_http_path="/")


@mcp.tool()
async def save_memory(
    content: str,
    source: str,
    domain: str,
    tags: Optional[list[str]] = None,
    importance: int = 3,
    summary: Optional[str] = None,
    session_id: Optional[str] = None,
) -> str:
    """Save a valuable insight, decision, or piece of knowledge to the Second Brain.
    source: claude | chatgpt | gemini | manual
    domain: career | project | research | learning | personal | meta
    importance: 1 (low) to 5 (critical)
    """
    vector = await generate_embedding(content)
    client = get_client()
    row = {
        "content": content,
        "summary": summary,
        "embedding": vector,
        "source": source,
        "domain": domain,
        "tags": tags or [],
        "importance": importance,
        "session_id": session_id,
    }
    result = client.table("memories").insert(row).execute()
    if not result.data:
        return "Error: Failed to save memory"
    saved = result.data[0]
    return f"Saved memory {saved['id']} at {saved['created_at']}"


@mcp.tool()
async def search_memory(
    q: str,
    limit: int = 10,
    domain: Optional[str] = None,
    source: Optional[str] = None,
    min_importance: Optional[int] = None,
) -> str:
    """Semantically search the Second Brain for memories relevant to a natural language query."""
    results = await semantic_search(q, limit, domain, source, min_importance)
    if not results:
        return "No memories found matching that query."
    return json.dumps(results, default=str)


@mcp.tool()
async def get_recent_context(
    limit: int = 20,
    domain: Optional[str] = None,
    source: Optional[str] = None,
) -> str:
    """Retrieve the most recent memories to bootstrap context at the start of a session."""
    results = await get_recent(limit, domain, source)
    if not results:
        return "No memories found."
    return json.dumps(results, default=str)


@mcp.tool()
async def update_memory(
    id: str,
    content: Optional[str] = None,
    tags: Optional[list[str]] = None,
    importance: Optional[int] = None,
    domain: Optional[str] = None,
    summary: Optional[str] = None,
) -> str:
    """Update an existing memory by ID — refine content, tags, importance, or domain."""
    client = get_client()
    updates: dict = {}
    if content is not None:
        updates["content"] = content
        updates["embedding"] = await generate_embedding(content)
    if tags is not None:
        updates["tags"] = tags
    if importance is not None:
        updates["importance"] = importance
    if domain is not None:
        updates["domain"] = domain
    if summary is not None:
        updates["summary"] = summary
    if not updates:
        return "No fields to update."
    result = client.table("memories").update(updates).eq("id", id).execute()
    if not result.data:
        return f"Memory {id} not found"
    return f"Updated memory {id}"


@mcp.tool()
async def delete_memory(id: str) -> str:
    """Permanently delete a memory by ID."""
    client = get_client()
    result = client.table("memories").delete().eq("id", id).execute()
    if not result.data:
        return f"Memory {id} not found"
    return f"Deleted memory {id}"
