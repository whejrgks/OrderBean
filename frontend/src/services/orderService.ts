import api from './api'
import { Order, OrderStatus } from '../store/useOrderStore'

export const orderService = {
  async create(items: Array<{ menuId: string; quantity: number; customizations?: any }>, customerId?: string): Promise<Order> {
    const response = await api.post('/orders', { items, customerId })
    return response.data.order
  },

  async getAll(customerId?: string, status?: OrderStatus): Promise<Order[]> {
    const params: any = {}
    if (customerId) params.customerId = customerId
    if (status) params.status = status
    const response = await api.get('/orders', { params })
    return response.data.orders
  },

  async getById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`)
    return response.data.order
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const response = await api.patch(`/orders/${id}/status`, { status })
    return response.data.order
  },
}

