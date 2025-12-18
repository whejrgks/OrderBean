import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useOrderStore } from '../store/useOrderStore'
import { useMenuStore } from '../store/useMenuStore'
import * as adminService from '../services/adminService'
import { formatOrderDate } from '../utils/dateFormatter'
import { formatItemOptions } from '../utils/optionParser'
import { DashboardStats, Order, OrderItem } from '../types'

const AdminPage: React.FC = () => {
  const navigate = useNavigate()
  const { menus, fetchMenus } = useMenuStore()
  const { fetchOrders } = useOrderStore()
  const [stats, setStats] = useState<DashboardStats>({
    total_orders: 0,
    pending_orders: 0,
    preparing_orders: 0,
    ready_orders: 0,
    completed_orders: 0,
    cancelled_orders: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMenus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (menus.length > 0) {
      // 메뉴가 로드된 후 재고 초기화 및 대시보드 데이터 로드
      const initialInventory: Record<string, number> = {}
      menus.forEach(menu => {
        initialInventory[menu.id] = 10
      })
      setInventory(prev => ({ ...prev, ...initialInventory }))
      loadDashboardData()
    }
  }, [menus])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [statsData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentOrders(),
      ])
      setStats(statsData)
      setRecentOrders(ordersData)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || error?.message || '대시보드 데이터를 불러오는데 실패했습니다'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateInventory = (menuId: string, delta: number) => {
    setInventory(prev => ({
      ...prev,
      [menuId]: Math.max(0, (prev[menuId] || 10) + delta),
    }))
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      setError(null)
      await adminService.updateOrderStatus(orderId, status)
      await loadDashboardData() // 데이터 새로고침
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || error?.message || '주문 상태 업데이트에 실패했습니다'
      setError(errorMessage)
    }
  }

  const formatOrderItems = (items: OrderItem[]): string => {
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
  }

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="admin-page">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="admin-page">
        <h1 className="admin-title">관리자 대시보드</h1>
        
        {/* 에러 메시지 */}
        {error && (
          <div className="error" style={{ 
            padding: '1rem', 
            background: '#fee', 
            color: '#c33', 
            borderRadius: '4px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        {/* 대시보드 통계 */}
        <div className="dashboard-stats">
          <p>
            총 주문 {stats.total_orders} / 주문 접수 {stats.pending_orders} / 
            제조 중 {stats.preparing_orders} / 제조 완료 {stats.ready_orders}
          </p>
        </div>

        {/* 재고 현황 */}
        <div className="inventory-section">
          <h2 className="section-title">재고 현황</h2>
          <div className="inventory-grid">
            {menus.map((menu) => (
              <div key={menu.id} className="inventory-card">
                <div className="inventory-menu-name">{menu.name}</div>
                <div className="inventory-stock">{inventory[menu.id] || 10}개</div>
                <div className="inventory-controls">
                  <button
                    className="inventory-btn"
                    onClick={() => updateInventory(menu.id, -1)}
                  >
                    -
                  </button>
                  <button
                    className="inventory-btn"
                    onClick={() => updateInventory(menu.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주문 현황 */}
        <div className="orders-section">
          <h2 className="section-title">주문 현황</h2>
          <div className="orders-list">
            {recentOrders.length === 0 ? (
              <div className="no-orders">주문이 없습니다.</div>
            ) : (
              recentOrders.map((order) => (
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
                    {order.status === 'PENDING' && (
                      <button
                        className="order-status-btn"
                        onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                      >
                        주문 접수
                      </button>
                    )}
                    {order.status === 'PREPARING' && (
                      <button
                        className="order-status-btn"
                        onClick={() => updateOrderStatus(order.id, 'READY')}
                      >
                        제조 완료
                      </button>
                    )}
                    {order.status === 'READY' && (
                      <button
                        className="order-status-btn"
                        onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                      >
                        픽업 완료
                      </button>
                    )}
                    {order.status === 'COMPLETED' && (
                      <span className="order-status-completed">완료</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage


