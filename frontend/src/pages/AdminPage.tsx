import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useOrderStore } from '../store/useOrderStore'
import { useMenuStore } from '../store/useMenuStore'
import * as adminService from '../services/adminService'

interface DashboardStats {
  total_orders: number
  pending_orders: number
  preparing_orders: number
  ready_orders: number
  completed_orders: number
  cancelled_orders: number
}

interface Order {
  id: string
  customer_id: string
  status: string
  total_price: number
  items: any[]
  created_at: string
  updated_at: string
}

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
      const [statsData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentOrders(),
      ])
      setStats(statsData)
      setRecentOrders(ordersData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
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
      await adminService.updateOrderStatus(orderId, status)
      await loadDashboardData() // 데이터 새로고침
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${month}월 ${day}일 ${hours}:${minutes}`
  }

  const formatOrderItems = (items: any[]) => {
    return items.map(item => {
      const menu = menus.find(m => m.id === item.menu_id)
      const menuName = menu?.name || '알 수 없음'
      return `${menuName} x ${item.quantity}`
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
                      {formatOrderItems(order.items)} - {order.total_price.toLocaleString()}원
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

