from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    groq_api_key: str
    telegram_bot_token: str
    frontend_url: str = "*"
    port: int = 8000

    class Config:
        env_file = ".env"


settings = Settings()
