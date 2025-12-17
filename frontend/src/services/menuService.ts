import api from './api'

export interface Menu {
  id: string
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  isAvailable: boolean
  options?: any[]  // 배열로 변경
  createdAt: string
  updatedAt: string
}

// 백엔드 응답(snake_case)을 프론트엔드 형식(camelCase)으로 변환
const transformMenu = (menu: any): Menu => {
  return {
    id: menu.id,
    name: menu.name,
    description: menu.description,
    price: menu.price,
    category: menu.category,
    imageUrl: menu.image_url,
    isAvailable: menu.is_available ?? true,
    options: menu.options || [],
    createdAt: menu.created_at,
    updatedAt: menu.updated_at,
  }
}

export const getMenus = async (): Promise<Menu[]> => {
  const response = await api.get<any[]>('/menus')
  return response.data.map(transformMenu)
}

export const getMenuById = async (id: string): Promise<Menu> => {
  const response = await api.get<any>(`/menus/${id}`)
  return transformMenu(response.data)
}

