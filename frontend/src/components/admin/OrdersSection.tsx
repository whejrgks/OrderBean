import React, { useMemo } from 'react'
import { Order, OrderItem } from '../../types'
import { Menu } from '../../services/menuService'
import { formatOrderDate } from '../../utils/dateFormatter'
import { formatItemOptions } from '../../utils/optionParser'
import OrderStatusButton from './OrderStatusButton'

interface OrdersSectionProps {
  orders: Order[]
  menus: Menu[]
  onUpdateOrderStatus: (orderId: string, status: string) => void
}

const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  menus,
  onUpdateOrderStatus,
}) => {
  const formatOrderItems = useCallback((items: OrderItem[]): string => {
    if (!items || items.length === 0) return '주문 항목 없음'
    
    return items.map((item) => {
      // 메뉴 이름 가져오기
      let menuName = item.menu_name || item.menuName
      if (!menuName) {
        const menuId = item.menu_id || item.menuId
        if (menuId) {
          const menu = menus.find(m => {
            const mId = String(m.id || '')
            const iId = String(menuId || '')
            return mId === iId || mId.toLowerCase() === iId.toLowerCase()
          })
          if (menu) {
            menuName = menu.name
          }
        }
      }
      if (!menuName) {
        menuName = '알 수 없음'
      }
      
      // 옵션 정보 가져오기
      const optionsText = formatItemOptions(item)
      
      // 각 아이템의 가격 (item.price는 이미 수량을 곱한 총 가격)
      const itemTotalPrice = item.price || 0
      
      return `${menuName}${optionsText} x ${item.quantity} - ${itemTotalPrice.toLocaleString()}원`
    }).join(', ')
  }, [menus])

  if (orders.length === 0) {
    return (
      <div className="orders-section">
        <h2 className="section-title">주문 현황</h2>
        <div className="orders-list">
          <div className="no-orders">주문이 없습니다.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-section">
      <h2 className="section-title">주문 현황</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-info">
              <div className="order-date">{formatOrderDate(order.created_at)}</div>
              <div className="order-details">
                <div className="order-items-list">
                  {formatOrderItems(order.items || [])}
                </div>
                <div className="order-total-price">
                  총액: {order.total_price ? order.total_price.toLocaleString() : 0}원
                </div>
              </div>
            </div>
            <div className="order-actions">
              <OrderStatusButton
                status={order.status}
                orderId={order.id}
                onUpdateStatus={onUpdateOrderStatus}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersSection

