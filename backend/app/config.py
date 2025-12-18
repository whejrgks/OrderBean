"""애플리케이션 설정"""
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

# 데이터베이스 설정
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")

# CORS 설정
ALLOWED_ORIGINS: List[str] = os.getenv(
    "ALLOWED_ORIGINS", 
    "http://localhost:5173,http://localhost:3000"
).split(",")

# 서버 설정
SERVER_HOST = os.getenv("SERVER_HOST", "0.0.0.0")
SERVER_PORT = int(os.getenv("SERVER_PORT", "5000"))

# 환경 설정
ENV = os.getenv("ENV", "development")
IS_DEV = ENV == "development"
IS_PROD = ENV == "production"

# 기본 고객 ID
DEFAULT_CUSTOMER_ID = "anonymous"

