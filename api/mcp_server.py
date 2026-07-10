import json
import psycopg2.extras
from typing import Optional
from mcp.server.fastmcp import FastMCP
from services.embeddings import generate_embedding
from services.search import semantic_search, get_recent
from db.neon import get_conn, to_dict, vec_str

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
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                """INSERT INTO memories (content, summary, embedding, source, domain, tags, importance, session_id)
                   VALUES (%s, %s, %s::vector, %s, %s, %s, %s, %s)
                   RETURNING id, created_at""",
                (content, summary, vec_str(vector), source, domain, tags or [], importance, session_id),
            )
            saved = to_dict(cur.fetchone())
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

    set_parts, values = [], []
    for key, val in updates.items():
        if key == "embedding":
            set_parts.append("embedding = %s::vector")
            values.append(vec_str(val))
        else:
            set_parts.append(f"{key} = %s")
            values.append(val)
    values.append(id)

    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                f"UPDATE memories SET {', '.join(set_parts)} WHERE id = %s::uuid RETURNING id",
                values,
            )
            row = cur.fetchone()
    if not row:
        return f"Memory {id} not found"
    return f"Updated memory {id}"


@mcp.tool()
async def delete_memory(id: str) -> str:
    """Permanently delete a memory by ID."""
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("DELETE FROM memories WHERE id = %s::uuid RETURNING id", (id,))
            row = cur.fetchone()
    if not row:
        return f"Memory {id} not found"
    return f"Deleted memory {id}"
