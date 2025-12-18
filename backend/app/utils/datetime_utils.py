"""날짜/시간 유틸리티"""
from datetime import datetime
from typing import Optional


def get_current_utc_time() -> datetime:
    """현재 UTC 시간을 반환합니다.
    
    Returns:
        현재 UTC datetime 객체
    """
    return datetime.utcnow()


def format_datetime_iso(dt: Optional[datetime] = None) -> str:
    """datetime을 ISO 형식 문자열로 변환합니다.
    
    Args:
        dt: 변환할 datetime 객체 (None이면 현재 시간 사용)
        
    Returns:
        ISO 형식 문자열
    """
    if dt is None:
        dt = get_current_utc_time()
    return dt.isoformat()

