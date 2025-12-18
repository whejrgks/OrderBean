#!/usr/bin/env python3
"""FastAPI 서버 실행 스크립트"""
import uvicorn
from app.config import SERVER_HOST, SERVER_PORT, IS_DEV

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=SERVER_HOST,
        port=SERVER_PORT,
        reload=IS_DEV,  # 개발 모드: 코드 변경 시 자동 재시작
    )

