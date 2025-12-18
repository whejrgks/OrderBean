from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID
from app.models import OrderStatus


# Menu Schemas
class MenuBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: int
    category: str
    image_url: Optional[str] = None
    is_available: bool = True
    options: Optional[Dict[str, Any]] = None


class MenuCreate(MenuBase):
    pass


class MenuUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None
    options: Optional[Dict[str, Any]] = None


class Menu(MenuBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# OrderItem Schemas
class OrderItemBase(BaseModel):
    menu_id: UUID
    quantity: int
    customizations: Optional[Dict[str, Any]] = None


class OrderItemCreate(BaseModel):
    menuId: str  # API에서는 camelCase로 받음
    menuName: Optional[str] = None  # 메뉴 이름도 함께 받음
    menuPrice: Optional[int] = None  # 메뉴 가격도 함께 받음
    quantity: int
    customizations: Optional[Dict[str, Any]] = None
    
    class Config:
        # camelCase 필드명을 snake_case로 변환하지 않음
        populate_by_name = True


class OrderItem(OrderItemBase):
    id: UUID
    order_id: UUID
    menu_name: Optional[str] = None  # 메뉴 이름 필드 추가
    menu_id: UUID  # OrderItemBase에 있지만 명시적으로 포함
    price: int
    created_at: datetime
    selected_options: Optional[List[str]] = None  # 선택된 옵션 목록

    class Config:
        from_attributes = True
        populate_by_name = True


# Order Schemas
class OrderBase(BaseModel):
    customer_id: Optional[str] = None
    items: List[OrderItemCreate]


class OrderCreate(BaseModel):
    customerId: Optional[str] = None  # API에서는 camelCase로 받음
    items: List[OrderItemCreate]
    
    class Config:
        populate_by_name = True


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None


class Order(OrderBase):
    id: UUID
    status: OrderStatus
    total_price: int
    created_at: datetime
    updated_at: datetime
    items: List[OrderItem] = []

    class Config:
        from_attributes = True


# Admin Schemas
class DashboardStats(BaseModel):
    total_orders: int
    pending_orders: int
    preparing_orders: int
    ready_orders: int
    completed_orders: int
    cancelled_orders: int

