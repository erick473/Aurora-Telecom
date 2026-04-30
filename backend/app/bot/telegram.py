from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from app.config import settings
from app.services.chat_service import process_message


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Hola, soy Aurora, asistente de soporte de Aurora Telecom.\n\n"
        "Puedo ayudarte con:\n"
        "• Planes móviles y de internet\n"
        "• Cobertura en tu zona\n"
        "• Facturación y pagos\n"
        "• Soporte técnico\n"
        "• Cancelaciones y políticas\n\n"
        "¿En qué te puedo apoyar?"
    )


async def reset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from app.llm.groq_client import conversation_memory
    user_id = str(update.effective_user.id)
    conversation_memory.pop(user_id, None)
    await update.message.reply_text("Historial limpiado. Empecemos de nuevo.")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = str(update.effective_user.id)
    message = update.message.text

    await context.bot.send_chat_action(update.effective_chat.id, "typing")

    try:
        result = await process_message(
            user_id=user_id,
            message=message,
            channel="telegram",
        )
    except Exception:
        await update.message.reply_text(
            "Tuve un problema al procesar tu mensaje. Intenta de nuevo en un momento."
        )
        return

    reply = result.response
    if result.human_escalation:
        reply += "\n\nTambién puedes contactarnos directamente:\n• WhatsApp: 33-9876-5432\n• Teléfono: 33-1234-5678"

    await update.message.reply_text(reply)


def create_bot_app() -> Application:
    app = Application.builder().token(settings.telegram_bot_token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("reset", reset))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    return app
