from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Generator
from app.config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator:
    """데이터베이스 세션 의존성
    
    Yields:
        데이터베이스 세션
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

