"""로깅 유틸리티"""
import logging
import sys
from app.config import IS_DEV

# 로거 설정
logger = logging.getLogger("orderbean")
logger.setLevel(logging.DEBUG if IS_DEV else logging.INFO)

# 콘솔 핸들러
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG if IS_DEV else logging.INFO)

# 포맷터
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)

logger.addHandler(handler)

