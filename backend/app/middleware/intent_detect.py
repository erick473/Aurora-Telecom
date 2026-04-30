HUMAN_KEYWORDS = [
    "hablar con humano", "agente humano", "agente real", "persona real",
    "hablar con alguien", "quiero un agente", "comunicarme con alguien",
    "speak to agent", "human agent", "talk to someone", "real person"
]

BALANCE_KEYWORDS = [
    "cuánto debo", "mi saldo", "consultar saldo", "ver mi saldo",
    "cuánto tengo", "mi deuda", "mi adeudo", "check my balance", "my balance"
]


def detect_intent(message: str) -> dict:
    msg_lower = message.lower()
    return {
        "wants_human": any(kw in msg_lower for kw in HUMAN_KEYWORDS),
        "wants_balance": any(kw in msg_lower for kw in BALANCE_KEYWORDS)
    }
