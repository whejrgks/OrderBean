import { create } from 'zustand'
import api from '../services/api'
import { Order } from './useOrderStore'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  todayOrders: number
  todayRevenue: number
  pendingOrders: number
  preparingOrders: number
  readyOrders: number
  hourlyStats: Record<number, number>
  dailyStats: Record<string, number>
}

interface AdminStore {
  stats: DashboardStats | null
  recentOrders: Order[]
  loading: boolean
  error: string | null
  fetchDashboard: () => Promise<void>
  fetchRecentOrders: (limit?: number) => Promise<void>
}

export const useAdminStore = create<AdminStore>((set) => ({
  stats: null,
  recentOrders: [],
  loading: false,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/admin/dashboard')
      set({ stats: response.data, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  fetchRecentOrders: async (limit = 10) => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/admin/recent-orders', { params: { limit } })
      set({ recentOrders: response.data.orders, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },
}))

