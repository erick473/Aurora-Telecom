import json
from pathlib import Path
from datetime import datetime

# JSON Lines: un objeto JSON por línea, append-only.
# Ventaja sobre un JSON array: O(1) en escritura sin importar el tamaño del archivo.
# Compatible con pandas, jq, grep y cualquier herramienta de análisis.
LOG_PATH = Path(__file__).parent.parent.parent / "logs" / "conversations.jsonl"


def log_conversation(data: dict) -> None:
    LOG_PATH.parent.mkdir(exist_ok=True)

    entry = {
        "timestamp": datetime.now().isoformat(),
        "user_id": data.get("user_id"),
        "channel": data.get("channel", "web"),
        "language": data.get("language", "es"),
        "user_message": data.get("user_message"),
        "bot_response": data.get("bot_response"),
        "chunks_used": data.get("chunks_used", []),
        "human_escalation": data.get("human_escalation", False),
        "intent": data.get("intent", {}),
        "guardrail_triggered": data.get("guardrail_triggered", False),
    }

    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
