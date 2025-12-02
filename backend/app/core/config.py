import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "Analytical Dashboard")
    VERSION: str = os.getenv("VERSION", "1.0.0")
    DESCRIPTION: str = os.getenv("DESCRIPTION", "A dashboard for analytical data visualization.")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() in ['true', '1', 't']
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your_secret_key")
    ALLOWED_HOSTS: list = os.getenv("ALLOWED_HOSTS", "").split(",")