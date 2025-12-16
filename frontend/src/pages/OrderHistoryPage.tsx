import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrderStore, Order, OrderStatus } from '../store/useOrderStore'
import { useMenuStore } from '../store/useMenuStore'
import './OrderHistoryPage.css'

function OrderHistoryPage() {
  const navigate = useNavigate()
  const { orders, loading, fetchOrders, fetchOrderById, addToCart, clearCart } = useOrderStore()
  const { fetchMenus } = useMenuStore()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    if (selectedOrder) {
      fetchOrderById(selectedOrder.id)
    }
  }, [selectedOrder, fetchOrderById])

  const filteredOrders = filter === 'ALL'
    ? orders
    : orders.filter(order => order.status === filter)

  const handleReorder = async (order: Order) => {
    try {
      clearCart()
      // 주문 항목을 장바구니에 추가
      order.items.forEach(item => {
        addToCart(item.menuId, item.quantity, item.customizations || {})
      })
      // 주문 페이지로 이동
      navigate('/order')
    } catch (error: any) {
      alert(`재주문 실패: ${error.message}`)
    }
  }

  return (
    <div className="order-history-page">
      <h1>주문 내역</h1>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'ALL' ? 'active' : ''}`}
          onClick={() => setFilter('ALL')}
        >
          전체
        </button>
        <button
          className={`filter-tab ${filter === 'PENDING' ? 'active' : ''}`}
          onClick={() => setFilter('PENDING')}
        >
          주문 접수
        </button>
        <button
          className={`filter-tab ${filter === 'PREPARING' ? 'active' : ''}`}
          onClick={() => setFilter('PREPARING')}
        >
          제조 중
        </button>
        <button
          className={`filter-tab ${filter === 'READY' ? 'active' : ''}`}
          onClick={() => setFilter('READY')}
        >
          준비 완료
        </button>
        <button
          className={`filter-tab ${filter === 'COMPLETED' ? 'active' : ''}`}
          onClick={() => setFilter('COMPLETED')}
        >
          완료
        </button>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty">주문 내역이 없습니다</div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>주문 #{order.id.slice(0, 8)}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div className="order-status">
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <span className="item-name">{item.menu.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">
                      {(item.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  총 금액: <strong>{order.totalPrice.toLocaleString()}원</strong>
                </div>
                <div className="order-actions">
                  <button
                    className="btn-detail"
                    onClick={() => setSelectedOrder(order)}
                  >
                    상세보기
                  </button>
                  {order.status === 'COMPLETED' && (
                    <button
                      className="btn-reorder"
                      onClick={() => handleReorder(order)}
                    >
                      재주문
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>주문 상세</h2>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h4>주문 정보</h4>
                <p>주문 번호: {selectedOrder.id}</p>
                <p>주문 시간: {new Date(selectedOrder.createdAt).toLocaleString('ko-KR')}</p>
                <p>상태: {getStatusText(selectedOrder.status)}</p>
              </div>
              <div className="detail-section">
                <h4>주문 항목</h4>
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="detail-item">
                    <span>{item.menu.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                ))}
              </div>
              <div className="detail-section">
                <h4>총 금액</h4>
                <p className="total-amount">{selectedOrder.totalPrice.toLocaleString()}원</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getStatusText(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    PENDING: '주문 접수',
    PREPARING: '제조 중',
    READY: '준비 완료',
    COMPLETED: '픽업 완료',
    CANCELLED: '취소됨',
  }
  return statusMap[status] || status
}

export default OrderHistoryPage
