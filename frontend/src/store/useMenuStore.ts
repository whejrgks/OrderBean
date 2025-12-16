import { create } from 'zustand'
import api from '../services/api'

export interface Menu {
  id: string
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  isAvailable: boolean
  options?: any
  createdAt: string
  updatedAt: string
}

interface MenuStore {
  menus: Menu[]
  loading: boolean
  error: string | null
  fetchMenus: (category?: string) => Promise<void>
  getMenuById: (id: string) => Menu | undefined
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  menus: [],
  loading: false,
  error: null,

  fetchMenus: async (category?: string) => {
    set({ loading: true, error: null })
    try {
      const params = category ? { category } : {}
      const response = await api.get('/menus', { params })
      set({ menus: response.data.menus, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  getMenuById: (id: string) => {
    return get().menus.find(menu => menu.id === id)
  },
}))

