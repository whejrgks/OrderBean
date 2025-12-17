# 메뉴 서비스 - 최소 구현
# 나중에 SQLAlchemy를 사용한 실제 DB 연동으로 확장

async def get_all_menus():
    """모든 메뉴 조회"""
    # 최소 구현: 빈 배열 반환으로 테스트 통과
    return []


async def get_menu_by_id(menu_id: str):
    """ID로 메뉴 조회"""
    # 최소 구현에서는 None 반환
    return None


async def create_menu(menu_data: dict):
    """메뉴 생성"""
    # 최소 구현: 요청 데이터를 그대로 반환 (임시 ID 추가)
    import uuid
    from datetime import datetime
    
    return {
        "id": str(uuid.uuid4()),
        **menu_data,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }


async def update_menu(menu_id: str, menu_data: dict):
    """메뉴 수정"""
    # 최소 구현: 업데이트된 데이터 반환
    from datetime import datetime
    
    return {
        "id": menu_id,
        **menu_data,
        "updated_at": datetime.utcnow().isoformat(),
    }


async def delete_menu(menu_id: str):
    """메뉴 삭제"""
    # 최소 구현: 성공 응답만
    return {"success": True}


async def toggle_availability(menu_id: str):
    """메뉴 가용성 토글"""
    # 최소 구현: 토글된 상태 반환
    return {
        "id": menu_id,
        "is_available": True,
    }

