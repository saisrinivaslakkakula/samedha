import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import memories
from mcp_server import mcp

# Build the MCP ASGI sub-app once at startup so the session manager is initialized
_mcp_http_app = mcp.streamable_http_app()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # FastAPI does not propagate lifespan to mounted sub-apps,
    # so we manually run the MCP session manager's task group here.
    async with mcp.session_manager.run():
        yield


app = FastAPI(
    title="Second Brain API",
    version="1.0.0",
    redirect_slashes=False,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Protect the /mcp endpoint with the same bearer token used by the REST API
@app.middleware("http")
async def mcp_auth(request: Request, call_next):
    if request.url.path.startswith("/mcp"):
        auth = request.headers.get("Authorization", "")
        expected = f"Bearer {os.getenv('SECOND_BRAIN_API_KEY', '')}"
        if auth != expected:
            return JSONResponse({"detail": "Unauthorized"}, status_code=401)
    return await call_next(request)

app.include_router(memories.router, prefix="/api/v1")
app.mount("/mcp", _mcp_http_app)


@app.get("/health")
def health():
    return {"status": "ok"}
