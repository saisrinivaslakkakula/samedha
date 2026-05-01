import os
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

_security = HTTPBearer()


def verify_api_key(credentials: HTTPAuthorizationCredentials = Security(_security)) -> str:
    expected = os.getenv("SECOND_BRAIN_API_KEY")
    if not expected or credentials.credentials != expected:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return credentials.credentials
