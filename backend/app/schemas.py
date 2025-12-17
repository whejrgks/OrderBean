from pydantic import BaseModel
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


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: UUID
    order_id: UUID
    price: int
    created_at: datetime

    class Config:
        from_attributes = True


# Order Schemas
class OrderBase(BaseModel):
    customer_id: Optional[str] = None
    items: List[OrderItemCreate]


class OrderCreate(OrderBase):
    pass


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

