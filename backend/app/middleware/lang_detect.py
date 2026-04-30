from langdetect import detect, LangDetectException


def detect_language(text: str) -> str:
    try:
        lang = detect(text)
        return "en" if lang == "en" else "es"
    except LangDetectException:
        return "es"
