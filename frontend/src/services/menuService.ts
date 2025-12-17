import api from './api'

export interface Menu {
  id: string
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  isAvailable: boolean
  options?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export const getMenus = async (): Promise<Menu[]> => {
  const response = await api.get<Menu[]>('/menus')
  return response.data
}

export const getMenuById = async (id: string): Promise<Menu> => {
  const response = await api.get<Menu>(`/menus/${id}`)
  return response.data
}

