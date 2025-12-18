from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict
from sqlalchemy.orm import Session
from app import schemas
from app.database import get_db
from app.services import menu_service as menu_service_module
from app.utils.exceptions import MenuNotFoundError

router = APIRouter()


@router.get("/", response_model=List[schemas.Menu])
async def get_all_menus(db: Session = Depends(get_db)) -> List[schemas.Menu]:
    """모든 메뉴 조회"""
    menus = await menu_service_module.get_all_menus()
    return menus


@router.get("/{menu_id}", response_model=schemas.Menu)
async def get_menu_by_id(
    menu_id: str,
    db: Session = Depends(get_db)
) -> schemas.Menu:
    """ID로 메뉴 조회"""
    try:
        menu = await menu_service_module.get_menu_by_id(menu_id)
        if not menu:
            raise MenuNotFoundError(menu_id)
        return menu
    except MenuNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e.detail))


@router.post("/", response_model=schemas.Menu, status_code=201)
async def create_menu(
    menu: schemas.MenuCreate,
    db: Session = Depends(get_db)
) -> schemas.Menu:
    """메뉴 생성"""
    menu_data = menu.model_dump()
    created_menu = await menu_service_module.create_menu(menu_data)
    return created_menu


@router.put("/{menu_id}", response_model=schemas.Menu)
async def update_menu(
    menu_id: str,
    menu: schemas.MenuUpdate,
    db: Session = Depends(get_db)
) -> schemas.Menu:
    """메뉴 수정"""
    try:
        menu_data = menu.model_dump(exclude_unset=True)
        updated_menu = await menu_service_module.update_menu(menu_id, menu_data)
        return updated_menu
    except MenuNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e.detail))


@router.delete("/{menu_id}")
async def delete_menu(
    menu_id: str,
    db: Session = Depends(get_db)
) -> Dict[str, bool]:
    """메뉴 삭제"""
    try:
        await menu_service_module.delete_menu(menu_id)
        return {"success": True}
    except MenuNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e.detail))


@router.patch("/{menu_id}/toggle-availability", response_model=schemas.Menu)
async def toggle_availability(
    menu_id: str,
    db: Session = Depends(get_db)
) -> schemas.Menu:
    """메뉴 가용성 토글"""
    try:
        menu = await menu_service_module.toggle_availability(menu_id)
        return menu
    except MenuNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e.detail))

