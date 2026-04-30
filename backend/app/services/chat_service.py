"""
Lógica central del asistente Aurora.
Compartida por el endpoint REST (/api/chat) y el bot de Telegram,
garantizando que ambos canales tengan el mismo comportamiento.
"""
import json
from dataclasses import dataclass

from app.rag.retriever import retrieve
from app.llm.groq_client import chat as llm_chat
from app.middleware.guardrails import check_guardrails
from app.middleware.lang_detect import detect_language
from app.middleware.intent_detect import detect_intent
from app.tools.mock_balance import get_balance
from app.utils.logger import log_conversation


@dataclass
class ChatResult:
    response: str
    language: str
    human_escalation: bool
    guardrail_triggered: bool


async def process_message(user_id: str, message: str, channel: str = "web") -> ChatResult:
    """
    Ejecuta el pipeline completo: guardrails → idioma → intención →
    RAG → LLM → logging. Devuelve un ChatResult listo para enviar al usuario.
    """
    # 1. Guardrails
    guard = check_guardrails(message)
    if guard["blocked"]:
        log_conversation({
            "user_id": user_id,
            "channel": channel,
            "user_message": message,
            "bot_response": guard["response"],
            "guardrail_triggered": True,
        })
        return ChatResult(
            response=guard["response"],
            language="es",
            human_escalation=False,
            guardrail_triggered=True,
        )

    # 2. Detectar idioma
    language = detect_language(message)

    # 3. Detectar intención
    intent = detect_intent(message)

    # 4. Function calling mock (solo afecta al contexto del LLM, no al RAG)
    llm_extra = ""
    if intent["wants_balance"]:
        balance_data = get_balance()
        llm_extra = f"\n[SALDO DEL CLIENTE]: {json.dumps(balance_data, ensure_ascii=False)}"

    # 5. RAG — buscar con el mensaje original limpio
    chunks = retrieve(message)

    # 6. LLM
    response = await llm_chat(
        user_id=user_id,
        message=message + llm_extra,
        context_chunks=chunks,
        language=language,
    )

    human_escalation = "[ESCALAR_HUMANO]" in response or intent["wants_human"]
    response_clean = response.replace("[ESCALAR_HUMANO]", "").strip()

    # 7. Logger
    log_conversation({
        "user_id": user_id,
        "channel": channel,
        "language": language,
        "user_message": message,
        "bot_response": response_clean,
        "chunks_used": [c["source"] for c in chunks],
        "human_escalation": human_escalation,
        "intent": intent,
    })

    return ChatResult(
        response=response_clean,
        language=language,
        human_escalation=human_escalation,
        guardrail_triggered=False,
    )
