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
    // items를 그대로 전달 (menu_name 포함)
    items: (order.items || []).map((item: any) => ({
      ...item,
      menu_name: item.menu_name, // menu_name 보존
      menu_id: item.menu_id, // menu_id 보존
      price: item.price || 0, // price 보존
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
  const response = await api.get<any[]>('/admin/recent-orders', { params })
  return response.data.map(transformOrder)
}

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const response = await api.patch<any>(`/orders/${orderId}/status`, { status })
  return transformOrder(response.data)
}

