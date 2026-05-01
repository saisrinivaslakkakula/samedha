import os
from openai import AsyncOpenAI

_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")


async def generate_embedding(text: str) -> list[float]:
    response = await _client.embeddings.create(input=text, model=EMBEDDING_MODEL)
    return response.data[0].embedding
