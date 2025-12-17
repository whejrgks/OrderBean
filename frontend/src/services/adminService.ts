import api from './api'

export interface DashboardStats {
  total_orders: number
  pending_orders: number
  preparing_orders: number
  ready_orders: number
  completed_orders: number
  cancelled_orders: number
}

export interface Order {
  id: string
  customer_id: string
  status: string
  total_price: number
  items: any[]
  created_at: string
  updated_at: string
}

// 백엔드 응답(snake_case)을 프론트엔드 형식(camelCase)으로 변환
const transformOrder = (order: any): Order => {
  return {
    id: order.id,
    customer_id: order.customer_id,
    status: order.status,
    total_price: order.total_price,
    items: order.items || [],
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
  const response = await api.get<any[]>('/admin/recent-orders', { params })
  return response.data.map(transformOrder)
}

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const response = await api.patch<any>(`/orders/${orderId}/status`, { status })
  return transformOrder(response.data)
}

