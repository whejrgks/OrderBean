import prisma from '../config/database'
import { CreateMenuDto, UpdateMenuDto } from '../models/Menu'

export const menuService = {
  async getAll() {
    return await prisma.menu.findMany({
      orderBy: { createdAt: 'desc' },
    })
  },

  async getById(id: string) {
    return await prisma.menu.findUnique({
      where: { id },
    })
  },

  async getByCategory(category: string) {
    return await prisma.menu.findMany({
      where: { category, isAvailable: true },
      orderBy: { createdAt: 'desc' },
    })
  },

  async create(data: CreateMenuDto) {
    return await prisma.menu.create({
      data,
    })
  },

  async update(id: string, data: UpdateMenuDto) {
    return await prisma.menu.update({
      where: { id },
      data,
    })
  },

  async delete(id: string) {
    return await prisma.menu.delete({
      where: { id },
    })
  },

  async toggleAvailability(id: string) {
    const menu = await prisma.menu.findUnique({ where: { id } })
    if (!menu) throw new Error('Menu not found')

    return await prisma.menu.update({
      where: { id },
      data: { isAvailable: !menu.isAvailable },
    })
  },
}

