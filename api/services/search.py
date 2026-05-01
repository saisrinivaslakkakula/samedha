from db.supabase import get_client
from services.embeddings import generate_embedding


async def semantic_search(
    query: str,
    limit: int = 10,
    domain: str | None = None,
    source: str | None = None,
    min_importance: int | None = None,
) -> list[dict]:
    embedding = await generate_embedding(query)
    client = get_client()
    # Calls the match_memories RPC function defined in schema.sql
    params: dict = {"query_embedding": embedding, "match_count": limit}
    if domain:
        params["filter_domain"] = domain
    if source:
        params["filter_source"] = source
    if min_importance:
        params["filter_min_importance"] = min_importance
    result = client.rpc("match_memories", params).execute()
    return result.data or []


async def get_recent(
    limit: int = 20,
    domain: str | None = None,
    source: str | None = None,
) -> list[dict]:
    client = get_client()
    query = client.table("memories").select("*").order("created_at", desc=True).limit(limit)
    if domain:
        query = query.eq("domain", domain)
    if source:
        query = query.eq("source", source)
    result = query.execute()
    return result.data or []
