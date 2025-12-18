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
    set({ loading: true, error: null })
    try {
      const menus = await getMenus()
      set({ menus, loading: false })
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || error?.message || '메뉴를 불러오는데 실패했습니다'
      set({ error: errorMessage, loading: false })
    }
  },
  
  getMenuById: (id: string) => {
    return get().menus.find(menu => menu.id === id)
  },
}))

