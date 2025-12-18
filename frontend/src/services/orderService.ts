import api from './api'
import { Customizations, OrderItem as OrderItemType } from '../types'

export interface OrderItem {
  menuId: string
  quantity: number
  customizations?: Customizations
}

export interface CreateOrderRequest {
  customerId?: string
  items: OrderItem[]
}

export interface Order {
  id: string
  customerId: string
  status: string
  totalPrice: number
  items: OrderItemType[]
  createdAt: string
  updatedAt: string
}

export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  const response = await api.post<Order>('/orders', data)
  return response.data
}

export const getOrders = async (filters?: {
  customerId?: string
  status?: string
}): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders', { params: filters })
  return response.data
}

