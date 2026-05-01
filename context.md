# Second Brain — Project Context

> Living document. Update at every milestone or checkpoint.
> Last updated: 2025 (Phase 1 kickoff — project scaffold)

---

## What This Project Is

A self-hosted **Personal AI Memory Layer** — a REST API + vector database that acts as persistent memory across Claude, ChatGPT (Neo Coach), and Gemini. Every insight, project decision, or career reflection saved from any AI tool goes into a single Supabase store the user owns. AI tools are clients of your brain, not the other way around.

---

## Architecture at a Glance

```
AI Tools (Claude / ChatGPT / Gemini)
        │
        ▼
[FastAPI REST API]  ──── bearer token auth
        │
        ├── POST /memories         → save + embed
        ├── GET  /memories/search  → semantic search (pgvector cosine)
        ├── GET  /memories/recent  → latest N memories
        ├── PATCH /memories/{id}   → update
        ├── DELETE /memories/{id}  → delete
        └── GET /memories/export   → full JSON export
        │
        ▼
[Supabase] (Postgres + pgvector)
        │
        └── memories table (content, embedding vector(1536), domain, tags, importance, ...)

Embeddings: OpenAI text-embedding-3-small
Hosting: Railway or Render
Claude integration: MCP Server (TypeScript, stdio transport)
ChatGPT integration: Custom GPT Action (OpenAPI 3.0 spec)
Gemini: Gemini API function calling (or manual REST fallback for MVP)
```

---

## Key Decisions & Rationale

| Decision | Choice | Why |
|---|---|---|
| Database | Supabase | Postgres + pgvector in one; free tier generous |
| Embeddings | text-embedding-3-small | Cheap (~$0.02/1M tokens), high quality, easy to swap |
| API framework | FastAPI (Python) | Async, auto OpenAPI docs, minimal boilerplate |
| Hosting | Railway or Render | Zero-ops, free tier, ~$5–10/mo always-on |
| Auth | Static bearer token (env var) | Simple for single-user MVP, no OAuth overhead |
| Claude integration | MCP Server (TypeScript) | Native tool-calling, API key never leaves local machine |

---

## Project Structure

```
SaMedha/
├── api/                        # FastAPI application
│   ├── main.py                 # Entry point
│   ├── auth.py                 # API key verification dependency
│   ├── routers/
│   │   └── memories.py         # All /memories endpoints
│   ├── services/
│   │   ├── embeddings.py       # OpenAI embedding calls
│   │   └── search.py           # pgvector semantic search
│   ├── models/
│   │   └── memory.py           # Pydantic request/response models
│   ├── db/
│   │   ├── supabase.py         # Supabase client singleton
│   │   └── schema.sql          # Run once in Supabase SQL editor
│   ├── requirements.txt
│   └── Dockerfile
├── mcp-server/                 # Claude MCP integration (TypeScript)
│   ├── src/
│   │   ├── index.ts            # MCP server entry point
│   │   ├── api.ts              # Shared HTTP client for REST API
│   │   └── tools/
│   │       ├── saveMemory.ts
│   │       ├── searchMemory.ts
│   │       ├── getRecentContext.ts
│   │       ├── updateMemory.ts
│   │       └── deleteMemory.ts
│   ├── mcp_config_example.json # Paste into Claude desktop config
│   ├── package.json
│   └── tsconfig.json
├── openapi/
│   └── second_brain_api.yaml   # OpenAPI 3.0 spec for ChatGPT Action
├── .env                        # Local secrets — never commit
├── .gitignore
└── context.md                  # This file
```

---

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `SUPABASE_URL` | Yes | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (not anon key) |
| `OPENAI_API_KEY` | Yes | For embedding generation |
| `SECOND_BRAIN_API_KEY` | Yes | Static bearer token you generate (`openssl rand -hex 32`) |
| `PORT` | No | Default: 8000 |
| `EMBEDDING_MODEL` | No | Default: `text-embedding-3-small` |
| `SECOND_BRAIN_API_URL` | MCP only | Base URL of deployed API |

---

## Build Phases

### Phase 1 — Foundation ✅ COMPLETE (commit 7956373)
- [x] PRD written
- [x] Project scaffold created (skeleton code, git initialized)
- [x] Supabase project created + pgvector enabled
- [x] Run `schema.sql` in Supabase SQL editor
- [x] Fill in `.env` with Supabase + OpenAI credentials
- [x] FastAPI endpoints fully implemented (embeddings + pgvector search)
- [x] All 6 endpoints validated end-to-end (save, search, recent, update, delete, export)
- [ ] Deploy API to Railway
- [ ] Build + configure MCP server for Claude
- [ ] End-to-end test: save from Claude → retrieve from Claude

### Phase 2 — ChatGPT Integration (Week 2) ← NEXT
- [ ] Finalize OpenAPI 3.0 spec
- [ ] Add Action to Neo Coach GPT
- [ ] Migrate existing Neo Coach knowledge into Second Brain
- [ ] Cross-tool test: save from Claude → retrieve in ChatGPT

### Phase 3 — Hardening & UX (Weeks 3–4)
- [ ] Minimal web dashboard (Next.js or plain HTML)
- [ ] Deduplication check on POST /memories (similarity > 0.95 warning)
- [ ] Gemini integration (API function calling)
- [ ] End-to-end tests for all endpoints
- [ ] Automated weekly JSON export → Google Drive

---

## Current Status

**Phase 1 complete.** All API endpoints working and validated locally against live Supabase.
Next action: deploy API to Railway, then wire MCP server for Claude.

---

## Bugs Fixed (Phase 1)

| Bug | Root Cause | Fix |
|---|---|---|
| `POST /memories` returning 307 redirect | FastAPI's default `redirect_slashes=True` drops POST body on redirect | Set `redirect_slashes=False` on FastAPI app; changed route decorator from `"/"` to `""` |
| Semantic search returning 0 results | `ivfflat` index with `lists=100` only probes 1 cluster — misses all rows when dataset < 100 rows | Replaced `ivfflat` with `hnsw` index which works correctly at any dataset size |
| supabase-py RPC vector type mismatch | `supabase-py` doesn't auto-serialize Python `list[float]` to pgvector string | Manually serialize embedding as `"[f1,f2,...]"` string before passing to RPC |

---

## Notes & Gotchas

- Supabase **service role key** (not anon key) is required — anon key doesn't have write access for server-side ops.
- pgvector must be enabled in Supabase: `Extensions → vector → Enable`.
- The MCP server runs locally via stdio — the API key is injected via env, never sent through Claude's servers.
- Generate `SECOND_BRAIN_API_KEY` locally: `openssl rand -hex 32`
- The `metadata JSONB` column in the memories table future-proofs the schema — any per-source fields go there without migrations.
- `SUPABASE_URL` must be the project REST URL (`https://xxx.supabase.co`), NOT the PostgreSQL connection string.
- Run `uvicorn` from the `api/` directory with `PYTHONPATH=.` so relative imports resolve correctly.
- Start server: `cd api && PYTHONPATH=. ../.venv/bin/uvicorn main:app --reload`
