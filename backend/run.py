#!/usr/bin/env python3
"""FastAPI 서버 실행 스크립트"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,  # 개발 모드: 코드 변경 시 자동 재시작
    )

