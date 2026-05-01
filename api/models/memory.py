from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime

VALID_SOURCES = {"claude", "chatgpt", "gemini", "manual"}
VALID_DOMAINS = {"career", "project", "research", "learning", "personal", "meta"}


class MemoryCreate(BaseModel):
    content: str
    source: str = Field(..., description="claude | chatgpt | gemini | manual")
    domain: str = Field(..., description="career | project | research | learning | personal | meta")
    tags: Optional[List[str]] = []
    importance: Optional[int] = Field(default=3, ge=1, le=5)
    summary: Optional[str] = None
    session_id: Optional[str] = None


class MemoryUpdate(BaseModel):
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    importance: Optional[int] = Field(default=None, ge=1, le=5)
    domain: Optional[str] = None
    summary: Optional[str] = None


class MemoryResponse(BaseModel):
    id: str
    content: str
    summary: Optional[str] = None
    source: str
    domain: str
    tags: Optional[List[str]] = None
    importance: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    session_id: Optional[str] = None
    similarity: Optional[float] = None
    metadata: Optional[Any] = None
