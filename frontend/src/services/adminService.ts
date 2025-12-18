import api from './api'
import { DashboardStats, Order, OrderItem } from '../types'

// 백엔드 응답(snake_case)을 프론트엔드 형식으로 변환
const transformOrder = (order: any): Order => {
  // total_price가 없거나 0이면 items의 price를 합산
  let totalPrice = order.total_price || 0
  if (totalPrice === 0 && order.items && order.items.length > 0) {
    totalPrice = order.items.reduce((sum: number, item: any) => sum + (item.price || 0), 0)
  }
  
  return {
    id: order.id,
    customer_id: order.customer_id,
    status: order.status,
    total_price: totalPrice,
    // items를 타입 안전하게 변환
    items: (order.items || []).map((item: any): OrderItem => ({
      id: item.id || '',
      menu_id: item.menu_id || '',
      menuId: item.menuId || item.menu_id || '',
      menu_name: item.menu_name || '',
      menuName: item.menuName || item.menu_name || '',
      quantity: item.quantity || 0,
      price: item.price || 0,
      customizations: item.customizations,
      selected_options: item.selected_options || [],
    })),
    created_at: order.created_at,
    updated_at: order.updated_at,
  }
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get<DashboardStats>('/admin/dashboard')
  return response.data
}

export const getRecentOrders = async (limit?: number): Promise<Order[]> => {
  const params = limit ? { limit } : {}
  const response = await api.get<Order[]>('/admin/recent-orders', { params })
  return response.data.map(transformOrder)
}

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const response = await api.patch<Order>(`/orders/${orderId}/status`, { status })
  return transformOrder(response.data)
}

