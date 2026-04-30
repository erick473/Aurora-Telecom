from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.services.chat_service import process_message

router = APIRouter()


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    user_id: str = Field(..., min_length=1, max_length=128)
    session_id: str | None = None


class ChatResponse(BaseModel):
    response: str
    language: str
    human_escalation: bool


@router.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    try:
        result = await process_message(
            user_id=req.user_id,
            message=req.message,
            channel="web",
        )
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="El servicio de IA no está disponible en este momento. Intenta de nuevo en unos segundos."
        ) from exc

    return ChatResponse(
        response=result.response,
        language=result.language,
        human_escalation=result.human_escalation,
    )
