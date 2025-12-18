from fastapi import APIRouter, HTTPException
from typing import List
from app import schemas
from app.services import menu_service as menu_service_module

router = APIRouter()


@router.get("/", response_model=List[schemas.Menu])
async def get_all_menus():
    """모든 메뉴 조회"""
    menus = await menu_service_module.get_all_menus()
    return menus


@router.get("/{menu_id}", response_model=schemas.Menu)
async def get_menu_by_id(menu_id: str):
    """ID로 메뉴 조회"""
    menu = await menu_service_module.get_menu_by_id(menu_id)
    if not menu:
        raise HTTPException(status_code=404, detail="Menu not found")
    return menu


@router.post("/", response_model=schemas.Menu, status_code=201)
async def create_menu(menu: schemas.MenuCreate):
    """메뉴 생성"""
    menu_data = menu.model_dump()
    created_menu = await menu_service_module.create_menu(menu_data)
    return created_menu


@router.put("/{menu_id}", response_model=schemas.Menu)
async def update_menu(menu_id: str, menu: schemas.MenuUpdate):
    """메뉴 수정"""
    menu_data = menu.model_dump(exclude_unset=True)
    updated_menu = await menu_service_module.update_menu(menu_id, menu_data)
    return updated_menu


@router.delete("/{menu_id}")
async def delete_menu(menu_id: str):
    """메뉴 삭제"""
    await menu_service_module.delete_menu(menu_id)
    return {"success": True}


@router.patch("/{menu_id}/toggle-availability", response_model=schemas.Menu)
async def toggle_availability(menu_id: str):
    """메뉴 가용성 토글"""
    menu = await menu_service_module.toggle_availability(menu_id)
    return menu

