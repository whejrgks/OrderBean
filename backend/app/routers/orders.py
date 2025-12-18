from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from app import schemas
from app.database import get_db
from app.services import order_service as order_service_module
from app.utils.exceptions import OrderNotFoundError, InvalidOrderDataError

router = APIRouter()


@router.post("/", status_code=201, response_model=schemas.Order)
async def create_order(
    order: schemas.OrderCreate,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """주문 생성"""
    try:
        order_data = order.model_dump()
        created_order = await order_service_module.create_order(order_data)
        # TODO: 스키마 검증을 통과하도록 Order 스키마에 menu_name 필드 추가 필요
        return created_order
    except InvalidOrderDataError as e:
        raise HTTPException(status_code=400, detail=str(e.detail))


@router.get("/", response_model=List[schemas.Order])
async def get_all_orders(
    customer_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
) -> List[Dict[str, Any]]:
    """모든 주문 조회"""
    filters: Dict[str, Optional[str]] = {"customer_id": customer_id, "status": status}
    orders = await order_service_module.get_all_orders(filters)
    # TODO: 스키마 검증을 통과하도록 Order 스키마에 menu_name 필드 추가 필요
    return orders


@router.get("/{order_id}", response_model=schemas.Order)
async def get_order_by_id(
    order_id: str,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """ID로 주문 조회"""
    try:
        order = await order_service_module.get_order_by_id(order_id)
        if not order:
            raise OrderNotFoundError(order_id)
        return order
    except OrderNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e.detail))


@router.patch("/{order_id}/status", response_model=schemas.Order)
async def update_order_status(
    order_id: str,
    status_update: schemas.OrderUpdate,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """주문 상태 업데이트"""
    status = status_update.status.value if status_update.status else None
    if not status:
        raise HTTPException(status_code=400, detail="Status is required")
    
    try:
        order = await order_service_module.update_order_status(order_id, status)
        return order
    except OrderNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e.detail))

