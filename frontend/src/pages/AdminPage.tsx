import { useEffect, useState } from 'react'
import { useAdminStore } from '../store/useAdminStore'
import { useMenuStore, Menu } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import { menuService } from '../services/menuService'
import { orderService, OrderStatus } from '../services/orderService'
import './AdminPage.css'

function AdminPage() {
  const { stats, recentOrders, loading, fetchDashboard, fetchRecentOrders } = useAdminStore()
  const { menus, fetchMenus } = useMenuStore()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menus' | 'orders'>('dashboard')
  const [showMenuForm, setShowMenuForm] = useState(false)
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null)
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    isAvailable: true,
  })

  useEffect(() => {
    fetchDashboard()
    fetchRecentOrders()
    fetchMenus()
  }, [fetchDashboard, fetchRecentOrders, fetchMenus])

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingMenu) {
        await menuService.update(editingMenu.id, menuForm)
      } else {
        await menuService.create(menuForm)
      }
      fetchMenus()
      setShowMenuForm(false)
      setEditingMenu(null)
      setMenuForm({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        isAvailable: true,
      })
    } catch (error: any) {
      alert(`오류: ${error.message}`)
    }
  }

  const handleEditMenu = (menu: Menu) => {
    setEditingMenu(menu)
    setMenuForm({
      name: menu.name,
      description: menu.description || '',
      price: menu.price,
      category: menu.category,
      imageUrl: menu.imageUrl || '',
      isAvailable: menu.isAvailable,
    })
    setShowMenuForm(true)
  }

  const handleDeleteMenu = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await menuService.delete(id)
        fetchMenus()
      } catch (error: any) {
        alert(`오류: ${error.message}`)
      }
    }
  }

  const handleToggleAvailability = async (id: string) => {
    try {
      await menuService.toggleAvailability(id)
      fetchMenus()
    } catch (error: any) {
      alert(`오류: ${error.message}`)
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderService.updateStatus(orderId, status)
      fetchRecentOrders()
    } catch (error: any) {
      alert(`오류: ${error.message}`)
    }
  }

  return (
    <div className="admin-page">
      <h1>관리자 대시보드</h1>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          대시보드
        </button>
        <button
          className={`admin-tab ${activeTab === 'menus' ? 'active' : ''}`}
          onClick={() => setActiveTab('menus')}
        >
          메뉴 관리
        </button>
        <button
          className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          주문 관리
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="dashboard">
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : stats ? (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>총 주문</h3>
                  <p className="stat-value">{stats.totalOrders.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                  <h3>총 매출</h3>
                  <p className="stat-value">{stats.totalRevenue.toLocaleString()}원</p>
                </div>
                <div className="stat-card">
                  <h3>오늘 주문</h3>
                  <p className="stat-value">{stats.todayOrders.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                  <h3>오늘 매출</h3>
                  <p className="stat-value">{stats.todayRevenue.toLocaleString()}원</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>대기 중</h3>
                  <p className="stat-value pending">{stats.pendingOrders}</p>
                </div>
                <div className="stat-card">
                  <h3>제조 중</h3>
                  <p className="stat-value preparing">{stats.preparingOrders}</p>
                </div>
                <div className="stat-card">
                  <h3>준비 완료</h3>
                  <p className="stat-value ready">{stats.readyOrders}</p>
                </div>
              </div>

              <div className="recent-orders-section">
                <h2>최근 주문</h2>
                <div className="orders-table">
                  {recentOrders.length === 0 ? (
                    <p>주문이 없습니다</p>
                  ) : (
                    recentOrders.map(order => (
                      <div key={order.id} className="order-row">
                        <span>#{order.id.slice(0, 8)}</span>
                        <span>{order.totalPrice.toLocaleString()}원</span>
                        <span className={`status-${order.status.toLowerCase()}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span>{new Date(order.createdAt).toLocaleString('ko-KR')}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}

      {activeTab === 'menus' && (
        <div className="menus-management">
          <div className="menus-header">
            <h2>메뉴 관리</h2>
            <button className="btn-primary" onClick={() => {
              setEditingMenu(null)
              setMenuForm({
                name: '',
                description: '',
                price: 0,
                category: '',
                imageUrl: '',
                isAvailable: true,
              })
              setShowMenuForm(true)
            }}>
              + 메뉴 추가
            </button>
          </div>

          {showMenuForm && (
            <div className="menu-form-modal">
              <div className="menu-form-content">
                <h3>{editingMenu ? '메뉴 수정' : '새 메뉴 추가'}</h3>
                <form onSubmit={handleMenuSubmit}>
                  <div className="form-group">
                    <label>메뉴명</label>
                    <input
                      type="text"
                      value={menuForm.name}
                      onChange={e => setMenuForm({ ...menuForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>설명</label>
                    <textarea
                      value={menuForm.description}
                      onChange={e => setMenuForm({ ...menuForm, description: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>가격</label>
                      <input
                        type="number"
                        value={menuForm.price}
                        onChange={e => setMenuForm({ ...menuForm, price: parseFloat(e.target.value) })}
                        required
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>카테고리</label>
                      <input
                        type="text"
                        value={menuForm.category}
                        onChange={e => setMenuForm({ ...menuForm, category: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>이미지 URL</label>
                    <input
                      type="url"
                      value={menuForm.imageUrl}
                      onChange={e => setMenuForm({ ...menuForm, imageUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={menuForm.isAvailable}
                        onChange={e => setMenuForm({ ...menuForm, isAvailable: e.target.checked })}
                      />
                      판매 가능
                    </label>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editingMenu ? '수정' : '추가'}
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setShowMenuForm(false)
                        setEditingMenu(null)
                      }}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="menus-grid">
            {menus.map(menu => (
              <div key={menu.id} className="menu-admin-card">
                {menu.imageUrl && (
                  <img src={menu.imageUrl} alt={menu.name} className="menu-admin-image" />
                )}
                <div className="menu-admin-info">
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
                  <div className="menu-admin-meta">
                    <span>{menu.price.toLocaleString()}원</span>
                    <span className={`availability ${menu.isAvailable ? 'available' : 'unavailable'}`}>
                      {menu.isAvailable ? '판매중' : '품절'}
                    </span>
                  </div>
                  <div className="menu-admin-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditMenu(menu)}
                    >
                      수정
                    </button>
                    <button
                      className="btn-toggle"
                      onClick={() => handleToggleAvailability(menu.id)}
                    >
                      {menu.isAvailable ? '품절 처리' : '판매 재개'}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteMenu(menu.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="orders-management">
          <h2>주문 관리</h2>
          <div className="orders-list-admin">
            {recentOrders.length === 0 ? (
              <p>주문이 없습니다</p>
            ) : (
              recentOrders.map(order => (
                <div key={order.id} className="order-admin-card">
                  <div className="order-admin-header">
                    <div>
                      <h3>주문 #{order.id.slice(0, 8)}</h3>
                      <p>{new Date(order.createdAt).toLocaleString('ko-KR')}</p>
                    </div>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="order-admin-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-admin-item">
                        <span>{item.menu.name} x{item.quantity}</span>
                        <span>{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-admin-footer">
                    <div className="order-admin-total">
                      총액: <strong>{order.totalPrice.toLocaleString()}원</strong>
                    </div>
                    <div className="order-admin-actions">
                      {order.status === 'PENDING' && (
                        <button
                          className="btn-status"
                          onClick={() => handleUpdateOrderStatus(order.id, 'PREPARING')}
                        >
                          제조 시작
                        </button>
                      )}
                      {order.status === 'PREPARING' && (
                        <button
                          className="btn-status"
                          onClick={() => handleUpdateOrderStatus(order.id, 'READY')}
                        >
                          준비 완료
                        </button>
                      )}
                      {order.status === 'READY' && (
                        <button
                          className="btn-status"
                          onClick={() => handleUpdateOrderStatus(order.id, 'COMPLETED')}
                        >
                          픽업 완료
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
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

export default AdminPage
