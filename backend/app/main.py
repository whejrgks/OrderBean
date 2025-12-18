from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import menus, orders, admin
from app.config import ALLOWED_ORIGINS, IS_DEV, SERVER_HOST, SERVER_PORT

# FastAPI 앱 생성
app = FastAPI(
    title="OrderBean API",
    description="커피 주문 서비스 API",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if not IS_DEV else ["*"],  # 개발 환경에서만 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(menus.router, prefix="/api/menus", tags=["menus"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])


@app.get("/health")
async def health_check():
    """Health check 엔드포인트"""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=SERVER_HOST, port=SERVER_PORT)

