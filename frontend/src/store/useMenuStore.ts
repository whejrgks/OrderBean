import { create } from 'zustand'
import { getMenus, Menu } from '../services/menuService'

interface MenuStore {
  menus: Menu[]
  loading: boolean
  error: string | null
  fetchMenus: () => Promise<void>
  getMenuById: (id: string) => Menu | undefined
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  menus: [],
  loading: false,
  error: null,
  
  fetchMenus: async () => {
    console.log('📋 fetchMenus called')
    set({ loading: true, error: null })
    try {
      console.log('📋 Calling getMenus()...')
      const menus = await getMenus()
      console.log('📋 Menus received:', menus)
      set({ menus, loading: false })
    } catch (error: any) {
      console.error('❌ Menu fetch error:', error)
      const errorMessage = error?.response?.data?.detail || error?.message || 'Failed to fetch menus'
      set({ error: `에러: ${errorMessage}`, loading: false })
    }
  },
  
  getMenuById: (id: string) => {
    return get().menus.find(menu => menu.id === id)
  },
}))

