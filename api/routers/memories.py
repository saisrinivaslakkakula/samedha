import psycopg2.extras
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse
from models.memory import MemoryCreate, MemoryUpdate
from services import embeddings as emb_service
from services import search as search_service
from db.neon import get_conn, to_dict, vec_str
from auth import verify_api_key

router = APIRouter(prefix="/memories", tags=["memories"], dependencies=[Depends(verify_api_key)])


@router.post("", status_code=201)
async def save_memory(payload: MemoryCreate):
    vector = await emb_service.generate_embedding(payload.content)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                """INSERT INTO memories (content, summary, embedding, source, domain, tags, importance, session_id)
                   VALUES (%s, %s, %s::vector, %s, %s, %s, %s, %s)
                   RETURNING id, created_at""",
                (payload.content, payload.summary, vec_str(vector), payload.source,
                 payload.domain, payload.tags, payload.importance, payload.session_id),
            )
            saved = to_dict(cur.fetchone())
    return {"id": saved["id"], "created_at": saved["created_at"], "status": "saved"}


@router.get("/search")
async def search_memories(
    q: str, limit: int = 10, domain: str = None, source: str = None, min_importance: int = None
):
    return await search_service.semantic_search(q, limit, domain, source, min_importance)


@router.get("/recent")
async def recent_memories(limit: int = 20, domain: str = None, source: str = None):
    return await search_service.get_recent(limit, domain, source)


@router.get("/context")
async def get_context(
    limit: int = 15, domain: str = None, source: str = None, min_importance: int = None
):
    """Compact plain-text memory dump ordered by importance DESC, recency DESC.
    Use instead of /recent to avoid ResponseTooLargeError in ChatGPT Actions.
    """
    conditions, params = [], []
    if domain:
        conditions.append("domain = %s")
        params.append(domain)
    if source:
        conditions.append("source = %s")
        params.append(source)
    if min_importance:
        conditions.append("importance >= %s")
        params.append(min_importance)
    where = ("WHERE " + " AND ".join(conditions)) if conditions else ""
    params.append(limit)
    sql = (
        "SELECT content, summary, domain, source, importance, tags, created_at FROM memories "
        f"{where} ORDER BY importance DESC, created_at DESC LIMIT %s"
    )
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql, params)
            rows = [to_dict(r) for r in cur.fetchall()]

    if not rows:
        return PlainTextResponse("No memories found.")

    lines = [f"=== Second Brain Context ({len(rows)} memories) ===\n"]
    for r in rows:
        tags = ", ".join(r.get("tags") or [])
        lines.append(f"[{r['domain'].upper()}] (importance: {r['importance']}, source: {r['source']})")
        lines.append(f"Summary: {r.get('summary') or ''}")
        lines.append(f"Detail: {r.get('content', '')}")
        if tags:
            lines.append(f"Tags: {tags}")
        lines.append("")
    return PlainTextResponse("\n".join(lines))


@router.get("/export")
async def export_memories():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                "SELECT id, content, summary, source, domain, tags, importance, "
                "created_at, updated_at, session_id, related_ids, metadata FROM memories"
            )
            rows = [to_dict(r) for r in cur.fetchall()]
    return JSONResponse(
        content=rows,
        headers={"Content-Disposition": "attachment; filename=second_brain_export.json"},
    )


@router.patch("/{memory_id}")
async def update_memory(memory_id: str, payload: MemoryUpdate):
    updates = payload.model_dump(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    if "content" in updates:
        updates["embedding"] = await emb_service.generate_embedding(updates["content"])

    # Keys come from MemoryUpdate field names only — not user-controlled, safe for f-string
    set_parts, values = [], []
    for key, val in updates.items():
        if key == "embedding":
            set_parts.append("embedding = %s::vector")
            values.append(vec_str(val))
        else:
            set_parts.append(f"{key} = %s")
            values.append(val)
    values.append(memory_id)

    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                f"UPDATE memories SET {', '.join(set_parts)} WHERE id = %s::uuid RETURNING id",
                values,
            )
            row = cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Memory not found")
    return {"id": memory_id, "status": "updated"}


@router.delete("/{memory_id}")
async def delete_memory(memory_id: str):
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("DELETE FROM memories WHERE id = %s::uuid RETURNING id", (memory_id,))
            row = cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Memory not found")
    return {"id": memory_id, "status": "deleted"}
