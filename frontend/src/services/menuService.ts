import api from './api'
import { Menu } from '../store/useMenuStore'

export const menuService = {
  async getAll(category?: string): Promise<Menu[]> {
    const params = category ? { category } : {}
    const response = await api.get('/menus', { params })
    return response.data.menus
  },

  async getById(id: string): Promise<Menu> {
    const response = await api.get(`/menus/${id}`)
    return response.data.menu
  },

  async create(data: Partial<Menu>): Promise<Menu> {
    const response = await api.post('/menus', data)
    return response.data.menu
  },

  async update(id: string, data: Partial<Menu>): Promise<Menu> {
    const response = await api.put(`/menus/${id}`, data)
    return response.data.menu
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/menus/${id}`)
  },

  async toggleAvailability(id: string): Promise<Menu> {
    const response = await api.patch(`/menus/${id}/toggle-availability`)
    return response.data.menu
  },
}

