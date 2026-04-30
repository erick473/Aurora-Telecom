import random
from datetime import datetime, timedelta

MOCK_ACCOUNTS = {
    "default": {"plan": "Aurora Pro 450", "balance": 450.00, "status": "al corriente"},
    "1234":    {"plan": "Aurora Hogar 300", "balance": 0.00,   "status": "vencido"},
    "5678":    {"plan": "Aurora 200",       "balance": 200.00, "status": "prepago activo"},
}


def get_balance(phone_number: str = None) -> dict:
    """
    Simula consulta de saldo (function calling mock).
    Demuestra integración con sistemas externos como CRM o billing.
    """
    key = phone_number[-4:] if phone_number and len(phone_number) >= 4 else "default"
    account = MOCK_ACCOUNTS.get(key, MOCK_ACCOUNTS["default"])
    next_payment = (datetime.now() + timedelta(days=random.randint(5, 25))).strftime("%d/%m/%Y")

    return {
        "phone": phone_number or "***-***-****",
        "plan": account["plan"],
        "balance_due": account["balance"],
        "status": account["status"],
        "next_payment_date": next_payment,
        "currency": "MXN"
    }
