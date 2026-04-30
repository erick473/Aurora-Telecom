OFF_TOPIC_KEYWORDS = [
    "chiste", "joke", "receta de cocina", "política", "partido político",
    "película", "canción", "programar en python", "programar en javascript",
    "hack", "jailbreak", "olvida todo", "forget everything",
    "eres ahora", "you are now", "nuevo rol", "new role"
]

AURORA_KEYWORDS = [
    "plan", "precio", "saldo", "internet", "fibra", "móvil", "cobertura",
    "cancelar", "factura", "pago", "señal", "modem", "router", "soporte",
    "aurora", "contrato", "portabilidad", "esim", "sim", "datos", "recargar",
    "velocidad", "mbps", "prepago", "pospago", "roaming", "whatsapp",
    "coverage", "cancel", "payment", "invoice", "signal", "support", "plan"
]

# Patrones de inyección de prompt — expresiones completas para evitar falsos positivos.
# Ejemplo: "ignora" solo capturaba "ignoro cómo funciona mi plan" (usuario legítimo).
INJECTION_PATTERNS = [
    "ignora las instrucciones",
    "ignore instructions",
    "ignore your instructions",
    "ignore previous instructions",
    "instrucciones anteriores",
    "previous instructions",
    "override",
    "bypass",
    "system prompt",
    "actúa como",
    "act as if",
    "act as a",
    "pretend you are",
    "pretend to be",
    "simulate being",
    "jailbreak",
    "olvida todo lo anterior",
    "forget everything",
    "forget your instructions",
]


def check_guardrails(message: str) -> dict:
    msg_lower = message.lower()

    is_injection = any(pattern in msg_lower for pattern in INJECTION_PATTERNS)
    if is_injection:
        return {
            "blocked": True,
            "reason": "injection",
            "response": "Solo puedo ayudarte con temas relacionados a Aurora Telecom. ¿En qué te puedo apoyar?"
        }

    has_aurora_context = any(kw in msg_lower for kw in AURORA_KEYWORDS)
    has_off_topic = any(kw in msg_lower for kw in OFF_TOPIC_KEYWORDS)

    if has_off_topic and not has_aurora_context:
        return {
            "blocked": True,
            "reason": "off_topic",
            "response": "Mi especialidad es el soporte de Aurora Telecom. ¿Tienes alguna pregunta sobre tus servicios, planes o facturación?"
        }

    return {"blocked": False}
