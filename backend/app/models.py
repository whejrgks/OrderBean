from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
import enum

from app.database import Base


class OrderStatus(str, enum.Enum):
    """주문 상태 Enum"""
    PENDING = "PENDING"      # 주문 접수
    PREPARING = "PREPARING"  # 제조 중
    READY = "READY"          # 준비 완료
    COMPLETED = "COMPLETED"  # 픽업 완료
    CANCELLED = "CANCELLED"  # 취소됨


class Menu(Base):
    """메뉴 모델"""
    __tablename__ = "menus"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    is_available = Column(Boolean, default=True, nullable=False)
    options = Column(JSON, nullable=True)  # 커스터마이징 옵션
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    order_items = relationship("OrderItem", back_populates="menu")


class Order(Base):
    """주문 모델"""
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(String, nullable=False)
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.PENDING, nullable=False)
    total_price = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    """주문 항목 모델"""
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    menu_id = Column(UUID(as_uuid=True), ForeignKey("menus.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)  # 주문 시점의 가격
    customizations = Column(JSON, nullable=True)  # 커스터마이징 옵션
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    order = relationship("Order", back_populates="items")
    menu = relationship("Menu", back_populates="order_items")

