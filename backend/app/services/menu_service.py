# 메뉴 서비스 - 최소 구현
# 나중에 SQLAlchemy를 사용한 실제 DB 연동으로 확장

async def get_all_menus():
    """모든 메뉴 조회"""
    # 최소 구현: 샘플 메뉴 데이터 반환
    from datetime import datetime
    from uuid import UUID, uuid4
    
    now = datetime.utcnow()
    
    return [
        {
            "id": UUID(str(uuid4())),
            "name": "아메리카노(ICE)",
            "description": "시원한 아이스 아메리카노",
            "price": 4000,
            "category": "커피",
            "image_url": "/americano-ice.jpg",
            "is_available": True,
            "options": {
                "items": [
                    {"name": "샷 추가", "price": 500},
                    {"name": "시럽 추가", "price": 0}
                ]
            },
            "created_at": now,
            "updated_at": now,
        },
        {
            "id": UUID(str(uuid4())),
            "name": "아메리카노(HOT)",
            "description": "따뜻한 핫 아메리카노",
            "price": 4000,
            "category": "커피",
            "image_url": "/americano-hot.jpg",
            "is_available": True,
            "options": {
                "items": [
                    {"name": "샷 추가", "price": 500},
                    {"name": "시럽 추가", "price": 0}
                ]
            },
            "created_at": now,
            "updated_at": now,
        },
        {
            "id": UUID(str(uuid4())),
            "name": "카페라떼",
            "description": "부드러운 카페라떼",
            "price": 5000,
            "category": "커피",
            "image_url": "/cafe-latte.jpg",
            "is_available": True,
            "options": {
                "items": [
                    {"name": "샷 추가", "price": 500},
                    {"name": "시럽 추가", "price": 0}
                ]
            },
            "created_at": now,
            "updated_at": now,
        },
    ]


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
    # 기존 메뉴 데이터를 가져와서 병합 (실제로는 DB에서 조회해야 함)
    from datetime import datetime
    
    # 기본값 설정 (실제로는 DB에서 조회한 데이터와 병합)
    base_menu = {
        "name": "기본 메뉴",
        "price": 0,
        "category": "기본",
        "is_available": True,
    }
    
    return {
        "id": menu_id,
        **base_menu,
        **menu_data,  # 업데이트된 필드로 덮어쓰기
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }


async def delete_menu(menu_id: str):
    """메뉴 삭제"""
    # 최소 구현: 성공 응답만
    return {"success": True}


async def toggle_availability(menu_id: str):
    """메뉴 가용성 토글"""
    # 최소 구현: 토글된 상태 반환
    # 전체 메뉴 객체를 반환해야 함
    from datetime import datetime
    
    return {
        "id": menu_id,
        "name": "기본 메뉴",
        "price": 0,
        "category": "기본",
        "is_available": True,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }

