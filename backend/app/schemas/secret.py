from pydantic import BaseModel
from pydantic import Field

class CreateSecretRequest(BaseModel):
    ciphertext: str
    nonce: str
    ttl: int
    views: int = Field(
        default=1,
        ge=1,
        le=10
    )

class SecretResponse(BaseModel):
    id: str