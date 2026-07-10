import psycopg2.extras
from db.neon import get_conn, to_dict, vec_str
from services.embeddings import generate_embedding


async def semantic_search(
    query: str,
    limit: int = 10,
    domain: str | None = None,
    source: str | None = None,
    min_importance: int | None = None,
) -> list[dict]:
    embedding = await generate_embedding(query)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM match_memories(%s::vector, %s, %s, %s, %s)",
                (vec_str(embedding), limit, domain, source, min_importance),
            )
            return [to_dict(r) for r in cur.fetchall()]


async def get_recent(
    limit: int = 20,
    domain: str | None = None,
    source: str | None = None,
) -> list[dict]:
    conditions, params = [], []
    if domain:
        conditions.append("domain = %s")
        params.append(domain)
    if source:
        conditions.append("source = %s")
        params.append(source)
    where = ("WHERE " + " AND ".join(conditions)) if conditions else ""
    params.append(limit)
    sql = (
        "SELECT id, content, summary, source, domain, tags, importance, "
        f"created_at, updated_at, session_id, metadata FROM memories "
        f"{where} ORDER BY created_at DESC LIMIT %s"
    )
    with get_conn() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql, params)
            return [to_dict(r) for r in cur.fetchall()]
