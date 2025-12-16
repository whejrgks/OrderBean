import { useEffect, useState } from 'react'
import { useMenuStore } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'
import './OrderPage.css'

const CATEGORIES = ['전체', '커피', '라떼', '에스프레소', '차', '기타']

function OrderPage() {
  const { menus, loading, fetchMenus } = useMenuStore()
  const { currentOrder } = useOrderStore()
  const [selectedCategory, setSelectedCategory] = useState('전체')

  useEffect(() => {
    fetchMenus()
  }, [fetchMenus])

  useEffect(() => {
    if (currentOrder) {
      // 주문 완료 후 주문 상태 페이지로 이동하거나 모달 표시
      console.log('Current order:', currentOrder)
    }
  }, [currentOrder])

  const filteredMenus = selectedCategory === '전체'
    ? menus
    : menus.filter(menu => menu.category === selectedCategory)

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>메뉴 선택</h1>
        {currentOrder && (
          <div className="current-order-banner">
            주문 번호: {currentOrder.id.slice(0, 8)} - 상태: {getStatusText(currentOrder.status)}
          </div>
        )}
      </div>

      <div className="category-filter">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="order-content">
        <div className="menu-grid">
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : filteredMenus.length === 0 ? (
            <div className="empty">메뉴가 없습니다</div>
          ) : (
            filteredMenus.map(menu => (
              <MenuCard key={menu.id} menu={menu} />
            ))
          )}
        </div>
        <div className="cart-section">
          <Cart />
        </div>
      </div>
    </div>
  )
}

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: '주문 접수',
    PREPARING: '제조 중',
    READY: '준비 완료',
    COMPLETED: '픽업 완료',
    CANCELLED: '취소됨',
  }
  return statusMap[status] || status
}

export default OrderPage
