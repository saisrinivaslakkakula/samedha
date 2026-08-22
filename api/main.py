import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
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

# Protect the /mcp endpoint with the same bearer token used by the REST API.
# Accepts either:
#   Authorization: Bearer <key>   (Claude Code CLI / MCP clients)
#   ?key=<key>                    (claude.ai browser connector — no custom header support)
# OPTIONS preflight must be allowed through without auth — browsers send preflight
# without credentials and need CORS headers back before making the real request.
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Mcp-Session-Id, Accept",
    "Access-Control-Max-Age": "86400",
}

@app.middleware("http")
async def mcp_auth(request: Request, call_next):
    if request.url.path.startswith("/mcp"):
        if request.method == "OPTIONS":
            return Response(status_code=200, headers=CORS_HEADERS)
        expected = os.getenv("SECOND_BRAIN_API_KEY", "")
        bearer = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
        query_key = request.query_params.get("key", "")
        if bearer != expected and query_key != expected:
            return JSONResponse({"detail": "Unauthorized"}, status_code=401)
    return await call_next(request)

app.include_router(memories.router, prefix="/api/v1")
app.mount("/mcp", _mcp_http_app)


@app.get("/health")
def health():
    try:
        from db.neon import get_conn
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
    except Exception as e:
        return {"status": "error", "db": str(e)}
    return {"status": "ok"}
