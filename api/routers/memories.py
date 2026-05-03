from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse
from models.memory import MemoryCreate, MemoryUpdate, MemoryResponse
from services import embeddings as emb_service
from services import search as search_service
from db.supabase import get_client
from auth import verify_api_key

router = APIRouter(prefix="/memories", tags=["memories"], dependencies=[Depends(verify_api_key)])


@router.post("", status_code=201)
async def save_memory(payload: MemoryCreate):
    vector = await emb_service.generate_embedding(payload.content)
    client = get_client()
    row = {
        "content": payload.content,
        "summary": payload.summary,
        "embedding": vector,
        "source": payload.source,
        "domain": payload.domain,
        "tags": payload.tags,
        "importance": payload.importance,
        "session_id": payload.session_id,
    }
    result = client.table("memories").insert(row).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to save memory")
    saved = result.data[0]
    return {"id": saved["id"], "created_at": saved["created_at"], "status": "saved"}


@router.get("/search")
async def search_memories(
    q: str,
    limit: int = 10,
    domain: str = None,
    source: str = None,
    min_importance: int = None,
):
    results = await search_service.semantic_search(q, limit, domain, source, min_importance)
    return results


@router.get("/recent")
async def recent_memories(limit: int = 20, domain: str = None, source: str = None):
    results = await search_service.get_recent(limit, domain, source)
    return results


@router.get("/context")
async def get_context(
    limit: int = 15,
    domain: str = None,
    source: str = None,
    min_importance: int = None,
):
    """Returns all recent memories as a single compact plain-text block.
    Ordered by importance DESC then recency DESC.
    Use this instead of /recent to avoid ResponseTooLargeError in ChatGPT Actions.
    """
    client = get_client()
    query = (
        client.table("memories")
        .select("content, summary, domain, source, importance, tags, created_at")
        .order("importance", desc=True)
        .order("created_at", desc=True)
        .limit(limit)
    )
    if domain:
        query = query.eq("domain", domain)
    if source:
        query = query.eq("source", source)
    if min_importance:
        query = query.gte("importance", min_importance)

    result = query.execute()
    rows = result.data or []

    if not rows:
        return PlainTextResponse("No memories found.")

    lines = [f"=== Second Brain Context ({len(rows)} memories) ===\n"]
    for r in rows:
        tags = ", ".join(r.get("tags") or [])
        lines.append(
            f"[{r['domain'].upper()}] (importance: {r['importance']}, source: {r['source']})"
        )
        lines.append(f"Summary: {r.get('summary') or ''}")
        lines.append(f"Detail: {r.get('content', '')}")
        if tags:
            lines.append(f"Tags: {tags}")
        lines.append("")  # blank line between memories

    return PlainTextResponse("\n".join(lines))


@router.get("/export")
async def export_memories():
    client = get_client()
    # Exclude embedding vectors — too large, can be regenerated
    result = client.table("memories").select(
        "id, content, summary, source, domain, tags, importance, created_at, updated_at, session_id, related_ids, metadata"
    ).execute()
    return JSONResponse(
        content=result.data or [],
        headers={"Content-Disposition": "attachment; filename=second_brain_export.json"},
    )


@router.patch("/{memory_id}")
async def update_memory(memory_id: str, payload: MemoryUpdate):
    client = get_client()
    updates = payload.model_dump(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    # Regenerate embedding if content changed
    if "content" in updates:
        updates["embedding"] = await emb_service.generate_embedding(updates["content"])
    result = client.table("memories").update(updates).eq("id", memory_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Memory not found")
    return {"id": memory_id, "status": "updated"}


@router.delete("/{memory_id}")
async def delete_memory(memory_id: str):
    client = get_client()
    result = client.table("memories").delete().eq("id", memory_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Memory not found")
    return {"id": memory_id, "status": "deleted"}
