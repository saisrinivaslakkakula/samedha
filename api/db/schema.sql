-- Run this once in the Supabase SQL editor after enabling the pgvector extension.
-- Extensions → vector → Enable (do this in the Supabase dashboard first)

create extension if not exists vector;

create table if not exists memories (
  id           uuid primary key default gen_random_uuid(),
  content      text not null,
  summary      text,
  embedding    vector(1536),                    -- OpenAI text-embedding-3-small dimension
  source       text not null,                   -- 'claude' | 'chatgpt' | 'gemini' | 'manual'
  domain       text,                            -- 'career' | 'project' | 'research' | 'learning' | 'personal' | 'meta'
  tags         text[],
  importance   smallint default 3 check (importance between 1 and 5),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now(),
  session_id   text,
  related_ids  uuid[],
  metadata     jsonb default '{}'
);

-- Cosine similarity index for fast semantic search
create index if not exists memories_embedding_idx
  on memories using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Keep updated_at in sync automatically
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger memories_updated_at
  before update on memories
  for each row execute function update_updated_at();

-- RPC function used by the API for semantic search with optional filters
create or replace function match_memories(
  query_embedding    vector(1536),
  match_count        int default 10,
  filter_domain      text default null,
  filter_source      text default null,
  filter_min_importance int default null
)
returns table (
  id           uuid,
  content      text,
  summary      text,
  source       text,
  domain       text,
  tags         text[],
  importance   smallint,
  created_at   timestamptz,
  updated_at   timestamptz,
  session_id   text,
  metadata     jsonb,
  similarity   float
)
language plpgsql as $$
begin
  return query
  select
    m.id, m.content, m.summary, m.source, m.domain, m.tags,
    m.importance, m.created_at, m.updated_at, m.session_id, m.metadata,
    1 - (m.embedding <=> query_embedding) as similarity
  from memories m
  where
    (filter_domain is null or m.domain = filter_domain)
    and (filter_source is null or m.source = filter_source)
    and (filter_min_importance is null or m.importance >= filter_min_importance)
  order by m.embedding <=> query_embedding
  limit match_count;
end;
$$;
