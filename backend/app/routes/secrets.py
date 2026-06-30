import json
import secrets

from fastapi import APIRouter, HTTPException

from app.redis_client import redis_client
from app.schemas.secret import CreateSecretRequest
from app.services.redis_scripts import (
    READ_AND_DELETE_SCRIPT
)

read_and_delete = redis_client.register_script(
    READ_AND_DELETE_SCRIPT
)

router = APIRouter()

@router.post("/secrets")
def create_secret(request: CreateSecretRequest):

    secret_id = secrets.token_urlsafe(32)

    data = {
        "ciphertext": request.ciphertext,
        "nonce": request.nonce,
        "views_remaining": request.views
    }

    redis_client.set(
        f"secret:{secret_id}",
        json.dumps(data),
        ex=request.ttl
    )

    return {
        "id": secret_id
    }

@router.get("/secrets/{secret_id}")
def get_secret(secret_id: str):

    key = f"secret:{secret_id}"

    data = read_and_delete(
        keys=[key]
    )

    if not data:
        raise HTTPException(
            status_code=404,
            detail="Secret not found"
        )

    return json.loads(data)