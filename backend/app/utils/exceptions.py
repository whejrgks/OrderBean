"""커스텀 예외 클래스"""
from fastapi import HTTPException, status


class OrderNotFoundError(HTTPException):
    """주문을 찾을 수 없을 때 발생하는 예외"""
    def __init__(self, order_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id {order_id} not found"
        )


class MenuNotFoundError(HTTPException):
    """메뉴를 찾을 수 없을 때 발생하는 예외"""
    def __init__(self, menu_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Menu with id {menu_id} not found"
        )


class InvalidOrderDataError(HTTPException):
    """주문 데이터가 유효하지 않을 때 발생하는 예외"""
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )

