import React, { useEffect, useState, useCallback } from 'react'
import Header from '../components/Header'
import { useMenuStore } from '../store/useMenuStore'
import * as adminService from '../services/adminService'
import { DashboardStats, Order } from '../types'
import { INVENTORY_CONFIG } from '../constants/config'
import DashboardStatsComponent from '../components/admin/DashboardStats'
import InventorySection from '../components/admin/InventorySection'
import OrdersSection from '../components/admin/OrdersSection'

const AdminPage: React.FC = () => {
  const { menus, fetchMenus } = useMenuStore()
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
  }, [fetchMenus])

  useEffect(() => {
    if (menus.length > 0) {
      // 메뉴가 로드된 후 재고 초기화 및 대시보드 데이터 로드
      const initialInventory: Record<string, number> = {}
      menus.forEach(menu => {
        initialInventory[menu.id] = INVENTORY_CONFIG.DEFAULT_STOCK
      })
      setInventory(prev => ({ ...prev, ...initialInventory }))
      loadDashboardData()
    }
  }, [menus, loadDashboardData])

  const loadDashboardData = useCallback(async () => {
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
  }, [])

  const updateInventory = useCallback((menuId: string, delta: number) => {
    setInventory(prev => ({
      ...prev,
      [menuId]: Math.max(0, (prev[menuId] || INVENTORY_CONFIG.DEFAULT_STOCK) + delta),
    }))
  }, [])

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      setError(null)
      await adminService.updateOrderStatus(orderId, status)
      await loadDashboardData() // 데이터 새로고침
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || error?.message || '주문 상태 업데이트에 실패했습니다'
      setError(errorMessage)
    }
  }, [loadDashboardData])

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
          <div className="error-message">
            {error}
          </div>
        )}

        {/* 대시보드 통계 */}
        <DashboardStatsComponent stats={stats} />

        {/* 재고 현황 */}
        <InventorySection
          menus={menus}
          inventory={inventory}
          onUpdateInventory={updateInventory}
        />

        {/* 주문 현황 */}
        <OrdersSection
          orders={recentOrders}
          menus={menus}
          onUpdateOrderStatus={updateOrderStatus}
        />
      </div>
    </div>
  )
}

export default AdminPage


