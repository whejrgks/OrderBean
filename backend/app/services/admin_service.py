# 관리자 서비스 - 최소 구현
# 나중에 SQLAlchemy를 사용한 실제 DB 연동으로 확장

async def get_dashboard_stats():
    """대시보드 통계 조회"""
    # 최소 구현: 기본 통계 객체 반환
    # 이미지의 대시보드 통계 구조 반영
    return {
        "total_orders": 0,
        "pending_orders": 0,      # 주문 접수
        "preparing_orders": 0,    # 제조 중
        "ready_orders": 0,        # 제조 완료
        "completed_orders": 0,    # 픽업 완료
        "cancelled_orders": 0,    # 취소됨
    }


async def get_recent_orders(limit: int = None):
    """최근 주문 조회"""
    # 최소 구현: 빈 배열 반환
    # limit 파라미터는 나중에 사용
    return []

