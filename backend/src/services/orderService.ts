import prisma from '../config/database'
import { CreateOrderDto, UpdateOrderStatusDto, OrderStatus } from '../models/Order'

export const orderService = {
  async create(data: CreateOrderDto) {
    // 메뉴 정보 조회 및 가격 계산
    const menuIds = data.items.map(item => item.menuId)
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds } },
    })

    const menuMap = new Map(menus.map(menu => [menu.id, menu]))

    // 주문 항목 생성 및 총액 계산
    let totalPrice = 0
    const orderItems = data.items.map(item => {
      const menu = menuMap.get(item.menuId)
      if (!menu) throw new Error(`Menu ${item.menuId} not found`)
      if (!menu.isAvailable) throw new Error(`Menu ${menu.name} is not available`)

      const itemPrice = menu.price * item.quantity
      totalPrice += itemPrice

      return {
        menuId: item.menuId,
        quantity: item.quantity,
        customizations: item.customizations || {},
        price: itemPrice,
      }
    })

    // 주문 생성
    const order = await prisma.order.create({
      data: {
        customerId: data.customerId,
        status: OrderStatus.PENDING,
        totalPrice,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    })

    return order
  },

  async getAll(customerId?: string) {
    const where = customerId ? { customerId } : {}
    return await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    })
  },

  async updateStatus(id: string, data: UpdateOrderStatusDto) {
    return await prisma.order.update({
      where: { id },
      data: { status: data.status },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    })
  },

  async getByStatus(status: OrderStatus) {
    return await prisma.order.findMany({
      where: { status },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })
  },
}

