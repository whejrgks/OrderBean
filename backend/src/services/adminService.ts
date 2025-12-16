import prisma from '../config/database'
import { OrderStatus } from '../models/Order'

export const adminService = {
  async getDashboardStats() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [
      totalOrders,
      totalRevenue,
      todayOrders,
      todayRevenue,
      pendingOrders,
      preparingOrders,
      readyOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalPrice: true },
      }),
      prisma.order.count({
        where: {
          createdAt: { gte: today },
        },
      }),
      prisma.order.aggregate({
        where: {
          createdAt: { gte: today },
        },
        _sum: { totalPrice: true },
      }),
      prisma.order.count({
        where: { status: OrderStatus.PENDING },
      }),
      prisma.order.count({
        where: { status: OrderStatus.PREPARING },
      }),
      prisma.order.count({
        where: { status: OrderStatus.READY },
      }),
    ])

    // 시간대별 주문 통계 (최근 7일)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const ordersByHour = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
      _count: { id: true },
    })

    // 시간대별로 그룹화
    const hourlyStats: Record<number, number> = {}
    ordersByHour.forEach(order => {
      const hour = new Date(order.createdAt).getHours()
      hourlyStats[hour] = (hourlyStats[hour] || 0) + order._count.id
    })

    // 일별 매출 통계 (최근 30일)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const dailyRevenue = await prisma.order.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        status: { not: OrderStatus.CANCELLED },
      },
      select: {
        totalPrice: true,
        createdAt: true,
      },
    })

    const dailyStats: Record<string, number> = {}
    dailyRevenue.forEach(order => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      dailyStats[date] = (dailyStats[date] || 0) + order.totalPrice
    })

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      todayOrders,
      todayRevenue: todayRevenue._sum.totalPrice || 0,
      pendingOrders,
      preparingOrders,
      readyOrders,
      hourlyStats,
      dailyStats,
    }
  },

  async getRecentOrders(limit: number = 10) {
    return await prisma.order.findMany({
      take: limit,
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
}

